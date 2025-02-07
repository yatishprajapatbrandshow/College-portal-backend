const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Hostel schema
const hostelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  amenities: {
    type: [String], // Array of amenities
    default: []
  },
  images: [{
    type: String, // URLs to images
  }],
  pricing: {
    type: Map,
    of: Number, // Could be nightly rates per room type
    default: {}
  },
  availableRooms: {
    type: Number,
    required: true
  },
  rating: {
    type: Number, // Rating from 1-5
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    date_posted: { type: Date, default: Date.now }
  }],
 
  status: {
    type: Boolean,
    default: true // true = active, false = inactive
  },
  deleteFlag: {
    type: Boolean,
    default: false // Indicates if the listing is marked for soft delete
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model based on the schema
const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
