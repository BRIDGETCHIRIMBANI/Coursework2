const express = require('express');
const router = express.Router();
const Signup = require('../Models/Signup');

// Handle POST request to /api/signup
router.post('/signup', async (req, res) => {
    const {
      fullName,
      email,
      profession,
      location,
      password,
      confirmPassword
    } = req.body;
  
    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    try {
      // Create a new Signup document
      const newSignup = new Signup({
        fullName,
        email,
        profession,
        location,
        password,
        confirmPassword,
      });
  
      // Save the new Signup document to the database
      const savedSignup = await newSignup.save();
  
      res.status(201).json(savedSignup);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while signing up' });
    }
  });
  
  module.exports = router;
  