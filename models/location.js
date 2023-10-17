const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  character: { type: String, required: true, maxLength: 40 },
  coords: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Location', LocationSchema);
