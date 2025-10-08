const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: mongoose.Schema.Types.Mixed,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);