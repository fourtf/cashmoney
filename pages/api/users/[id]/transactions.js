import { getRecentTransactionsOfUser } from '../../../../db/transactions'

export default (req, res) => {
    const { id, limit } = req.query
    res.status(200).json(getRecentTransactionsOfUser(id, limit))
}
