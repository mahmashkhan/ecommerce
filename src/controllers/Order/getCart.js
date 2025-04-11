const User = require('../../models/usersSchema'); 
const Item = require('../../models/itemsSchema'); 

const getCart = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
       
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const cart = await Item.findOne({ email: user.email });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

       
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getCart };
