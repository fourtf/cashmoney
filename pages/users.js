import { Button, Box, Heading } from 'react-bulma-components'
// import { Input } from 'react-bulma-components/lib/components/form'

export async function getServerSideProps(_ctx) {
    const db = await import('../db')

    return {
        props: {
            users: db.getAllUsers(),
        },
    }
}

export default props => (
    <div>
        {/* <Button>
            <a href="/users/add">Add</a>
        </Button> */}

        {/* <Heading size="4">
            Users
            <Button>
                <a href="/users/add">Add</a>
            </Button>
        </Heading> */}

        <ul style={{ display: 'inline-block', 'text-align': 'center' }}>
            {props.users.map(user => (
                <li className="xd" key={user.name}>
                    <a href={'/users/@' + user.name}>
                        <Box>{user.name}</Box>
                    </a>
                </li>
            ))}
            <li className="xd">
                <a href="/users/add">
                    <Box>Add</Box>
                </a>
            </li>
        </ul>
        <style jsx>{`
            li {
                list-style: none;
                display: inline-block;
            }

            .xd {
                width: 150px;
                margin: 8px;
                text-align: center;
            }
        `}</style>
    </div>
)
