
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    imageUrl: { type: String, require: true },
    prodName: { type: String, require: true },
    price: { type: String, require: true },
    description: { type: String, require: true }
})
module.exports = mongoose.model('Products', productSchema)
