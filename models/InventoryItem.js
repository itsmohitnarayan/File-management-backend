import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  currentStock: { type: Number, required: true, default: 0 },
  minStockThreshold: { type: Number, required: true }, // When stock goes below this, reordering triggers
  reorderQuantity: { type: Number, required: true }, // Quantity to reorder
  usageLog: [
    {
      date: { type: Date, default: Date.now },
      quantityUsed: Number
    }
  ]
}, { timestamps: true });

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
export default InventoryItem;
