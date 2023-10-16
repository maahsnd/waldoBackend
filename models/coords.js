const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoordSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

module.exports = mongoose.model('Coords', CoordSchema);
