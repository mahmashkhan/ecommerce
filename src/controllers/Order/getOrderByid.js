const Order = require('../../models/orderScehma')
const getOrderById = async(req,res) => {
    const { id } = req.params;
    if (!id){
        res.status(404).json({message:'order id not found'})
    }
    try {
        
        const order = await Order.findById(id); // or .findOne({ _id: id })
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {getOrderById}
