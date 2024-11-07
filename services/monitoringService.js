const Inventory = require('../models/inventory');
const notificationService = require('./notificationService');

exports.monitorStockLevels = async () => {
  const items = await Inventory.find({});

  items.forEach(async (item) => {
    if (item.stockLevel < item.reorderLevel && !item.backorder) {
      item.backorder = true;
      await item.save();
      notificationService.sendAlert(`Item ${item.itemName} is below reorder level. Reorder initiated.`);
    }
  });
};
