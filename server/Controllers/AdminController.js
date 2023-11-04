const express = require('express');
const router = express.Router();
const User = require('../Models/Signup');

// List all users
router.get('/signup', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Edit user details
router.put('/signup/:signupId', async (req, res) => {
  const { fullName, email, profession, location } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      fullName,
      email,
      profession,
      location,
    }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

// Remove a user
router.delete('/signup/:signupId', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the user' });
  }
});

// Reject user access (if needed)
router.put('/signup/reject/:signupId', async (req, res) => {
  try {
    // Implement your rejection logic
    res.json({ message: 'User access rejected' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while rejecting user access' });
  }
});

module.exports = router;
