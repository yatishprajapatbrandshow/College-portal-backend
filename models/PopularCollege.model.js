const mongoose = require('mongoose');

// Define the schema for the College model
const PopularCollegeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    }, // College name
    city: { 
        type: String, 
        required: true, 
        trim: true 
    }, // City where the college is located
    state: { 
        type: String, 
        required: true, 
        trim: true 
    }, // State where the college is located
    country: { 
        type: String, 
        required: true, 
        trim: true 
    }, // Country where the college is located
    type: { 
        type: String, 
        required: true 
    }, // Type of the college (e.g., Government, Private, Deemed University)
    status: { 
        type: Boolean, 
        default: true 
    }, // Status of the college (true = active, false = inactive)
    courses_offered: { 
        type: [String], 
        required: true 
    }, // List of courses offered
    ranking: { 
        type: Number, 
        min: 1 
    }, // College national or state ranking
    website: { 
        type: String, 
        trim: true 
    }, // Official website URL
    established_year: { 
        type: Number 
    }, // Year the college was established
    affiliation: { 
        type: String, 
        trim: true 
    }, // Affiliated university or board
    address: { 
        type: String 
    }, // Full address of the college
    contact_number: { 
        type: String 
    }, // Contact number of the college
    email: { 
        type: String 
    }, // Email address
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the College model
module.exports = mongoose.model('PopularCollege', PopularCollegeSchema);
