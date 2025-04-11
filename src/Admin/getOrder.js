const Order = require("../models/orderScehma");
const User = require("../models/usersSchema");
const getOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving all orders", error });
    }
}

const getOrderById = async (req, res) => {
    const { _id } = req.params;

    try {
    
        const orders = await Order.find({ user: _id });

        if (!orders) {
            return res.status(404).json({ message: "No orders found for this user" });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

module.exports = { getOrder };
    