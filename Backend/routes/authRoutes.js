const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, deleteUserByEmail, updateProfile, updatePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get current user
router.get('/me', auth, getMe);

// Update user profile
router.put('/update-profile', auth, updateProfile);

// Update user password
router.put('/update-password', auth, updatePassword);

// Utility route to delete user by email (for debugging)
router.delete('/user/:email', deleteUserByEmail);

module.exports = router;
