const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  initTime: { type: Date, default: new Date() },
  paymentTime: { type: Date },
  expireTime: { type: Date },
  period: { type: Number },
  sellBoxName: { type: String },
  sellBox: { type: Schema.ObjectId, ref: 'SellBox' },
  user: { type: Schema.ObjectId, ref: 'User' },
  isPaid: { type: Boolean },
  sum: { type: Number },
  email: { type: String },
});

module.exports = mongoose.model('Order', orderSchema, 'orders');
