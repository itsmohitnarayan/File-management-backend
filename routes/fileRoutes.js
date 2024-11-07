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

export default router;
