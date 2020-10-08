import { getRecentUserTransactions } from '../../../db/transactions'

export default (req, res) => {
    const { user_id, limit } = req.query
    res.status(200).json(getRecentUserTransactions(user_id, limit))
}
