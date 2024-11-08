import Inventory, { findOne, find } from '../models/inventory';
import { monitorStockLevels } from '../services/monitoringService';
import { Types } from 'mongoose';
import InventoryItem from '../models/InventoryItem.js';
import Backorder from '../models/Backorder.js';

export async function requestInventoryItem(req, res) {
  try {
    const { itemName, quantity } = req.body;
    let item = await findOne({ itemName });
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (item.stockLevel < quantity) {
      item.backorder = true;
      item.purchaseOrders.push({
        orderId: new Types.ObjectId().toString(),
        quantity,
        status: 'pending',
        dateOrdered: new Date()
      });
    } else {
      item.stockLevel -= quantity;
    }
    await item.save();
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function startInventoryMonitoring() {
  setInterval(monitorStockLevels, 24 * 60 * 60 * 1000); // Daily check
}

export async function getInventoryItems(req, res) {
  try {
    const items = await find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createInventoryItem(req, res) {
  try {
    const { itemName, stockLevel } = req.body;
    const newItem = new Inventory({ itemName, stockLevel });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Function to check inventory and create backorder if stock is low
export const checkAndCreateBackorder = async (itemId) => {
  const item = await InventoryItem.findById(itemId);
  if (item && item.stock < item.reorderThreshold && !item.backorder) {
    // Create a backorder
    const newBackorder = new Backorder({
      itemId: item._id,
      quantity: item.reorderThreshold - item.stock
    });
    await newBackorder.save();

    // Update the inventory item to show it has a backorder
    item.backorder = true;
    await item.save();
  }
};