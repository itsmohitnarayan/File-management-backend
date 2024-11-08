import InventoryItem from '../models/InventoryItem.js';
import { createPurchaseOrder } from './purchaseOrderService.js';


export const checkAndReorderStock = async () => {
  const itemsToReorder = await InventoryItem.find({ 
    currentStock: { $lt: this.minStockThreshold } 
  });

  itemsToReorder.forEach(async item => {
    await createPurchaseOrder({
      itemId: item._id,
      quantity: item.reorderQuantity,
      reason: 'Auto-reorder due to low stock'
    });

    console.log(`Reorder triggered for item: ${item.name}`);
  });
};
