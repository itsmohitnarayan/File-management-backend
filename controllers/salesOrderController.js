import SalesOrder from '../models/SalesOrder.js';

// Create new Sales Order
export const createSalesOrder = async (req, res) => {
  try {
    const newOrder = new SalesOrder(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Update Sales Order status
export const updateSalesOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await SalesOrder.findByIdAndUpdate(
      orderId,
      { status, lastUpdated: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};

// Get Sales Order details
export const getSalesOrderById = async (req, res) => {
  try {
    const order = await SalesOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
};

// Add a comment to Sales Order
export const addComment = async (req, res) => {
  try {
    const { orderId, comment } = req.body;
    const updatedOrder = await SalesOrder.findByIdAndUpdate(
      orderId,
      { $push: { comments: comment }, lastUpdated: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};
