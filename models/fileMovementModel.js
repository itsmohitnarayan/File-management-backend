const mongoose = require('mongoose');

const fileMovementSchema = new mongoose.Schema({
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
    fromDepartment: { type: String, required: true },
    toDepartment: { type: String, required: true },
    movedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FileMovement', fileMovementSchema);
