const express = require('express');
const router = express.Router();
const User = require('../../Models/User'); // Ensure the User model is imported
const Availability = require('../models/availability');

// Fetch all tutors with their availability
router.get('/availability/:userId', async (req, res) => {
  try {
      const { userId } = req.params;
      const availability = await Availability.findOne({ user: userId });
      res.json(availability);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.post('/availability/:userId', async (req, res) => {
  try {
      const { userId } = req.params;
      const availabilityData = req.body;

      // Check if availability already exists
      let availability = await Availability.findOne({ user: userId });

      if (availability) {
          // Update existing availability
          availability.slots = availabilityData.slots;
      } else {
          // Create new availability
          availability = new Availability({
              user: userId,
              date: availabilityData.date,
              slots: availabilityData.slots
          });
      }

      await availability.save();
      res.status(200).json(availability);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
