import { Button, Box, Level } from 'react-bulma-components'

export async function getServerSideProps(_ctx) {
    const db = await import('../../db/users')

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
                <a href="/create-user">
                    <Button color="link">Create New</Button>
                </a>
            </Box>

            <ul style={{ display: 'inline-block', textAlign: 'center' }}>
                {props.users.map(user => (
                    <li key={user.name}>
                        <a href={'/users/' + user.id}>
                            <Box>
                                {user.name} - {user.credit_cents / 100}€
                            </Box>
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
