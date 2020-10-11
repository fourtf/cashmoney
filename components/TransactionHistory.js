import React, { Component } from 'react'
import { Table } from 'react-bulma-components'

class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        const props = this.props
        return (
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Product</td>
                            <td>Sum</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.transactions.map(transaction => {
                            const product_name = transaction.name
                                ? transaction.name
                                : transaction.amount_cents > 0
                                ? 'Deposit'
                                : 'Withdrawal'
                            const color =
                                transaction.amount_cents > 0 ? 'green' : 'red'
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{product_name}</td>
                                    <td>
                                        <span style={{ color: color }}>
                                            {(
                                                transaction.amount_cents / 100
                                            ).toFixed(2) + '€'}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TransactionHistory
