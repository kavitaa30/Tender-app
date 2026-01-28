const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { fullName, mobile, email, password } = req.body;

    if (!fullName || !mobile || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const user = await User.create({
      fullName,
      mobile,
      email,
      password, // (plain for now)
    });

    res.status(201).json(user);
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // 🔴 USER STATUS CHECK
    if (user.role === "user" && user.status === "Pending") {
      return res.status(403).json({ msg: "Waiting for admin approval" });
    }

    if (user.role === "user" && user.status === "Rejected") {
      return res.status(403).json({ msg: "Your request is rejected" });
    }

    res.json({
      _id: user._id,
      role: user.role,
      status: user.status,
      fullName: user.fullName
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= GET USER BY ID ================= */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.log("GET USER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



router.put("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Profile updated" });
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
});


// GET ALL USERS (except admin)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/approve/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: "Approved"
  });
  res.json({ msg: "User approved" });
});

router.put("/reject/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    status: "Rejected"
  });
  res.json({ msg: "User rejected" });
});







module.exports = router;
