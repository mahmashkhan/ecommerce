const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true,  },
    image: { type: String, required: true },
    slug: { type: String, required: true, }
});

module.exports = mongoose.model("Category", categorySchema);
