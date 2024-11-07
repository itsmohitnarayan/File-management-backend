const Inventory = require('../models/inventory');

exports.requestInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity } = req.body;
    let item = await Inventory.findOne({ itemName });
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (item.stockLevel < quantity) {
      item.backorder = true;
      item.purchaseOrder.push({
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.autoReorder = async (req, res) => {
  try {
    const items = await Inventory.find({ stockLevel: { $lt: reorderLevel } });
    items.forEach(async item => {
      item.purchaseOrder.push({
        orderId: new mongoose.Types.ObjectId().toString(),
        quantity: item.reorderLevel * 2,
        status: 'pending',
        dateOrdered: new Date()
      });
      await item.save();
    });
    res.json({ message: 'Reorder initiated for low-stock items' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
