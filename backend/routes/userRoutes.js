const express = require('express');
const { registerController, loginController } = require('../controllers/userCtrl');
const { body, validationResult } = require('express-validator');  // For validation
const router = express.Router();

// Define the register route with validation
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();  // Proceed to the controller if validation passes
  },
  registerController
);

// Define the login route with validation (optional)
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();  // Proceed to the controller if validation passes
  },
  loginController
);

// Route to update user profile
router.post('/profile/update', async (req, res) => {
  const { email, birthdate, address, allergies, medicalTips } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { birthdate, address, allergies, medicalTips },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
