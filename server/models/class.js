const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  number: { type: String },
  name: { type: String },
  teacher: { type: Schema.ObjectId, ref: 'User' },
  pupil: [{ user: { type: Schema.ObjectId, ref: 'User' } }],
});

module.exports = mongoose.model('Class', classSchema, 'classes');
