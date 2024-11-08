import mongoose from 'mongoose';

const salesOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  itemList: [{ 
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' },
  createdDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  comments: [{ type: String }],
});

export default mongoose.model('SalesOrder', salesOrderSchema);
