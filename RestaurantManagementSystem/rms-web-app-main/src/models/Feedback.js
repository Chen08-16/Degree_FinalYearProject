const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  feedbackid: { type: String, required: true },
  remark: { type: String, required: true },
  star: { type: Number, min: 1, max: 5, required: true }, // Rating from 1 to 5
  username: { type: String, required: true }, // Foreign key-like reference to User
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
