const mongoose = require('mongoose');

// Define the schema for the Review model
const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  accommodation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation',  // Reference to the Accommodation model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,  // Minimum rating (you can adjust it according to your scale, e.g., 1 to 5)
    max: 5,  // Maximum rating (you can adjust it according to your scale, e.g., 1 to 5)
  },
  comment: {
    type: String,
    required: true,  // The comment is required (you can make this optional if needed)
  },
  description: {
    type: String,
    required: false,  // Description is optional (can be extended as required)
  },
  status: {
    type: Boolean,
    default: true,  // Default is true, assuming 'true' means the review is active/approved
  },
  created_at: {
    type: Date,
    default: Date.now,  // Default timestamp when the review is created
  },
  updated_at: {
    type: Date,
    default: Date.now,  // Default timestamp when the review is last updated
  },
});

// Create the Review model using the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
