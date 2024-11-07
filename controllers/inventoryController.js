const Inventory = require('../models/inventory');
const monitoringService = require('../services/monitoringService');

exports.requestInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity } = req.body;
    let item = await Inventory.findOne({ itemName });
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (item.stockLevel < quantity) {
      item.backorder = true;
      item.purchaseOrders.push({
        orderId: new mongoose.Types.ObjectId().toString(),
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
};


exports.startInventoryMonitoring = async () => {
    setInterval(monitoringService.monitorStockLevels, 24 * 60 * 60 * 1000); // Daily check
  };