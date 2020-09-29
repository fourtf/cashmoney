import { Button, Table } from 'react-bulma-components'
import prepareUrl from '../../util/prepareUrl'
import fetch from 'isomorphic-unfetch'

export async function getServerSideProps(_ctx) {
    const db = await import('../../db/products')

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
            <a href="/create-product">
                <Button color="link">Add</Button>
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

                            <td>
                                <Button onClick={() => delet(product.id)}>
                                    {' '}
                                    Delete
                                </Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

async function delet(id) {
    try {
        const url = prepareUrl('api/products/delete/%', id)
        await fetch(url).then(x => x.json())

        window.location.reload()
    } catch (e) {
        alert(e)
    }
}

export default ProductsView
