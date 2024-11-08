// routes/inventoryRequestRoutes.js
import express from 'express';
import { createRequest, getAllRequests, approveRequest } from '../controllers/inventoryRequestController.js';
import authMiddleware from '../middlewares/authMiddleware.js';  // Default import
import { checkRole } from '../middlewares/roleMiddleware.js';



const router = express.Router();

// Route to create a new inventory request
router.post('/create', authMiddleware, createRequest);

// Route to get all requests (admin/manager only)
router.get('/all', authMiddleware, checkRole(['admin', 'manager']), getAllRequests);

// Route to approve or reject a request (admin/manager only)
router.patch('/:requestId/approve', authMiddleware, checkRole(['admin', 'manager']), approveRequest);

export default router;
