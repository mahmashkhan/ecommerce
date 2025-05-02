const Order = require('../../models/orderScehma');
const mongoose = require('mongoose');

const getOrderByOrderId = async (req, res) => {
  const { id } = req.params
  const  order = await Order.findById(id)
  if (!id) { 
    res.status(400).json({ message: 'no id in params' })
  }
 if (!order) {
    res.status(400).json({ message: 'no product found' })
  }
  res.status(200).json(order)
}

module.exports = { getOrderByOrderId };
