const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { trackFile, requestFile, moveFile } = require('../controllers/fileController');

// Track a file movement
router.get('/:fileId', authMiddleware, trackFile);

// Request a file for movement
router.post('/:fileId/request', authMiddleware, requestFile);

// Move a file to another department
router.put('/:fileId/move', authMiddleware, moveFile);

module.exports = router;
