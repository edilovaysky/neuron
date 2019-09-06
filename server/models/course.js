const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  studyYear: { type: String },
  subject: [{ type: Schema.ObjectId, ref: 'Subject' }],
});

module.exports = mongoose.model('Course', courseSchema, 'courses');
