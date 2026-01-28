const mongoose = require("mongoose");
const Location = require("../models/Location"); // adjust path
const lgdData = require("../lgd.json"); // your JSON exported from Excel

mongoose.connect("mongodb://localhost:27017/tenderDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const insertLocations = async () => {
  try {
    // Remove old locations first
    await Location.deleteMany({});
    console.log("Old locations cleared");

    for (const item of lgdData) {
      const hierarchy = item.Hierarchy; // "Amravati(District) / Maharashtra(State)"
      const parts = hierarchy.split(" / ");
      const district = parts[0]?.replace("(District)", "").trim();
      const state = parts[1]?.replace("(State)", "").trim();
      const city = item["Sub-District Name (In English)"];

      // Insert into MongoDB
      const location = new Location({ state, district, city });
      await location.save();
    }

    console.log("Locations inserted successfully");
    process.exit();
  } catch (err) {
    console.error("Error inserting locations:", err);
  }
};

insertLocations();
