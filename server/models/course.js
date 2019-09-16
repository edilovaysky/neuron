const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  studyYear: { type: String },
  subject: [{ type: Schema.ObjectId, ref: 'Subject' }],
  classes: [{ type: Schema.ObjectId, ref: 'Class' }],
});

module.exports = mongoose.model('Course', courseSchema, 'courses');
