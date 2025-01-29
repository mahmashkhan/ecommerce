const mongoose = require('mongoose');
const itemsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },   
                   
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Items', itemsSchema);
