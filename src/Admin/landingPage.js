const Image = require('../models/landingImageSchema');
const multer = require('multer');

// Multer setup to store image in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const landingPage = async (req, res) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: 'Upload an image' });
        }
        const prevImage =  Image.findOne()
        if (prevImage){
            res.status(400).json({message:"only one image allowed for landing page"})
        }
 
        // Convert image buffer to Base64
        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

        // Save image to MongoDB
        const newImage = new Image({ image: base64Image });
        await newImage.save();

        res.status(200).json({ message: "Landing Page Image uploaded successfully", image: newImage });
    } catch (error) {
        res.status(500).json({ message: "Error uploading image", error: error.message });
    }
};

module.exports = { landingPage, upload };
