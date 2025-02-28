const mongoose = require('mongoose');
const shareHolder = new mongoose.Schema({
    name: { type: String, required: true,  },
    title: { type: String, required: true },
    description: { type: String, required: true, }
});

module.exports = mongoose.model("ShareHolder", shareHolder);