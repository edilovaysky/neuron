const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  status: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  patronymic: { type: String },
  dateOfBirth: { type: String },
  parentName: { type: String },
  tel: { type: String },
  email: { type: String },
  city: { type: String },
});

module.exports = mongoose.model('User', userSchema, 'users');
