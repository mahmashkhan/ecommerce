const Order = require('../../models/orderScehma');
const Cart = require('../../models/itemsSchema');
const Product = require('../../models/prodctusSchema');
const stripe = require('stripe')('sk_test_51RE2fUP4ZkTLD7RN9WXQ42mkFx6KzQF4aR13rjxvTO5vjI84q4KSsbtqixNWZ8GnDlSOT2lQ2vzkURlscHJ8ZyuC00WyfV53UK');

const order = async (req, res) => {
    const { email, name, contact, postalCode, address, city, state, user, paymentMethodId } = req.body;

    try {
        const cart = await Cart.findOne({ email: email});
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const paymentIntent = await stripe.paymentIntents.create({ 
            amount: cart.totalPrice,
            currency: 'usd',
            payment_method: paymentMethodId,   //come from frontend
            confirm: true, //accept the payment right away
            automatic_payment_methods: {
                allow_redirects: 'never', //avoid redirect
                enabled: true 
            }
        })

        let paymentStatus = 'Pending';
        if (paymentIntent.status === 'succeeded') {
            paymentStatus = 'Paid';
        } else if (paymentIntent.status === 'requires_payment_method' || paymentIntent.status === 'failed') {
            paymentStatus = 'Failed';
        }

        // Create the order document
        const order = new Order({
            user: user,
            email: email,
            name: name,
            contact: contact,
            postalCode: postalCode,
            address: address,
            state: state,
            city: city,
            items: cart.items.map(item => ({
                product: item.product,
                quantity: item.quantity,
                price: item.price,
                prodName: item.prodName,
                image: item.image,
            })),
            totalPrice: cart.totalPrice,
            paymentStatus: paymentStatus,
        });

        // Save the order to the database
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
