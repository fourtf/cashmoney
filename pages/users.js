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
        <ul>
            {props.users.map(user => (
                <li key={JSON.stringify(user)}>
                    <a href={'/users/' + user.name}>{user.name}</a>
                </li>
            ))}
        </ul>
    </div>
)
