const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String,
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
