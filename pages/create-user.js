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
            nameColor: null,
        }
    }

    render() {
        return (
            <div>
                <Field>
                    <Control>
                        Name (a-z, 0-9, _):
                        <Input
                            type="text"
                            value={this.state.name}
                            onChange={this.inputOnChange.bind(this)}
                            color={this.state.nameColor}
                            className={this.state.enabled ? '' : 'is-disabled'}
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
                            Create User
                        </Button>
                    </Control>
                </Field>
            </div>
        )
    }

    inputOnChange(e) {
        this.setState({ name: e.target.value.toLowerCase(), nameColor: null })
        this.checkAvailable(e.target.value)
    }

    async checkAvailable(name) {
        if (name.length == 0) {
            return
        }

        try {
            const url = prepareUrl('api/usersByName/%/name_available', name)
            const result = await fetch(url).then(x => x.json())

            if (this.state.name == name) {
                this.setState({
                    nameColor: result.available ? 'success' : 'danger',
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    async submit() {
        const name = this.state.name
        if (name.length == 0) {
            return
        }

        this.setState({ enabled: false })

        try {
            const url = prepareUrl('api/usersByName/%/create', name)
            const result = await fetch(url).then(e => e.json())

            if (result.error) {
                throw result.error
            }

            Router.push('/users')
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
