export default (req, res) => {
    const { id, amount } = req.query
    res.status(200).json({ credit_cents: 100 })
}
