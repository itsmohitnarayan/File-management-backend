import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema({
  orderId: String,
  department: String,
  items: [{ item: String, quantity: Number, price: Number }],
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
export default PurchaseOrder;
