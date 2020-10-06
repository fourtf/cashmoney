import { Button, Box, Columns, Heading } from 'react-bulma-components'
import fetch from 'isomorphic-unfetch'
import prepareUrl from '../../util/prepareUrl'
import { Component } from 'react'

const bills = [1, 2, 5, 10, 20, 50]

// Component which takes the initial state from the props and modifies them when adding/removing credits.
class UserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = props.initialState
    }

    render() {
        const props = this.state

        if (props.user == null) {
            return <div>404 User not found</div>
        }

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
                            onClick={this.modifyCredit(props, bill * 100)}
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
                            onClick={this.modifyCredit(props, bill * -100)}
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
                                    onClick={this.modifyCredit(
                                        props,
                                        -product.price_cents
                                    )}
                                >
                                    <Button
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
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

    modifyCredit(props, amount) {
        return async () => {
            try {
                const url = prepareUrl(
                    'api/users/%/credit?change_cents=%',
                    props.user.id,
                    amount
                )
                const result = await fetch(url).then(x => x.json())

                this.setState(s => {
                    let n = { ...s }
                    n.user.credit_cents = result.credit_cents
                    return n
                })
            } catch (e) {
                alert(e)
            }
        }
    }
}

export async function getServerSideProps(ctx) {
    const id = ctx.params['id']

    const dbUsers = await import('../../db/users')
    const dbProducts = await import('../../db/products')

    // TODO
    const user = dbUsers.getUser(id) || null
    const products = dbProducts.getAllProducts()

    return {
        props: {
            user,
            products,
        },
    }
}

function UserView(props) {
    return <UserComponent initialState={props} />
}

export default UserView
