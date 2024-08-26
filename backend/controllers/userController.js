const { User, Course} = require('../models');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const result = await User.destroy({ where: { id: req.params.id } });
        if (result) {
            res.status(204).json({});
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Count all users and users by role
exports.getUserCount = async (req, res) => {
    try {
        const totalCount = await User.count();

        const adminCount = await User.count({ where: { role: 'admin' } });
        const teacherCount = await User.count({ where: { role: 'teacher' } });
        const studentCount = await User.count({ where: { role: 'student' } });

        res.status(200).json({
            totalUsers: totalCount,
            totalAdmins: adminCount,
            totalTeachers: teacherCount,
            totalStudents: studentCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
