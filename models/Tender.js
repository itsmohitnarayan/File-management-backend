import mongoose from 'mongoose';

const tenderSchema = new mongoose.Schema({
  tenderId: String,
  department: String,
  description: String,
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Tender = mongoose.model('Tender', tenderSchema);
export default Tender;
