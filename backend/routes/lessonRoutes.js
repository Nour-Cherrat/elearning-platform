const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/lessons', lessonController.createLesson);
router.get('/lessons', lessonController.getAllLessons);
router.get('/lessons/:id', lessonController.getLessonById);
router.put('/lessons/:id', lessonController.updateLesson);
router.delete('/lessons/:id', lessonController.deleteLesson);

module.exports = router;
