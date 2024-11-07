const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/request', fileController.requestFile);
router.put('/approve/:id', fileController.approveFileMovement);
router.get('/track/:id', fileController.trackFile);

module.exports = router;
