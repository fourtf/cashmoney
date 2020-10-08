import { removeProduct } from '../../../../db/products'

export default (req, res) => {
    const { id } = req.query
    try {
        removeProduct(id)

        res.status(200).json({})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
