import express from 'express';
import { createPurchaseOrder, updateOrderStatus } from '../controllers/purchaseOrderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', authMiddleware, createPurchaseOrder);
router.patch('/:id/status', authMiddleware, updateOrderStatus);

export default router;
