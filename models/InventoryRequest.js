// models/InventoryRequest.js
import mongoose from 'mongoose';

const inventoryRequestSchema = new mongoose.Schema({
    department: { type: String, required: true },
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // 'Pending', 'Approved', 'Rejected'
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateRequested: { type: Date, default: Date.now },
    dateApproved: { type: Date },
    remarks: String,  // Optional field for approval/rejection reasons
});

const InventoryRequest = mongoose.model('InventoryRequest', inventoryRequestSchema);
export default InventoryRequest;
