import mongoose from 'mongoose';

const fileAnalyticsSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  department: String,
  movementTime: Number, // Time taken for file movement in ms
});

// Use default export for the schema
const FileAnalytics = mongoose.model('FileAnalytics', fileAnalyticsSchema);

export default FileAnalytics;
