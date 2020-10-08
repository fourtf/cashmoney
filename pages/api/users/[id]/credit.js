import { modifyUserCredit } from '../../../../db/users'
import { insertTransaction } from '../../../../db/transactions'

export default (req, res) => {
    const { id, change_cents } = req.query

    insertTransaction(change_cents, id)
    res.status(200).json(modifyUserCredit(id, change_cents))
}
