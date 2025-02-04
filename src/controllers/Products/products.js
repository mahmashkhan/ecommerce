const mongoose = require("mongoose");
const product = require("../../models/prodctusSchema"); // Correctly import the model
const multer = require("multer");

// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory as a buffer
 const uploads = multer({ storage });

const createproduct = async (req, res) => {
    const {prodName, description, price,imageUrl } = req.body;

    if (!imageUrl || !description || !price || !prodName) {
        return res.status(400).json({ message: "Add complete details!" });
    }

    try {
        // Create a new Product with image as a buffer
        const newProduct = new product({
            prodName,
            description,
            price,
            imageUrl
        });

        await newProduct.save(); // Save the product to the database

        res.status(200).json({
            message: "Product Listed Successfully",
            product: {
                id: newProduct._id,
                name: newProduct.prodName,
                description: newProduct.description,
                price: newProduct.price,
                imageUrl: newProduct.imageUrl, 
            },
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Error saving product", error: error.message });
    }
};

module.exports = { createproduct, uploads };
