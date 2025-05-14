const Product = require("../../models/prodctusSchema");
const multer = require("multer");
const mongoose = require("mongoose");

// Multer setup for storing image in memory
const storage = multer.memoryStorage();
const updateUpload = multer({ storage });


const updateProduct = async (req, res) => {
    const { prodName, description, price, features } = req.body;
    const image = req.file;

    if (!prodName || !description || !price || !features) {
        res.status(400).json({ error: 'all feilds are require ' })
    }


    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Product ID not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid Product ID" });
    }
    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name : prodName,
                price,
                description,
                features,
                image: base64Image,
            },
            
        );
        await updatedProduct.save()

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product Updated", 
            id: updatedProduct._id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            features: updatedProduct.features,
            image: updatedProduct.image,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

module.exports = { updateProduct, updateUpload };