
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    image: {
        data: Buffer, // Store binary data
        contentType: String, // Store file type (e.g., image/png)
    },
    prodName: { type: String, require: true },
    price: { type: String, require: true },
    description: { type: String, require: true }
})
module.exports = mongoose.model('Products', productSchema)
