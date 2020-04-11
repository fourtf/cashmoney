export async function getServerSideProps(_ctx) {
    const db = await import('../db')

    return {
        props: {
            products: db.getAllProducts(),
        },
    }
}

export default props => (
    <div>
        <ul style={{ display: 'inline-block', 'text-align': 'center' }}>
            {props.products.map(product => (
                <li key={JSON.stringify(product)}>
                    <a href={'/products/' + product.id}>
                        {product.name || 'no name'}
                    </a>
                </li>
            ))}
        </ul>
        <ul>
            <a href="/add-product">Add</a>
        </ul>
    </div>
)
