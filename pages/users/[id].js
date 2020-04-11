export function getServerSideProps(ctx) {
    return {
        props: {
            name: ctx.params['id'],
        },
    }
}

export default props => <div>{props.name}'s Profile</div>
