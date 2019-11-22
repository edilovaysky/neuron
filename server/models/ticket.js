const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  initTime: { type: Date, default: Date.now() },
  order: { type: Schema.ObjectId, ref: 'Order' },
  expires: { type: Date },
  sellBoxName: { type: String },
  sellBox: { type: Schema.ObjectId, ref: 'SellBox' },
});

module.exports = mongoose.model('Ticket', orderSchema, 'tickets');
