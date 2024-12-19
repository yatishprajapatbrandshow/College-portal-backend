

const mongoose = require('mongoose');

// Define the Accommodation Schema
const accommodationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // Accommodation name
    type: { 
      type: String, 
      enum: ['Hostel', 'PG', 'Apartment'], 
      required: true 
    },        // Type of accommodation
    address: { type: String, required: true },       // Full address
    city: { type: String, required: true },          // City
    state: { type: String, required: true },         // State
    country: { type: String, required: true },       // Country
    pincode: { type: String, required: true },       // Pincode
    latitude: { type: Number, required: true },      // Latitude of the accommodation
    longitude: { type: Number, required: true },     // Longitude of the accommodation
    price: { type: Number, required: true },         // Price of the accommodation
    amenities: { type: [String], required: true },   // List of amenities (Wi-Fi, Gym, etc.)
    phone: { type: String, required: true },         // Contact phone number
    email: { type: String, required: true },         // Contact email address
    images: { type: [String], required: true },      // Array of image URLs
    status: { type: Boolean, default: true },        // Status (active or inactive)
    deleteflag: { type: Boolean, default: false },   // Soft delete flag (for logical deletion)
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Accommodation model using the schema
const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;

