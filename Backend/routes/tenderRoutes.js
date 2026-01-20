const express = require("express");
const Tender = require("../models/Tender");

const router = express.Router();

// CREATE Tender
router.post("/", async (req, res) => {
  try {
    const tender = new Tender(req.body); // Save all fields
    await tender.save();
    res.status(201).json(tender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET All Tenders
router.get("/", async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
