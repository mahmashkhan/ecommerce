const mongoose = require('mongoose');
const items = require('./itemsSchema')
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    items: [items],
    totalPrice: { type: Number, required: true },
    
});

module.exports = mongoose.model("cart", cartSchema);
