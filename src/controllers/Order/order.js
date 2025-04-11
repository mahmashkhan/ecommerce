const Order = require('../../models/orderScehma');
const Cart = require('../../models/itemsSchema');

const order = async (req, res) => {
    const { email, name, contact, postalCode, address, city, state,user } = req.body;
  
    try {
        const cart = await Cart.findOne({ email: email });
        console.log('checking cart to find ProdName', cart )
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = new Order({ 
            user:user,
            email: email,
            name: name,
            contact: contact,
            postalCode: postalCode,
            address: address,      
            state: state,
            city: city,
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