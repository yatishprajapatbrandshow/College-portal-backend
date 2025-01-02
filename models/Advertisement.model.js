const mongoose = require('mongoose');
const sharp = require('sharp'); // For image resizing

// Define the Advertisement Schema
const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },           // Advertisement title
    description: { type: String, required: true },     // Advertisement description
    img: { 
      type: [String], 
      required: true, 
    }, // Array of image URLs
    url: { 
      type: String, 
      required: true, 
      validate: {
        validator: function(value) {
          // Validate URL format (basic validation for now)
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

// Pre-save middleware to resize the image to a fixed size
advertisementSchema.pre('save', async function (next) {
  try {
    if (this.img && this.img.length > 0) {
      const resizedImages = [];
      for (let image of this.img) {
        // Resize each image to 500x500 pixels using sharp
        const buffer = await sharp(image)
          .resize(500, 500)
          .toBuffer();
        
        // Push the resized image URL or buffer (depending on your storage method)
        resizedImages.push(buffer.toString('base64')); // Storing base64 encoded image as an example
      }
      this.img = resizedImages;
    }
    next();
  } catch (err) {
    next(new Error("Image resizing failed."));
  }
});

// Create the Advertisement model using the schema
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
