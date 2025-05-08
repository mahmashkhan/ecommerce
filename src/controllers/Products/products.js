const multer = require("multer");
const Product = require("../../models/prodctusSchema");

// Multer setup for storing image in memory
const storage = multer.memoryStorage();
const uploads = multer({ storage });

const createproduct = async (req, res) => {
    try {
        const { prodName, description, price, category, features } = req.body;
        const image = req.file;

        // Validate required fields
        if (!image || !description || !price || !prodName || !category||!features) {
            return res.status(400).json({ message: "All fields including an image are required!" });
        }

        // Convert image buffer to Base64
        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

        
        const newProduct = new Product({
            prodName,
            description,
            price,
            category,
            features,
            image: base64Image, // Store Base64 directly in MongoDB
        });

        await newProduct.save();  

        res.status(201).json({
            message: "Product Listed Successfully",
            product: newProduct, 
        });
    } catch (error) { 
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Error saving product", error: error.message });
    } 
};


module.exports = { createproduct, uploads };

// note
//in this code image is save in db as base64 string so that it will be easy to render in frontend  just <img src={product.image} alt={product.prodName} /> will render the image
   