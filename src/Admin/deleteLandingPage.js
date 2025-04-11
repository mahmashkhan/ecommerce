const Image = require('../models/landingImageSchema');

const deleteLandingPage = async (req, res) => {
    try {
        const deletedImage = await Image.findOneAndDelete();

        if (!deletedImage) {
            return res.status(404).json({ message: "No image found to delete." });
        }

        res.status(200).json({ message: "Success! Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deleteLandingPage };
