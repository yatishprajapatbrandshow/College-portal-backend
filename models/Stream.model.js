const mongoose = require('mongoose');

// Define the schema
const streamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Stream name is required"],
    trim: true,
  },
  short_name: {
    type: String,
    required: [true, "Short name is required"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  deleteflag: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Export the model
const Stream = mongoose.model('Stream', streamSchema);
module.exports = Stream;
