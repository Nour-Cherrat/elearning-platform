const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type,Authorization' // Allowed headers
}));

app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const progressRoutes = require('./routes/progressRoutes');
const authRoutes = require('./routes/authRoutes'); // Add this line

// Use routes
app.use('/api', authRoutes); // Add this line
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', lessonRoutes);
app.use('/api', quizRoutes);
app.use('/api', progressRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error syncing with the database:', error);
    });
