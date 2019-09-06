const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  lesson: { type: String },
  toTheme: { type: String },
  path: { type: String },
});

module.exports = mongoose.model('Lesson', classSchema, 'lessons');
