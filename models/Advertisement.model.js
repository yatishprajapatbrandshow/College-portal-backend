const mongoose = require('mongoose');

// Define the Advertisement Schema
const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },           // Advertisement title
    description: { type: String, required: true },     // Advertisement description
    img: { 
      type: [String],  
      required: true, 
    }, 
    url: { 
      type: String, 
      required: true, 
      validate: {
        validator: function(value) {
        
          return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(value);
        },
        message: "Invalid URL format.",
      }
    }, // URL field to store advertisement link
    status: { type: Boolean, default: true },          // Status (active or inactive)
    deleteflag: { type: Boolean, default: false },     // Soft delete flag (for logical deletion)
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Advertisement model using the schema
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
