const mongoose = require('mongoose');

// Define the schema
const affiliationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Affiliation name is required"],
    trim: true,
  },
  short_name: {
    type: String,
    required: [true, "Affiliation Short name is required"],
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
const Affiliation = mongoose.model('Affiliation', affiliationSchema);
module.exports = Affiliation;
