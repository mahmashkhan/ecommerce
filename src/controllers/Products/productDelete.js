const Product = require("../../models/prodctusSchema"); 
const mongoose = require("mongoose")
const productDelete = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }

    try {
        // Find the product by ID and delete it
        const productToDelete = await Product.findByIdAndDelete(id);

        if (!productToDelete) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product Deleted!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

module.exports = { productDelete };