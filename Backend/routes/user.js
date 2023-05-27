const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'your-email-service-provider',
  auth: {
    user: 'anishvaliyaparambhil@gmail.com',
    pass: 'your-email-password'
  }
});

// Register a new user and send OTP via email
router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    // Create a new user
    const user = new User({ email, otp });

    // Save the user to the database
    await user.save();

    // Send the OTP via email
    await transporter.sendMail({
      from: 'anishvaliyaparambhil@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Verify the OTP entered by the user
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, redirect to welcome page or send a success response
    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;