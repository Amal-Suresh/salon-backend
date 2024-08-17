
const mongoose = require('mongoose');

const SalonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  services: [String], // Array of services offered
  // Add other salon-specific fields
});

module.exports = mongoose.model('Salon', SalonSchema);