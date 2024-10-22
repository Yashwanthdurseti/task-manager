const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Add this line before your routes
app.use(cors());

// app.use(cors({
//     origin: 'https://task-manager-yashwanth-941d9764a925.herokuapp.com/api', // Replace with your Heroku app URL
//     credentials: true,
// }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back the React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

app.get('*', (req, res) => {
    console.log(`Catch-all route hit: ${req.url}`);
    const indexPath = path.join(__dirname, '../client/build', 'index.html');
    res.sendFile(indexPath);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
