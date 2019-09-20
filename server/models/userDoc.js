const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDocSchema = new Schema({
  docName: { type: String },
  user: { type: Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('UserDoc', userDocSchema, 'userDocs');
