const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentDepartment: { type: String, required: true },
  status: { type: String, enum: ['requested', 'approved', 'in_transit', 'received'], default: 'requested' },
  movementHistory: [
    {
      department: String,
      timestamp: Date,
      action: String
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
