const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const UserModel = require('./models/userModels'); // Assuming this is your Employee/User model
const router = require('./routes/userRoutes');
const qrcode = require('qrcode');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to the database
connectDB().then(() => {
    console.log('Database connected successfully'.bgGreen.white);
}).catch((error) => {
    console.error(`Error connecting to database: ${error.message}`.bgRed.white);
    process.exit(1); // Exit the process if database connection fails
});

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Enable CORS with dynamic origin based on environment variable
const allowedOrigins = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({
    origin: allowedOrigins.split(','), // Support multiple origins by splitting comma-separated string
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes for login and register

// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check for admin credentials
    if (email === 'admin@gmail.com' && password === 'admin') {
        return res.json({ status: "AdminSuccess", email: "admin@gmail.com", username: "Admin" });
    }

    // Find the employee by email
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Check if the password matches
                if (user.password === password) {
                    return res.json({ status: "Success", email: user.email, username: user.username });
                } else {
                    return res.status(401).json("The password is incorrect");
                }
            } else {
                return res.status(404).json("No record existed");
            }
        })
        .catch(err => res.status(500).json(err.message));
});

// Get User Route
app.get("/user", (req, res) => {
    const { email } = req.query;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.json({ email: user.email, username: user.username });
            } else {
                return res.status(404).json("No record existed");
            }
        })
        .catch(err => res.status(500).json(err.message));
});

// Register Route
app.post("/register", (req, res) => {
    // Create a new employee with the provided data
    UserModel.create(req.body)
        .then(employee => res.status(201).json(employee))
        .catch(err => res.status(500).json(err.message));
});

//view
app.get("/profile", (req, res) => {
    const { email } = req.query; // We get the email from the query parameters

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Send user profile data
                return res.json({
                    name: user.name,
                    email: user.email,

                });
            } else {
                return res.status(404).json("User not found");
            }
        })
        .catch(err => res.status(500).json(err.message));
});
//  Route to update user profile

app.put("/profile", (req, res) => {
    const { email, name, birthdate, address, allergies, medicalTips } = req.body; // Get updated profile data from the request body

    if (!email) {
        return res.status(400).json("Email is required");
    }

    // Find user by email and update with new data
    UserModel.findOneAndUpdate(
        { email: email },
        {
            name: name,
            birthdate: birthdate,
            address: address,
            allergies: allergies,
            medicalTips: medicalTips
        },
        { new: true } // Return the updated document
    )
        .then(updatedUser => {
            if (updatedUser) {
                return res.json({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    birthdate: updatedUser.birthdate,
                    address: updatedUser.address,
                    allergies: updatedUser.allergies,
                    medicalTips: updatedUser.medicalTips
                });
            } else {
                return res.status(404).json("User not found");
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});
// Route to get the user's profile for updating
router.get('/update', (req, res) => {
    const { email } = req.query; // Get the email from query parameters

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Respond with the user's data to populate the form for updating
                return res.json({
                    name: user.name,
                    email: user.email,
                    birthdate: user.birthdate,
                    address: user.address,
                    allergies: user.allergies,
                    medicalTips: user.medicalTips
                });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            console.error('Error fetching user profile:', err);
            return res.status(500).json({ message: 'Server error' });
        });
});
// Route to get profile by email
app.get('/profilee', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/generate-qr', async (req, res) => {
    try {
        const email = req.query.email;
        console.log("Email for QR code generation:", email); // Add this log

        // Fetch profile from MongoDB using the correct model (UserModel)
        const profile = await UserModel.findOne({ email });

        if (!profile) {
            console.log("Profile not found for email:", email); // Log if the profile is not found
            return res.status(404).json({ message: 'Profile not found' });
        }

        const dataToEncode = JSON.stringify({
            name: profile.name,
            birthdate: profile.birthdate,
            address: profile.address,
            allergies: profile.allergies,
            medicalTips: profile.medicalTips,
        });

        qrcode.toDataURL(dataToEncode, (err, url) => {
            if (err) {
                console.error('QR code generation error:', err); // Log error
                return res.status(500).json({ message: 'Failed to generate QR code' });
            } else {
                res.json({ qrCode: url });
            }
        });
    } catch (error) {
        console.error('Error fetching profile:', error); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user info by email
router.get('/user-info', async (req, res) => {
    try {
        const email = req.query.email; // Get the email from query parameters
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find the user by email in the database
        const user = await user.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send back user info (username and email)
        res.status(200).json({ username: user.name, email: user.email });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all patients (optional)
app.get("/userss", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Route to delete a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(userId); // Use correct model `UserModel`
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error); // Log the error
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

  


// Port setup
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`
            .bgCyan.white
    );
});
