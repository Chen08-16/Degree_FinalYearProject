const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  paymentid: { type: String, required: true },
  menuItems: [
    {
      menuid: { type: String, required: true }, // Foreign key-like reference to Menu
      foodname: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalprice: { type: Number, required: true },
  paymentstatus: { type: String, enum: ['incomplete', 'complete'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
