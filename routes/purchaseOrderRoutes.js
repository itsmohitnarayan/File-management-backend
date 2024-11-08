import express from 'express';
import { createPurchaseOrder, updateOrderStatus, getPurchaseOrderById, listPurchaseOrders } from '../controllers/purchaseOrderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/create', createPurchaseOrder);
router.put('/:id/status', updateOrderStatus);
router.get('/:id', getPurchaseOrderById);
router.get('/', listPurchaseOrders);
router.post('/', authMiddleware, createPurchaseOrder);
router.patch('/:id/status', authMiddleware, updateOrderStatus);
// Route to create a new purchase order
router.post('/purchase-orders', createPurchaseOrder);

// Route to update the status of a purchase order
router.put('/purchase-orders/:id/status', updateOrderStatus);

export default router;
