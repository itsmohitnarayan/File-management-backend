const mongoose = require('mongoose');

const fileAnalyticsSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  department: String,
  movementTime: Number, // Time taken for file movement in ms
});

module.exports = mongoose.model('FileAnalytics', fileAnalyticsSchema);
