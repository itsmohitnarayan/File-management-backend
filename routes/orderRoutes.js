const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.put('/tender/:id/:status', authMiddleware, orderController.updateTenderStatus);

module.exports = router;
