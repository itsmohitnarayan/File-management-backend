const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  stockLevel: { type: Number, required: true },
  reorderLevel: { type: Number, default: 10 },
  backorder: { type: Boolean, default: false },
  purchaseOrder: [
    {
      orderId: String,
      quantity: Number,
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
      dateOrdered: Date,
      expectedDelivery: Date
    }
  ]
});

module.exports = mongoose.model('Inventory', inventorySchema);
