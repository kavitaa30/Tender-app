require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tenderRoutes = require("./routes/tenderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tenders", tenderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.log(err));
