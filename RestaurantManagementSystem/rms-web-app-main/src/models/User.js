const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // userid: { type: String, required: true },
  uid: { type: String },
  username: { type: String},
  dob: { type: Date},
  email: { type: String},
  phone: { type: String},
  role: { type: String, enum: ["staff", "customer"], default: "customer" },
});

module.exports = mongoose.model('User', UserSchema);