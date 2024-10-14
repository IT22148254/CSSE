const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

const doctorRoutes = require('./routes/doctor.Routes');


dotenv.config();


const app = express();


app.use(express.json()); 
app.use(cors());        


module.exports = app;

// Database connection
connectDB();


// Import user routes
// const userRoutes = require('./routes/userRoutes');


// Routes
// app.use('/api/users', userRoutes);

app.use('/api/doctors', doctorRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Set up a basic route
// app.get('/', (req, res) => {
//     res.send('Welcome to the backend API!');
// });

