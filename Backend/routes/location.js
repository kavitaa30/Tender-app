const express = require("express");
const router = express.Router();
const Location = require("../models/Location"); // your Location model

// Get all states
router.get("/states", async (req, res) => {
  try {
    const states = await Location.distinct("state");
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get districts by state
router.get("/districts/:state", async (req, res) => {
  try {
    const { state } = req.params;
    const districts = await Location.find({ state }).distinct("district");
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get cities by state + district
router.get("/cities/:state/:district", async (req, res) => {
  try {
    const { state, district } = req.params;
    const cities = await Location.find({ state, district }).distinct("city");
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
