const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema({
  type: String,
  fullName: String,
  address: String,
  city: String,
  district: String,
  state: String,
  pincode: String,
  mobile: String,
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
}, { timestamps: true });

module.exports = mongoose.model("Tender", tenderSchema);
