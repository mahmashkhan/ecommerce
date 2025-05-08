const mongoose = require('mongoose');
const Cart = require('../../models/itemsSchema');

const deleteSingleProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid cartId or productId' });
  }
 
  try {
    // Find the cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item to remove
    const itemToRemove = cart.items.find(item => item.product.toString() === productId);
    if (!itemToRemove) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the product from items array
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Save updated cart
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while removing product from cart' });
  }
};

module.exports = {deleteSingleProductFromCart};
