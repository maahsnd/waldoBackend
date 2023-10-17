const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  character: { type: String, required: true, maxLength: 40 },
  coords: {
    x_max: { type: Number, required: true },
    x_min: { type: Number, required: true },
    y_max: { type: Number, required: true },
    y_min: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Location', LocationSchema);
