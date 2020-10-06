import { userAvailable } from '../../../../db/users'

export default (req, res) => {
    const { name } = req.query

    res.status(200).json({ available: userAvailable(name) })
}
