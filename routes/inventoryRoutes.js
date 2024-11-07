const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/request', inventoryController.requestInventoryItem);
router.get('/auto-reorder', inventoryController.autoReorder);

module.exports = router;
