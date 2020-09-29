import { Button, Form } from 'react-bulma-components'
import { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import prepareUrl from '../util/prepareUrl'
import Router from 'next/router'

const { Control, Field, Input } = Form

class NewUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enabled: true,
            name: '',
            price_cents: 100,
        }
    }

    render() {
        return (
            <div>
                <Field>
                    <Control>
                        Name:
                        <Input
                            type="text"
                            value={this.state.name}
                            onChange={this.setName.bind(this)}
                            disabled={!this.state.enabled}
                        />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        Price (in ct):
                        <Input
                            type="number"
                            value={this.state.price_cents}
                            onChange={this.setPrice.bind(this)}
                            disabled={!this.state.enabled}
                        />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button
                            onClick={this.submit.bind(this)}
                            className={this.state.enabled ? '' : 'is-loading'}
                        >
                            Create Product
                        </Button>
                    </Control>
                </Field>
            </div>
        )
    }

    setName(e) {
        this.setState({ name: e.target.value })
    }

    setPrice(e) {
        this.setState({ price_cents: parseInt(e.target.value) })
    }

    async submit() {
        this.setState({ enabled: false })

        try {
            const url = prepareUrl('api/products/create')
            const result = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    price_cents: this.state.price_cents,
                }),
            }).then(e => e.json())

            if (result.error) {
                throw result.error
            }

            Router.push('/products')
        } catch (e) {
            alert(e)
            this.setState({ enabled: true })
        }
    }
}

function NewUser() {
    return <NewUserComponent />
}

export default NewUser
