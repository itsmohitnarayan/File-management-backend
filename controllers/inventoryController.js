import Inventory, { findOne, find } from '../models/inventory';
import { monitorStockLevels } from '../services/monitoringService';
import { Types } from 'mongoose';
import InventoryItem from '../models/InventoryItem.js';
import Backorder from '../models/Backorder.js';
import { checkAndReorderStock } from '../services/stockMonitorService.js';

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

export const useInventoryItem = async (req, res) => {
  const { itemId, quantityUsed } = req.body;

  try {
    const item = await InventoryItem.findById(itemId);

    if (item.currentStock < quantityUsed) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    // Update stock and usage log
    item.currentStock -= quantityUsed;
    item.usageLog.push({ quantityUsed });

    await item.save();
    
    // Trigger reorder check if needed
    await checkAndReorderStock();

    res.status(200).json({ message: 'Stock updated and usage logged', item });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
};