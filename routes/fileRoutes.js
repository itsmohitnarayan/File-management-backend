import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { trackFile, requestFile, moveFile } from '../controllers/fileController.js';

const router = express.Router();

// Track a file movement
router.get('/:fileId', authMiddleware, trackFile);

// Request a file for movement
router.post('/:fileId/request', authMiddleware, requestFile);

// Move a file to another department
router.put('/:fileId/move', authMiddleware, moveFile);

export default router;
