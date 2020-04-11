export async function getServerSideProps(ctx) {
    const paramId = ctx.params['id']

    if (!paramId.startsWith('@')) {
        ctx.res.writeHead(302, { Location: '/users/@' + paramId })
        ctx.res.end()
    }

    const id = paramId.substr(1)
    const db = await import('../../db')
    const user = db.getUser(id)

    return {
        props: user,
    }
}

export default props => (
    <div>
        <div>{props.name}'s Profile</div>
        <div>Balance: {props.credit_cents / 100}€</div>
    </div>
)
