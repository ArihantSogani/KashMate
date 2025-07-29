const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../utils/emailService');

// Register User
exports.registerUser = async (req, res) => {
  console.log('Register route hit');
  console.log('Request body:', req.body);
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      console.log('Existing user details:', { 
        id: userExists._id, 
        name: userExists.name, 
        hasPassword: !!userExists.password,
        passwordLength: userExists.password ? userExists.password.length : 0
      });
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user
    const savedUser = await newUser.save();
    console.log('User registered:', savedUser);

    // Send welcome email (optional - can be commented out if not needed)
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.log('Welcome email not sent:', emailError.message);
      // Don't fail registration if email fails
    }

    // Create JWT token
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Provide more specific error messages
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user has a valid password
    if (!user.password || user.password.length < 10) {
      console.log('User found but password is invalid:', { 
        email, 
        hasPassword: !!user.password,
        passwordLength: user.password ? user.password.length : 0
      });
      return res.status(400).json({ message: 'Account corrupted. Please contact support or try registering again.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get current user info
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user info', error });
  }
};

// Update user profile (name and email)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('name email');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    // Get user with password
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
};

// Forgot Password - Send reset email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal if email exists or not
      return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    // Send password reset email
    const emailSent = await sendPasswordResetEmail(email, resetToken, resetUrl);
    
    if (emailSent) {
      res.status(200).json({ 
        message: 'If an account with that email exists, a password reset link has been sent to your email.'
      });
    } else {
      // If email fails, still return success but log the error
      console.error('Failed to send password reset email to:', email);
      res.status(200).json({ 
        message: 'If an account with that email exists, a password reset link has been sent.',
        resetToken: resetToken // Fallback for development
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to process password reset request' });
  }
};

// Reset Password - Set new password with token
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

// Utility function to delete user by email (for debugging)
exports.deleteUserByEmail = async (req, res) => {
  const { email } = req.params;
  
  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
