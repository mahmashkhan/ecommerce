const Order = require('../../models/orderScehma');
const Cart = require('../../models/itemsSchema');

const order = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = new Order({
            user: userId,
            items: cart.items,
            totalPrice: cart.totalPrice
        });

        await order.save();

        // Clear the cart after placing the order
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { order };