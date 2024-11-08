import express from 'express';
import {
  createSalesOrder,
  updateSalesOrderStatus,
  getSalesOrderById,
  addComment
} from '../controllers/salesOrderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createSalesOrder);
router.patch('/status', authMiddleware, updateSalesOrderStatus);
router.get('/:id', authMiddleware, getSalesOrderById);
router.patch('/comment', authMiddleware, addComment);

export default router;
