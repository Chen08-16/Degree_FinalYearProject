const mongoose = require('mongoose');

const TableInfoSchema = new mongoose.Schema({
  tableid: { type: String, required: true },
  tablenumber: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  seatnumber: { type: Number, required: true },
});

module.exports = mongoose.model('TableInfo', TableInfoSchema);