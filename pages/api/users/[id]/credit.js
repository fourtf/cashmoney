import { modifyUserCredit } from '../../../../db/users'

export default (req, res) => {
    const { id, change_cents } = req.query

    res.status(200).json(modifyUserCredit(id, change_cents))
}
