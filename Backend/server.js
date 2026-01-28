require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const locationRoutes = require("./routes/location");


const tenderRoutes = require("./routes/tenderRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tenders", tenderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.log(err));
