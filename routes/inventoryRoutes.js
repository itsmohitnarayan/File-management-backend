import express from 'express';
import {
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from '../controllers/inventoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import checkPermission from '../middlewares/accessControlMiddleware.js';
import { permissions } from '../config/roles.js';
import { useInventoryItem } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/use', authMiddleware, useInventoryItem);

// Route to view inventory - requires VIEW_INVENTORY permission
router.get('/', authMiddleware, checkPermission(permissions.VIEW_INVENTORY), getInventory);

// Route to create inventory item - requires MODIFY_INVENTORY permission
router.post('/create', authMiddleware, checkPermission(permissions.MODIFY_INVENTORY), createInventoryItem);

// Route to update inventory item - requires MODIFY_INVENTORY permission
router.patch('/update/:id', authMiddleware, checkPermission(permissions.MODIFY_INVENTORY), updateInventoryItem);

// Route to delete inventory item - requires DELETE_INVENTORY permission
router.delete('/delete/:id', authMiddleware, checkPermission(permissions.DELETE_INVENTORY), deleteInventoryItem);
router.get("/items", getInventoryItems);  // Check that `getInventoryItems` is defined and imported correctly
router.post("/items", createInventoryItem);  // Check that `createInventoryItem` is defined and imported correctly

export default router;
