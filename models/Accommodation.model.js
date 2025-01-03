const mongoose = require('mongoose');

// Define the Accommodation Schema
const accommodationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },           // Accommodation name
    type: { 
      type: String, 
      enum: ['Hostel', 'PG', 'Apartment'], 
      required: true 
    },
    location: {                                       // Location object
      address: { type: String, required: true },       // Street address
      city: { type: String, required: true },          // City name
      state: { type: String, required: true },         // State
      country: { type: String, required: true },       // Country
      pincode: { type: String, required: true },       // Pincode
      latitude: { type: Number, required: true },      // Latitude
      longitude: { type: Number, required: true },     // Longitude
    },
    price: { type: Number, required: true },          // Price of the accommodation
    amenities: { type: [String], required: true },    // List of amenities (Wi-Fi, Gym, etc.)
    phone: { type: String, required: true },          // Contact phone number
    email: { type: String, required: true },          // Contact email address
    images: [                                          // Array of image objects for the property
      {
        url: { type: String, required: true },         // URL to the image file
        description: { type: String }                  // Description or caption for the image (optional)
      }
    ],
    status: { type: Boolean, default: true },         // Status (active or inactive)
    deleteflag: { type: Boolean, default: false },    // Soft delete flag

    room_options: [                                    // Array of room options
      {
        room_type: { type: String, required: true },     // Type of room (e.g., single, double)
        price_per_week: { type: Number, required: true }, // Weekly rent for the room
        availability: { type: Boolean, required: true },  // Availability status
        amenities: { type: [String], required: true },    // List of room-specific amenities
      }
    ],

    common_areas: {                                   // Common area amenities
      kitchen: { available: { type: Boolean }, shared: { type: Boolean } },
      laundry: { available: { type: Boolean }, type: { type: [String] } },
      study_area: { available: { type: Boolean }, capacity: { type: Number } },
      gym: { available: { type: Boolean }, equipment: { type: [String] } },
      common_room: { available: { type: Boolean }, features: { type: [String] } },
    },

    facilities: {                                     // Additional facilities
      wifi: { available: { type: Boolean }, speed_mbps: { type: Number } },
      heating_cooling: {
        heating_type: { type: [String] },                // Types of heating
        cooling_type: { type: [String] },                // Types of cooling
      },
      parking: { available: { type: Boolean }, type: { type: [String] } },
    },

    description: {                                    // Detailed description of the property
      short_description: { type: String },              // Brief description
      long_description: { type: String },               // Detailed description
    },

    reviews: [                                         // Array of reviews
      {
        student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        rating: { type: Number },
        comment: { type: String },
        date_posted: { type: Date },
      }
    ],

    
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Accommodation model using the schema
const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
