import { insertTransaction } from '../../../../db/transactions'
import { getProduct } from '../../../../db/products'
import { modifyUserCredit } from '../../../../db/users'

export default (req, res) => {
    const { id, product_id } = req.query

    const product = getProduct(product_id)
    modifyUserCredit(id, -product.price_cents)
    res.status(200).json(
        insertTransaction(-product.price_cents, id, product.id)
    )
}
