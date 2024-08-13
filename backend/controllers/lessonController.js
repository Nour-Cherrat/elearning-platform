const { Lesson } = require('../models');

// Create a new lesson
exports.createLesson = async (req, res) => {
    try {
        const lesson = await Lesson.create(req.body);
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all lessons
exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single lesson by ID
exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id);
        if (lesson) {
            res.status(200).json(lesson);
        } else {
            res.status(404).json({ error: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a lesson
exports.updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a lesson
exports.deleteLesson = async (req, res) => {
    try {
        const result = await Lesson.destroy({ where: { id: req.params.id } });
        if (result) {
            res.status(204).json({});
        } else {
            res.status(404).json({ error: 'Lesson not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
