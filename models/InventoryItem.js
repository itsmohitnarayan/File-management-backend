// models/InventoryItem.js
import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  reorderThreshold: {
    type: Number,
    default: 10 // Threshold for triggering backorder
  },
  backorder: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
export default InventoryItem;
