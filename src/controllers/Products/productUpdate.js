const Product = require("../../models/prodctusSchema"); // Correctly import the model
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.memoryStorage();
const updateUpload = multer({ storage });

const updateProduct = async (req, res) => {
    const { description, name, price } = req.body;
    const file = req.file;

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Product ID not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                price,
                description,
                ...(file && {
                    image: {
                        
                        contentType: file.mimetype,
                    },
                }),
            },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product Updated",
            id: updatedProduct._id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            image: updatedProduct.image,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

module.exports = { updateProduct, updateUpload };