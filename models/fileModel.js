import mongoose, { version } from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  department: {
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

