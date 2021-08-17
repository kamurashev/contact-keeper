const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: { type: String, reured: true },
  email: { type: String, reured: true, unique: true },
  password: { type: String, reured: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);