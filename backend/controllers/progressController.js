const { Progress } = require('../models');

// Create a new progress record
exports.createProgress = async (req, res) => {
    try {
        const progress = await Progress.create(req.body);
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all progress records
exports.getAllProgress = async (req, res) => {
    try {
        const progress = await Progress.findAll();
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single progress record by ID
exports.getProgressById = async (req, res) => {
    try {
        const progress = await Progress.findByPk(req.params.id);
        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ error: 'Progress not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a progress record
exports.updateProgress = async (req, res) => {
    try {
        const progress = await Progress.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a progress record
exports.deleteProgress = async (req, res) => {
    try {
        const result = await Progress.destroy({ where: { id: req.params.id } });
        if (result) {
            res.status(204).json({});
        } else {
            res.status(404).json({ error: 'Progress not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
