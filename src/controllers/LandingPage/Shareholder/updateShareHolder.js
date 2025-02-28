const mongoose = require('mongoose');
const ShareHolder = require('../../../models/shareHolder');

const updateShareHolder = async (req, res) => {
    const { name, title, description } = req.body;
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({ message: 'ShareHolder ID not found' });
    }

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Invalid ShareHolder ID' });
    }

    // Check if all fields are provided
    if (!name || !title || !description) {
        return res.status(400).json({ message: 'All fields are mandatory' });
    }

    try {
        // Corrected update function
        const updatedShareHolder = await ShareHolder.findByIdAndUpdate(
            id,
            { name, title, description },
            { new: true } // Returns the updated document
        );

        if (!updatedShareHolder) {
            return res.status(404).json({ message: 'ShareHolder not found' });
        }

        res.json({ message: 'ShareHolder updated successfully', updatedShareHolder });
    } catch (error) {
        console.error('Error updating ShareHolder:', error);
        res.status(500).json({ message: 'Error updating ShareHolder', error: error.message });
    }
};

module.exports = { updateShareHolder };
