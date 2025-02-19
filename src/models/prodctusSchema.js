
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    prodName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true }
})
module.exports = mongoose.model('Products', productSchema)
