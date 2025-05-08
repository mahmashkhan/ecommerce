const About = require('../models/aboutSchema'); 

const addAbout = async (req, res) => {
    try {
        const { aboutUs } = req.body;

        if (!aboutUs || aboutUs.trim() === '') {
            return res.status(400).json({ message: 'About Us cannot be empty' });
        }

        const about = new About({ aboutUs });

        await about.save();

        res.status(201).json({ message: 'About Us saved successfully', data: about });
    } catch (error) {
        console.error('Error saving About Us:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getAbout = async( req, res) => {
    try {
        const about = await About.findOne({});
        if (!about) {
            return res.status(404).json({ message: 'About Us not found' });
        }
        res.status(200).json({ message: 'About Us retrieved successfully', data: about });
    } catch (error) {
        console.error('Error retrieving About Us:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { addAbout,getAbout };
