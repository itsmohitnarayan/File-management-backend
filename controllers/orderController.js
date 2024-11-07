const Order = require('../models/order');
const notificationService = require('../services/notificationService');

exports.createOrder = async (req, res) => {
  try {
    const { orderType, items } = req.body;
    const order = new Order({ orderType, items });
    await order.save();
    
    notificationService.sendNotification("Order created successfully.", req.user.id);
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTenderStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.tenderStatus = status;
    await order.save();
    
    notificationService.sendNotification(`Tender status updated to ${status}.`, req.user.id);
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
