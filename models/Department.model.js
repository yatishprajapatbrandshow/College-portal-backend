const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
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
    departmentCode: {
      type: String,
      required: true,
    },
    status: { type: Boolean, default: true },
    deleteflag: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
