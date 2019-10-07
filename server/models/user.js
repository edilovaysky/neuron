const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  status: { type: String },
  adminRights: { type: String },
  active: { type: Boolean },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  patronymic: { type: String },
  dateOfBirth: { type: String },
  parent: { type: Schema.ObjectId, ref: 'User' },
  child: [{ type: Schema.ObjectId, ref: 'User' }],
  tel: { type: String },
  email: { type: String },
  city: { type: String },
  gen: { type: String },
  class: { type: Schema.ObjectId, ref: 'Class' },
  courses: [{ type: Schema.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('User', userSchema, 'users');
