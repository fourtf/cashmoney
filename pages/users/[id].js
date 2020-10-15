import { Button, Heading, Form } from 'react-bulma-components'
import fetch from 'isomorphic-unfetch'
import prepareUrl from '../../util/prepareUrl'
import React, { Component } from 'react'
import TransactionHistory from '../../components/TransactionHistory'
const { Input, Field, Control } = Form

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

                    <Field kind={'addons'}>
                        <Control>
                            <Input
                                type={'number'}
                                value={this.state.customAdd}
                                onChange={event => {
                                    this.setState({
                                        customAdd: event.target.value,
                                    })
                                }}
                                style={{ width: '150px' }}
                                placeholder="Custom amount"
                            />
                        </Control>
                        <Control>
                            <Button
                                key="custom"
                                color="success"
                                onClick={this.modifyCredit(
                                    props,
                                    props.customAdd * 100
                                )}
                            >
                                Deposit
                            </Button>
                        </Control>
                    </Field>
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
                    <Field kind={'addons'}>
                        <Control>
                            <Input
                                type={'number'}
                                value={this.state.customSub}
                                onChange={event => {
                                    this.setState({
                                        customSub: event.target.value,
                                    })
                                }}
                                style={{ width: '150px' }}
                                placeholder="Custom amount"
                            />
                        </Control>
                        <Control>
                            <Button
                                key="custom"
                                color="danger"
                                onClick={this.modifyCredit(
                                    props,
                                    props.customSub * -100
                                )}
                            >
                                Withdraw
                            </Button>
                        </Control>
                    </Field>
                </Button.Group>
                <Heading size={4}>Buy:</Heading>
                <div>
                    <Button.Group>
                        <ul style={{ margin: '-8px' }}>
                            {props.products.map(product => (
                                <li key={product.id} style={{ margin: '8px' }}>
                                    <a onClick={this.handleBuy(props, product)}>
                                        <Button
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            color="danger"
                                        >
                                            {product.name +
                                                ': ' +
                                                (
                                                    product.price_cents / 100
                                                ).toFixed(2) +
                                                '€'}
                                        </Button>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Button.Group>
                </div>
                <Heading size={4} style={{ marginTop: '26px' }}>
                    Recent Transactions:
                </Heading>
                <div>
                    <TransactionHistory transactions={props.transactions} />
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
