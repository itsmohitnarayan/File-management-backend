const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);
router.put('/status/:id', orderController.updateOrderStatus);

module.exports = router;
