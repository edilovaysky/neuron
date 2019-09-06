const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  lesson: { type: Schema.ObjectId, ref: 'Lesson' },
  user: { type: Schema.ObjectId, ref: 'User' },
  path: { type: String },
});

module.exports = mongoose.model('Hw', classSchema, 'hws');
