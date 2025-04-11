const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    email: { type: String, ref: 'users', required: true },
    name: { type: String, required: true, ref: 'users' },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            prodName: { type: String, required: true },
            image: { type: String }  
        }
    ],
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Items', itemsSchema);
 