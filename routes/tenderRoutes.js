import express from 'express';
import { createTender, closeTender } from '../controllers/tenderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', authMiddleware, createTender);
router.patch('/:id/close', authMiddleware, closeTender);

export default router;
