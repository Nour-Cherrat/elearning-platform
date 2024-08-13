const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.post('/progress', progressController.createProgress);
router.get('/progress', progressController.getAllProgress);
router.get('/progress/:id', progressController.getProgressById);
router.put('/progress/:id', progressController.updateProgress);
router.delete('/progress/:id', progressController.deleteProgress);

module.exports = router;
