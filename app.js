const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const errorHandler = require('./utils/errorHandler');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');

const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});
app.use(limiter);

// app.use(mongoSanitize());

app.use(express.static(path.join(__dirname, 'public')));



app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/grades', gradeRoutes);

app.use(errorHandler);


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
  });
});

app.get('/', (req, res) => {
    res.send(`
        <center>
            <h1>Welcome to the Education-Management-system</h1>
            <br>
            <p>
                Get EXPENSE_CONTROLLER_TOOL: 
            <a href="https://github.com/RonakPatel2468/EXPENSE_CONTROLLER_TOOL.git" target="_blank">Repository:Education-Management-system </a>
            </p>
        </center>
    `);
});

// Set port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
