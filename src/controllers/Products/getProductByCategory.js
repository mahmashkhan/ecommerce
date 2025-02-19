const Product = require('../../models/prodctusSchema')
const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        // console.log('category', typeof(category));

        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        } 
        const products = await Product.find({category:category});

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        } 

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
module.exports = getProductByCategory