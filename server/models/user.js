const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  status: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('User', userSchema, 'users');
