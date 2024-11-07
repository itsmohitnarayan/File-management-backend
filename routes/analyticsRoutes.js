import express from 'express';
import { getFileMovementAnalytics } from '../controllers/analyticsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { checkRole } from '../middlewares/accessControl.js';


const router = express.Router();

router.get('/file-movement', authMiddleware, getFileMovementAnalytics);
// Only allow admin and manager roles to access analytics
router.get('/movement-analytics', authMiddleware, checkRole(['admin', 'manager']), getFileMovementAnalytics);
router.get('/analytics', getFileMovementAnalytics);
// Define the route
router.get('/file-movement', authMiddleware, getFileMovementAnalytics);
export default router;
