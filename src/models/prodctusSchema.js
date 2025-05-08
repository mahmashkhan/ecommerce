const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    prodName: { type: String, required: true },
    description: { type: String, required: true },
    features: { type:  String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }, // Store image as Base64 string
});

module.exports = mongoose.model("Product", productSchema);
