const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: { type: String, required: true }, // Store image as Base64 string
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LandingImage', imageSchema);
