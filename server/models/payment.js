const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  timeStamp: { type: Date, default: new Date() },
  userId: { type: Schema.ObjectId, ref: 'User' },
  courses: [{ type: Schema.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('Payment', paymentSchema, 'payments');
