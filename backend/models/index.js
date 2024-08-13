const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Lesson = require('./Lesson');
const Quiz = require('./Quiz');
const Progress = require('./Progress');

// Associations
User.hasMany(Progress, { foreignKey: 'user_id' });
Course.hasMany(Lesson, { foreignKey: 'course_id' });
Course.hasMany(Progress, { foreignKey: 'course_id' });
Lesson.hasMany(Quiz, { foreignKey: 'lesson_id' });
Lesson.hasMany(Progress, { foreignKey: 'lesson_id' });

// Synchronize models with the database
sequelize.sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
    });

module.exports = {
    User,
    Course,
    Lesson,
    Quiz,
    Progress
};
