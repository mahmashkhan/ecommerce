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
module.exports = { getProducts, getProdById }

