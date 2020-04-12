export default (req, res) => {
    console.log(req)
    res.status(200).json({ credit_cents: 100 })
}
