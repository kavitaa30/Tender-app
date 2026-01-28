const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    type: String,
    fullName: String,
    address: String,
    city: String,
    district: String,
    state: String,
    pincode: String,
   mobile: {
  type: String,
  required: true,
  match: [/^[5-9]\d{9}$/, "Invalid mobile number"]
},
    email: String,
    license: String,
    gst: String,
    goodsType: String,
    demand: String,
    rate: String,
    remarks: String,
    passportPhoto: String,
    aadhar: String,
    pan: String,
    gstCert: String,
    licenseCert: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tender", tenderSchema);
