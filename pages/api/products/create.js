import { createProduct } from '../../../db/products'

export default (req, res) => {
    const { name, price_cents } = JSON.parse(req.body)
    try {
        createProduct(name, price_cents)

        res.status(200).json({})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
