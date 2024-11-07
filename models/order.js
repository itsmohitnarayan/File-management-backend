const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderType: { type: String, enum: ['purchase', 'sales'], required: true },
  status: { type: String, enum: ['initiated', 'approved', 'in_progress', 'completed'], default: 'initiated' },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
      quantity: Number
    }
  ],
  tenderStatus: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('Order', orderSchema);
