import { addUser } from '../../../../db/users'

export default (req, res) => {
    const { name } = req.query
    try {
        addUser(name)

        res.status(200).json({})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
