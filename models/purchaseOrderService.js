import PurchaseOrder from '../models/PurchaseOrder.js';

// Function to create a new purchase order
export const createPurchaseOrder = async (orderData) => {
  const newOrder = new PurchaseOrder(orderData);
  return await newOrder.save();
};

// Function to update the status of an existing purchase order
export const updateOrderStatus = async (orderId, status) => {
  return await PurchaseOrder.findByIdAndUpdate(orderId, { status }, { new: true });
};

// Function to retrieve a purchase order by its ID
export const getPurchaseOrderById = async (orderId) => {
  return await PurchaseOrder.findById(orderId);
};

// Function to list all purchase orders
export const listPurchaseOrders = async () => {
  return await PurchaseOrder.find();
};
