const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lesson = require('./Lesson');

const Quiz = sequelize.define('Quiz', {
    question: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    options: {
        type: DataTypes.JSON,
        allowNull: false
    },
    correct_answer: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

Quiz.belongsTo(Lesson, { foreignKey: 'lesson_id', onDelete: 'CASCADE' });

module.exports = Quiz;
