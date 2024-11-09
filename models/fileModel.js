import mongoose from 'mongoose';

// const fileSchema = new mongoose.Schema({
//   department: { type: String, required: true }, // Associated department for access control
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   fileName: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     required: true
//   },
//   filePath: {
//     type: String,
//     required: true
//   },
//   createdOn: {
//     type: Date,
//     default: Date.now
//   },
//   versions: [{ filePath: String, timestamp: Date }],
//   createdAt: { type: Date, default: Date.now },
//   tags: [String],
//   description: String,
// });

const movementSchema = new mongoose.Schema({
  fromDepartment: { type: String, required: true },
  toDepartment: { type: String, required: true },
  movedAt: { type: Date, default: Date.now },
});

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movements: [movementSchema],  // Array to store movement history
  filePath: { type: String, required: true }  // Ensure filePath is part of the schema
});

const File = mongoose.model('File', fileSchema);

export default File;
