// models/AccommodationModel.js
const mongoose = require('mongoose');

// Define the Review Schema
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the Geo Schema for location coordinates
const geoSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Define the Location Schema
const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  geo: geoSchema,
});

// Define the PriceRange Schema
const priceRangeSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
});

// Define the Accommodation Schema
const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: locationSchema,
  priceRange: priceRangeSchema,
  amenities: { type: [String], required: true },
 
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  images: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the Accommodation model
const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
