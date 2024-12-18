const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // College name
    city: { type: String }, // City
    state: { type: String }, // State
    established_year: { type: Number }, // Year established
    affiliated_university: { type: String }, // Affiliated university name
    college_type: {
      type: String,
      enum: ["Public", "Private", "Government"],
      default: "Public",
    }, // College type
    ranking: { type: Number, default: 0 }, // Ranking
    accreditation: { type: String }, // Accreditation details
    placement_details: {
      highest_package: { type: Number }, // Highest package offered
      avg_package: { type: Number }, // Average package offered
    },
    hostel_availability: { type: Boolean, default: false }, // Hostel availability
    scholarship_details: {
      type : Number,
    },
    phone: { type: String }, // Contact phone number
    email: { type: String }, // Contact email
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    images: [{ type: String }], // Image URLs
    datasheet_url: { type: String }, // Datasheet link
    website_url: { type: String }, // Official website URL
    status: { type: Boolean, default: true },
    deleteflag: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const College = mongoose.model("College", collegeSchema);

module.exports = College;
