const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    short_name: {
      type: String,
    },
    description: {
      type: String,
    },
    // duration: {
    //   startdate: { type: Date },
    //   enddate: { type: Date },
    // },
    // eligibility: {
    //   type: String,
    // },
    // specializations: [{ type: String }],
    // fees: {
    //   amount: { type: Number },
    //   currency: { type: String },
    // },
    // syllabus: [{ type: String }],
    status: { type: Boolean, default: true },
    deleteflag: { type: Boolean, default: false },
    // placements: {
    //   average_package: { type: Number },
    //   highest_package: { type: Number },
    // },
  },
  { timestapms: true }
);

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
