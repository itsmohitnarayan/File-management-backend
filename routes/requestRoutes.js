import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkRole from '../middlewares/checkRole.js';
import * as requestController from '../controllers/requestController.js';

const router = express.Router();

// Route to create a file request
router.post('/request', authMiddleware, requestController.createRequest);

// Route to approve/deny a request (admin only)
router.put('/approve/:id', authMiddleware, checkRole('admin'), requestController.approveRequest);

// Route to view all requests
router.get('/', authMiddleware, requestController.getAllRequests);

export default router;
