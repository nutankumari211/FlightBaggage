// models/Baggage.js
const mongoose = require('mongoose');

const baggageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  airline: {
    type: String,
    required: true
  },
  flight: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Baggage', baggageSchema);
