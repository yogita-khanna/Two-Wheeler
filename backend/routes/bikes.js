const express = require('express');
const router = express.Router();
const Rider = require('../models/Biker');  // Assuming Biker.js contains the Rider model
const {requireAuth} = require('../middleware/isLoggedIn');

router.post('/riders', requireAuth, async (req, res) => {
    try {
      const { name, latitude, longitude, preOwned } = req.body;
      const newRider = new Rider({
        name,
        preOwned,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
      await newRider.save();
      res.status(201).json(newRider);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.get('/nearest-riders',  async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const riders = await Rider.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: 10000, // Max distance in meters (adjust as needed)
          },
        },
      });
      res.json(riders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;