import React, { Component } from 'react'
import { Table } from 'react-bulma-components'
import prepareUrl from '../util/prepareUrl'
import fetch from 'isomorphic-unfetch'

class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
        }
    }

    componentDidMount() {
        this.updateTransactions(this.props.user_id, this.props.limit)
    }

    componentWillReceiveProps(props) {
        const { refresh } = props
        if (this.props.refresh !== refresh) {
            this.updateTransactions(props.user_id, props.limit)
        }
    }

    render() {
        const props = this.state

        if (!props.transactions.length) return null

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
                            const product_name = transaction.product_name
                                ? transaction.product_name
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

    async updateTransactions(user_id, limit) {
        try {
            const url = prepareUrl(
                'api/transactions/get?user_id=%&limit=%',
                user_id,
                limit
            )
            const result = await fetch(url).then(x => x.json())

            this.setState({
                transactions: result,
            })
        } catch (e) {
            alert(e)
        }
    }
}

export default TransactionHistory
