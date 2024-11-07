import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createFile, getAllFiles, trackFile, requestFile, moveFile, uploadFile, deleteFile} from '../controllers/fileController.js';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ dest: 'uploads/' });

// Add a new route for uploading files
router.post('/upload', upload.single('file'), uploadFile);

// Create a new file
router.post('/', authMiddleware, createFile);

router.get('/', authMiddleware, getAllFiles);

// Track a file movement
router.get('/:fileId', authMiddleware, trackFile);

// Request a file for movement
router.post('/:fileId/request', authMiddleware, requestFile);

// Move a file to another department
router.put('/:fileId/move', authMiddleware, moveFile);

router.delete('/:fileId', authMiddleware, deleteFile);

router.get('/files', async (req, res) => {
    try {
      const { fileName, department, status } = req.query;
      const query = {};
  
      if (fileName) query.fileName = { $regex: fileName, $options: 'i' }; // case-insensitive search
      if (department) query.department = department;
      if (status) query.status = status;
  
      const files = await File.find(query);
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: "Failed to search files", message: error.message });
    }
  });

  router.put('/:fileId/update', authMiddleware, async (req, res) => {
    try {
      const { fileId } = req.params;
      const { status } = req.body;
  
      const file = await File.findByIdAndUpdate(fileId, { status }, { new: true });
      if (!file) return res.status(404).json({ error: "File not found" });
  
      res.json({ message: `File status updated successfully`, file });
    } catch (error) {
      res.status(500).json({ error: "Failed to update file", message: error.message });
    }
  });

export default router;
