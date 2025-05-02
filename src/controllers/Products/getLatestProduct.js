const Product = (require('../../models/prodctusSchema'));
const LatestProduct =async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1}).limit(8);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};
module.exports = LatestProduct;  