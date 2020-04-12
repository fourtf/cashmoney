import { Button, Table } from 'react-bulma-components'

export async function getServerSideProps(_ctx) {
    const db = await import('../db')

    return {
        props: {
            products: db.getAllProducts(),
        },
    }
}

const ignored = 'creation_date'

function ProductsView(props) {
    // get all keys available
    const headersMap = {}
    props.products.forEach(x => {
        for (const key in x) {
            headersMap[key] = 1
        }
    })
    const headers = Object.keys(headersMap).filter(x => !ignored.includes(x))

    return (
        <div>
            <a href="/add-product">
                <Button color="link" href="/add-product">
                    Add
                </Button>
            </a>

            <Table>
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.products.map(product => (
                        <tr key={product.id}>
                            {headers.map(header => (
                                <td key="header">{product[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ProductsView
