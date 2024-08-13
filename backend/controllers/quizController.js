const { Quiz } = require('../models');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.findAll();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ error: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
    try {
        const result = await Quiz.destroy({ where: { id: req.params.id } });
        if (result) {
            res.status(204).json({});
        } else {
            res.status(404).json({ error: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
