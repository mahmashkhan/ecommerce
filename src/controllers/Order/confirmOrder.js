const Order = require('../../models/orderScehma');


const confirmOrder = async (req, res) => {
    const { orderId } = req.params;
    if (orderId) {
        const order = await Order.findOne({ _id: orderId })

        if (!order) {
            res.status(400).json({ message: "Order Not Found" })
        }
        if (order.status !== 'Pending') {
            return res.status(400).json({ message: 'Order is not in Pending status' });
        }
        order.status = 'Shipped';
        order.updatedAt = Date.now();
        await order.save();
        res.status(200).json({ message: "Order Shipped", status: order.status })
    }
}
const deliverOrder = async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        res.status(404).json({ message: "Order not found" })
    }
    if (order.status !== 'Shipped' && 'Pending') {
        res.status(400).json({ message: 'Order is not in Shipped Status' })
    }
    order.status = 'Delivered';
    order.updatedAt = Date.now();
    await order.save()
    res.status(200).json({ message: "Order Delivered" })
}

const cancelOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status !== 'Shipped' && order.status !== 'Pending') {
            return res.status(400).json({ message: 'Order is not in Shipped or Pending status' });
        }

        const result = await Order.updateOne(
            { _id: orderId },
            { $set: { status: 'Cancelled', updatedAt: Date.now() } }
        );

        if (result.modifiedCount === 0 && result.nModified === 0) {
            return res.status(400).json({ message: 'Failed to update the order' });
        }


        return res.status(200).json({ message: "Order Cancelled " });

    } catch (error) {
        console.error('Error canceling order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const refundOrder = async (req, res) => {
    const { orderId } = req.params
    try {
        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status !== 'Cancelled') {
            return res.status(400).json({ message: 'Order is not in Cancelled Status' });
        }
        const result = await Order.updateOne(
            { _id: orderId },
            { $set: { status: 'Refund', updatedAt: Date.now() } } 
        );
        if (result.nModified === 0) {
            return res.status(400).json({ message: 'Failed to update the order' });
        }

        return res.status(200).json({ message: "Order marked as Refunded " });


    } catch (error) {
        console.error('Error canceling order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { confirmOrder, deliverOrder, cancelOrder, refundOrder }