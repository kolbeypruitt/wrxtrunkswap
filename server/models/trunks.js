var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Trunk = new Schema({
  purpose: {
    type: String,
    lowercase: true
  },
  year: {
    type: String
  },
  trim: {
    type: String
  },
  color: {
    type: String
  },
  photo: {
    type: String
  },
  miles: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  },
  time: { type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('trunks', Trunk);