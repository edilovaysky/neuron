const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  studyYear: { type: String },
  subject: { type: String },
  themes: [{ lesson: { type: String } }],
});

module.exports = mongoose.model('Course', courseSchema, 'courses');
