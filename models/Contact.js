const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, reured: true },
  email: { type: String, reured: true },
  phone: { type: String },
  type: { type: String, default: 'personal' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', ContactSchema);
