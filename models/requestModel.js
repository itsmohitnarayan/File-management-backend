import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true,
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied'],
        default: 'Pending',
    },
    requestDate: {
        type: Date,
        default: Date.now,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    approvalDate: {
        type: Date,
    },
});

export default mongoose.model('Request', requestSchema);
