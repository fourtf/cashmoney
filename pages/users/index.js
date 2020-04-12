import { Button, Box, Control, Level, Form } from 'react-bulma-components'

export async function getServerSideProps(_ctx) {
    const db = await import('../../db')

    return {
        props: {
            users: db.getAllUsers(),
        },
    }
}

function UsersView(props) {
    return (
        <div>
            <Box>
                <Level>
                    <Level.Side align="left">
                        {/* <Level.Item>
                        <Form.Field className="has-addons">
                            <Form.Control>
                                <Form.Input color="link" />
                            </Form.Control>
                            <Form.Control>
                                <Button>Search</Button>
                            </Form.Control>
                        </Form.Field>
                    </Level.Item> */}
                    </Level.Side>

                    <Level.Side align="right">
                        <Level.Item>
                            <a href="/users/add">
                                <Button color="link">Create New</Button>
                            </a>
                        </Level.Item>
                    </Level.Side>
                </Level>
            </Box>

            {/* <Heading size="4">
            Users
            <Button>
                <a href="/users/add">Add</a>
            </Button>
        </Heading> */}

            <ul style={{ display: 'inline-block', 'text-align': 'center' }}>
                {props.users.map(user => (
                    <li key={user.name}>
                        <a href={'/users/@' + user.name}>
                            <Box>{user.name}</Box>
                        </a>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                li {
                    list-style: none;
                    display: inline-block;
                    width: 150px;
                    max-width: 37vw;
                    margin: 8px;
                    text-align: center;
                }
            `}</style>
        </div>
    )
}
export default UsersView
