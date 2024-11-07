const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const { orderType, items } = req.body;
    const order = new Order({ orderType, items });
    await order.save();
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = status;
    if (status === 'completed') order.completedAt = new Date();
    await order.save();
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
