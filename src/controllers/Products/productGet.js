const Product = require("../../models/prodctusSchema")
const getProducts = async (req, res) => {
    const products = await Product.find()
   
    res.status(200).json(products)

}
const getProdById = async (req, res) => {
    const { id } = req.params
    const prodByid = await Product.findById(id)
    
    res.status(200).json(prodByid)
}
const getImageById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Product ID format" });
    }
      const product = await Product.findById(id);
  
      if (product && product.image && product.image.data) {
        res.setHeader('Content-Type', product.image.contentType);
        res.send(product.image.data); // Send the binary image data
      } else {
        return res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching image" });
    }
  };
module.exports = { getProducts, getProdById, getImageById }

