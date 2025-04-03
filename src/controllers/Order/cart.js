const mongoose = require("mongoose");
const Product = require("../../models/prodctusSchema");
const Items = require("../../models/itemsSchema");

const cart = async (req, res) => {
    const { email, name, productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ error: "Product not found" });jm
        }
        const price = product.price * quantity;
        let cart = await Items.findOne({ user: userId, name: name });
        if (!cart) {
            cart = new Items({
                user: userId,
                name: name,
                items: [],
                totalPrice: 0
            });
        }
        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === new mongoose.Types.ObjectId(productId).toString()
        );
        if (itemIndex > -1) { //-1 reutrn when comparison not found
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].price += price;
        } else {
            cart.items.push({ product: productId, quantity, price });
        }
        cart.totalPrice += price;
        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { cart };


