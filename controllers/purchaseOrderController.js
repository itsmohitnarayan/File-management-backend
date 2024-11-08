import PurchaseOrder from '../models/PurchaseOrder.js';

export const createPurchaseOrder = async (req, res) => {
  try {
    const newOrder = new PurchaseOrder(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create purchase order' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: new Date() }, // Add timestamp for when status is updated
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

export const getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve purchase order' });
  }
};

export const listPurchaseOrders = async (req, res) => {
  try {
    const filters = req.query || {};
    const orders = await PurchaseOrder.find(filters);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list purchase orders' });
  }
};