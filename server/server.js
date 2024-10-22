const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); // Ensure this file exists
const taskRoutes = require('./routes/taskRoutes'); // Ensure this file exists
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(cors({
    origin: '*', // Use this for testing only, restrict later
    credentials: true,
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Serve index.html for all other routes
app.get('*', (req, res) => {
    const indexPath = path.resolve('../client/build', 'index.html');
    res.sendFile(indexPath);
});

// Start the server
app.listen(PORT, () => {
    console.log("hello");
    console.log(`Server is running on port ${PORT}`);
});