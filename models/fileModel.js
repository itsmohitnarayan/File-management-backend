import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  department: { type: String, required: true }, // Associated department for access control
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  versions: [{ filePath: String, timestamp: Date }],
  createdAt: { type: Date, default: Date.now },
  tags: [String],
  description: String,
});

const File = mongoose.model('File', fileSchema);

export default File;
