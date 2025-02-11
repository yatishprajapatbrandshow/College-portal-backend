const mongoose = require('mongoose');

// Define the schema for Testimonial
const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  img: {
    type: String,  // URL or file path of the image
    required: [true, "Image URL is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be between 1 and 5"],
    max: [5, "Rating must be between 1 and 5"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9]+([._%+-])*@[a-z0-9.-]+\.[a-z]{2,4}$/, "Please enter a valid email address"], 
  },
  designation: {
    type: String,  
    required: [true, "Designation is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Testimonial message is required"],  // This will store the testimonial message
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,  // true means active
  },
  deleteflag: {
    type: Boolean,
    default: false,  // false means it's not marked for deletion
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Export the model
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;
