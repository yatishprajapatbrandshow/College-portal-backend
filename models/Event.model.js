const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    }, // Event title
    date: {
      type: Date,
      required: [true, "Event date is required"],
    }, // Event date
    description: {
      type: String,
      default: "",
      trim: true,
    }, // Event description
    event_type: {
      type: String,
      enum: ["Technical", "Cultural", "Sports", "Educational", "Other"],
      required: [true, "Event type is required"],
    }, // Type of event
    images: [
      {
        type: String,
        required: [true, "At least one image is required"],
      },
    ], // Array of image URLs
    status: {
      type: Boolean,
      default: true,
    }, // Active or inactive status
    deleteflag: {
      type: Boolean,
      default: false,
    }, // Deleted status
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
