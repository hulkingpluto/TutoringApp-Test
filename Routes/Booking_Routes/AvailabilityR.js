const express = require('express');
const router = express.Router();
const User = require('../../Models/User'); // Ensure the User model is imported
const Availability = require('../models/availability');

// Fetch all tutors with their availability
router.get('/tutors', async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' }).populate('availability');
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutors', error: error.message });
  }
});

module.exports = router;
