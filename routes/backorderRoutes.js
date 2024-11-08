// routes/backorderRoutes.js
import express from 'express';
import { getBackorders, updateBackorderStatus } from '../controllers/backorderController.js';

const router = express.Router();

router.get('/', getBackorders);
router.put('/:id', updateBackorderStatus);

export default router;
