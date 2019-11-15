const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellboxSchema = new Schema({
  timeStamp: { type: Date, default: new Date() },
  name: { type: String },
  period: { type: Number },
  number: { type: Number },
  price: { type: Number },
  courses: [{ type: Schema.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('SellBox', sellboxSchema, 'sellboxes');
