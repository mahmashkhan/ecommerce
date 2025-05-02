const Order = require('../../models/orderScehma');
const mongoose = require('mongoose');

const getOrderById = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) { //because userId in db is saved as object
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    try { 
        const orders = await Order.find({ user: new mongoose.Types.ObjectId(userId) });


        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        return res.json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
module.exports = { getOrderById };
