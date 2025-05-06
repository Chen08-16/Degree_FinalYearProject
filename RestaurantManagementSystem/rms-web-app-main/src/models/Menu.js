const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Menu Schema
const MenuSchema = new mongoose.Schema({
  foodname:   { type: String, required: true },
  image:      { type: String, required: false }, // URL or file path
  foodstatus: { type: Boolean, required: true }, // True if available, False if not
  price:      { type: Number, required: true }
});

module.exports = mongoose.model('Menu', MenuSchema);