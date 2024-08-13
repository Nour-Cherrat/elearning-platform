const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Lesson = require('./Lesson');

const Progress = sequelize.define('Progress', {
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    completed_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

Progress.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Progress.belongsTo(Course, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Progress.belongsTo(Lesson, { foreignKey: 'lesson_id', onDelete: 'CASCADE' });

module.exports = Progress;
