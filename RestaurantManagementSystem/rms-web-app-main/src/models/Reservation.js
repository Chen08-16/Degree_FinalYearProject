const mongoose = require('mongoose');

// Reservation Schema
const reservationSchema = new mongoose.Schema({
  uid: { type: String, required: true }, // User ID
  customerName: { type: String, required: true },
  customerContact: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  amPm: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  tableNumber: { type: Number, required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);

