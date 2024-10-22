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

// Middleware2
// app.use(express.json());
// app.use(cookieParser());
// app.use(session({
//     secret: 'your_session_secret',
//     resave: false,
//     saveUninitialized: true,
// }));

// Connect to MongoDB3
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));


app.use(cors({
    origin: '*', // Use this for testing only, restrict later
    credentials: true,
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes1
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    
});

// Serve static files from the React app



// app.get('*', (req, res) => {
//     res.send('Catch-all route hit'); // Just for testing
// });


// Start the server
app.listen(PORT, () => {
    console.log("hello");
    console.log(`Server is running on port ${PORT}`);
});
