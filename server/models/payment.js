const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  date: { type: String },
  userId: { type: Schema.ObjectId, ref: 'User' },
  course: [{ type: Schema.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('Payment', paymentSchema, 'payments');
