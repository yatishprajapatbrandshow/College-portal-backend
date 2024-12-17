const mongoose = require("mongoose");
const programSchema = new mongoose.Schema(
  {
    course_id: {
      type: Number,
      required: true,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      startdate: { type: Date },
      enddate: { type: Date },
    },
    eligibility: {
      type: String,
    },
    specializations: [{ type: String }],
    fees: {
      amount: { type: Number },
      currency: { type: String },
    },
    syllabus: [{ type: String }],
    streams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stream" }],
    placements: {
      average_package: { type: Number },
      highest_package: { type: Number },
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    faq: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faq",
      },
    ],
  },
  { timestapms: true }
);

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
