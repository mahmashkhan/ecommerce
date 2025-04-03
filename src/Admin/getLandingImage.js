const Image = require('../models/landingImageSchema');

const getLandingImage = async (req, res) => {
    try {
        const images = await Image.find();
        
        if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found" });
        }

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
};

module.exports = {getLandingImage};
