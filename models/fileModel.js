import mongoose from 'mongoose';

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
});

const File = mongoose.model('File', fileSchema);

export default File;

