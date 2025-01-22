const mongoose = require('mongoose');
const itemSchema = require('../models/itemsSchema'); // Import the Item schema

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    // items: {type:itemSchema.items },   ///problem here
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

// https://github.com/mahmashkhan/ecommerce.git