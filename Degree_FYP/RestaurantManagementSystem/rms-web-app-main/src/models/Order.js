const mongoose = require('mongoose');

const OrderSchema  = new mongoose.Schema({
  items: [{
      foodname: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: false }, // Optional image path
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, completed, etc.
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema );