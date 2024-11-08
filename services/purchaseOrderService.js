import PurchaseOrder from '../models/PurchaseOrder.js';

// Create a new purchase order
export const createPurchaseOrder = async (orderData) => {
  try {
    const newOrder = new PurchaseOrder(orderData);
    return await newOrder.save();
  } catch (error) {
    throw new Error('Failed to create purchase order: ' + error.message);
  }
};

// Update the status of an existing order
export const updateOrderStatus = async (orderId, status) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    throw new Error('Failed to update order status: ' + error.message);
  }
};

// Get all purchase orders
export const getAllPurchaseOrders = async () => {
  try {
    return await PurchaseOrder.find();
  } catch (error) {
    throw new Error('Failed to fetch purchase orders: ' + error.message);
  }
};

// Get a specific purchase order by ID
export const getPurchaseOrderById = async (orderId) => {
  try {
    const order = await PurchaseOrder.findById(orderId);
    return order;
  } catch (error) {
    throw new Error('Failed to fetch purchase order: ' + error.message);
  }
};

// List all purchase orders (this is the missing function)
export const listPurchaseOrders = async () => {
  try {
    return await PurchaseOrder.find().exec();  // Get all orders
  } catch (error) {
    throw new Error('Failed to list purchase orders: ' + error.message);
  }
};
