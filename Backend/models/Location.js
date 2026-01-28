const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model("Location", locationSchema);
