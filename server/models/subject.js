const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  subject: { type: String },
  themes: [{ type: Schema.ObjectId, ref: 'Theme' }],
});

module.exports = mongoose.model('Subject', courseSchema, 'subjects');
