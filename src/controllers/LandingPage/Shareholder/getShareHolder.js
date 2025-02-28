
const ShareHolder = require('../../../models/shareHolder');
const getShareHolder = async (req, res) => {

    try {
        const shareHolders = await ShareHolder.find();
        if (shareHolders.length === 0) {
            return res.status(404).json({ message: 'No shareHolders found' });
        }
        res.status(200).json(shareHolders);
    } catch (error) {
        console.error('Error fetching shareHolders:', error);
        res.status(500).json({ message: 'Failed to fetch shareHolders' });
    }

}
module.exports = getShareHolder;