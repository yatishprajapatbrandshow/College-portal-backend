const mongoose = require("mongoose");

const programMappedSchema = new mongoose.Schema(
  {
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
    accommodation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
    program_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    stream_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream",
    },
    tag: {
      type: String,
    },
    fees: {
      type: Number,
    },
    duration: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    status: { type: Boolean, default: true },
    deleteflag: { type: Boolean, default: false },
  },
  { timestapms: true }
);

const ProgramMapped = mongoose.model("ProgramMapped", programMappedSchema);

module.exports = ProgramMapped;
