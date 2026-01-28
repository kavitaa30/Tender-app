const express = require("express");
const Tender = require("../models/Tender");

const router = express.Router();

// CREATE Tender
router.post("/", async (req, res) => {
  try {
    const tender = new Tender(req.body);
    await tender.save();
    res.status(201).json(tender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL Tenders (keep as it is)
router.get("/", async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD THIS (new, correct route)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tenders = await Tender.find({ userId });
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tenders" });
  }
});



router.get("/single/:id", async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  res.json(tender);
});
router.put("/:id", async (req, res) => {
  const updated = await Tender.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Tender.findByIdAndDelete(id);
    res.json({ message: "Tender deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
