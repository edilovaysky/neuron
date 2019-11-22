const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  initTime: { type: Date, default: Date.now() },
  status: { type: String },
  paymentTime: { type: Date },
  period: { type: Number },
  sellBoxName: { type: String },
  sellBox: { type: Schema.ObjectId, ref: 'SellBox' },
  customer: { type: Schema.ObjectId, ref: 'User' },
  user: { type: Schema.ObjectId, ref: 'User' },
  sum: { type: Number },
  email: { type: String },
});

module.exports = mongoose.model('Order', orderSchema, 'orders');
