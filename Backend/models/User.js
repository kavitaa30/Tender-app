const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
 mobile: {
  type: String,
  required: true,
  match: [/^[5-9]\d{9}$/, "Invalid mobile number"]
},

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // 🔹 NEW FIELDS
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
});

module.exports = mongoose.model("User", userSchema);
