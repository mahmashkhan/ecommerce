const Order = require("../models/orderScehma");

const getOrder = async (req, res) => {
    const order = await Order.find()
    res.status(200).json(order)
}
const getOrderById = async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    res.status(200).json(order)
}
module.exports = { getOrder ,getOrderById}