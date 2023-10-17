const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  character: { type: String, required: true, maxLength: 40 },
  coords: { type: Schema.Types.ObjectId, ref: 'Coords', required: true }
});

module.exports = mongoose.model('Location', LocationSchema);
