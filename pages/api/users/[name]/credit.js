import { modifyUserCredit } from '../../../../db/users'

export default (req, res) => {
    const { name, change_cents } = req.query

    res.status(200).json(modifyUserCredit(name, change_cents))
}
