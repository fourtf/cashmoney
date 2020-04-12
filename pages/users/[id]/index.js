import { Button, Box, Columns, Heading } from 'react-bulma-components'
import fetch from 'isomorphic-unfetch'
import prepareUrl from '../../../util/prepareUrl'

export async function getServerSideProps(ctx) {
    const paramId = ctx.params['id']

    if (!paramId.startsWith('@')) {
        ctx.res.writeHead(302, { Location: '/users/@' + paramId })
        ctx.res.end()
    }

    const id = paramId.substr(1)
    const db = await import('../../../db')
    const user = db.getUser(id)
    const products = db.getAllProducts()

    return {
        props: {
            user,
            products,
        },
    }
}

function modifyCredit(props, amount) {
    return async function () {
        try {
            const url = prepareUrl(
                'api/users/%/credit?amount=%',
                props.user.name,
                amount
            )
            const result = await fetch(url).then(x => x.json())

            console.log(result)

            props.user = { credit_cents: result.credit_cents, ...props.user }
        } catch (e) {
            //
        }
    }
}
const bills = [1, 2, 5, 10, 20, 50]

function UserView(props) {
    return (
        <div>
            <Heading>{props.user.name}'s Profile</Heading>
            <Heading size={4}>Credit:</Heading>
            <div>Balance: {props.user.credit_cents / 100}€</div>

            <Button.Group>
                {bills.map(bill => (
                    <Button
                        key={bill}
                        className="xd"
                        color="success"
                        onClick={modifyCredit(props, bill * 100)}
                    >
                        + {bill}€
                    </Button>
                ))}
            </Button.Group>

            <Button.Group>
                {bills.map(bill => (
                    <Button
                        key={bill}
                        className="xd"
                        color="danger"
                        onClick={modifyCredit(props, bill * -100)}
                    >
                        - {bill}€
                    </Button>
                ))}
            </Button.Group>

            <Heading size={4}>Buy:</Heading>
            <div>
                <ul style={{ margin: '-8px' }}>
                    {props.products.map(product => (
                        <li key={product.id} style={{ margin: '8px' }}>
                            <a
                                onClick={modifyCredit(
                                    props,
                                    -product.price_cents
                                )}
                            >
                                <Button
                                    style={{ width: '100%', height: '100%' }}
                                    color="danger"
                                >
                                    {product.name}
                                </Button>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <style jsx>{`
                li {
                    list-style: none;
                    display: inline-block;
                    width: 150px;
                    margin: 8px;
                    text-align: center;
                }
            `}</style>

            <style jsx>{`
                .xd {
                    width: 75px;
                }
            `}</style>
        </div>
    )
}

export default UserView
