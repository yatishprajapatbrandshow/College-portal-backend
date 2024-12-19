const { ProgramMapped } = require('../models');

const createProgramMapped = async (req, res) => {
  try {
    const {
      college_id,
      accommodation_id,
      program_id,
      department_id,
      stream_id,
      tag,
      fees,
      duration,
    } = req.body;

    // Required Fields Validation
    if (
      !college_id ||
      !program_id ||
      !department_id ||
      !stream_id ||
      !fees ||
      !duration ||
      !duration.startDate ||
      !duration.endDate
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Required fields: college_id, program_id, department_id, stream_id, fees, duration.startDate, duration.endDate.",
        data: false,
      });
    }

    // Ensure fees are valid
    if (fees <= 0) {
      return res.status(400).json({
        status: false,
        message: "Fees must be greater than 0.",
        data: false,
      });
    }

    const newProgramMapped = new ProgramMapped({
      college_id,
      accommodation_id,
      program_id,
      department_id,
      stream_id,
      tag,
      fees,
      duration,
    });

    const savedProgramMapped = await newProgramMapped.save();

    return res.status(201).json({
      status: true,
      message: "ProgramMapped created successfully.",
      data: savedProgramMapped,
    });
  } catch (error) {
    console.error("Error creating ProgramMapped:", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error.",
      data: false,
    });
  }
};

const updateProgramMapped = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ProgramMapped ID is required.",
        data: false,
      });
    }

    // Check if ProgramMapped exists
    const existingProgramMapped = await ProgramMapped.findById(id);
    if (!existingProgramMapped || existingProgramMapped.deleteflag) {
      return res.status(404).json({
        status: false,
        message: "ProgramMapped not found.",
        data: false,
      });
    }

    // Validate and Update Data
    const updatedFields = req.body;

    if (updatedFields.fees && updatedFields.fees <= 0) {
      return res.status(400).json({
        status: false,
        message: "Fees must be greater than 0.",
        data: false,
      });
    }

    const updatedProgramMapped = await ProgramMapped.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: true,
      message: "ProgramMapped updated successfully.",
      data: updatedProgramMapped,
    });
  } catch (error) {
    console.error("Error updating ProgramMapped:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to update ProgramMapped.",
      data: false,
    });
  }
};

const deleteProgramMapped = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ProgramMapped ID is required.",
        data: false,
      });
    }

    const programMapped = await ProgramMapped.findByIdAndUpdate(
      id,
      { deleteflag: true, status: false },
      { new: true }
    );

    if (!programMapped) {
      return res.status(404).json({
        status: false,
        message: "ProgramMapped not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "ProgramMapped deleted successfully.",
      data: programMapped,
    });
  } catch (error) {
    console.error("Error deleting ProgramMapped:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to delete ProgramMapped.",
      data: false,
    });
  }
};

const getProgramMappedById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ProgramMapped ID is required.",
        data: false,
      });
    }

    const programMapped = await ProgramMapped.findById(id).populate([
      "college_id",
      "accommodation_id",
      "program_id",
      "department_id",
      "stream_id",
    ]);

    if (!programMapped || programMapped.deleteflag) {
      return res.status(404).json({
        status: false,
        message: "ProgramMapped not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "ProgramMapped retrieved successfully.",
      data: programMapped,
    });
  } catch (error) {
    console.error("Error fetching ProgramMapped:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve ProgramMapped.",
      data: false,
    });
  }
};

// Adding Search functionality to the 'getAllProgramMapped' method
const getAllProgramMapped = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query;

    // Create a filter object for query
    const filter = { deleteflag: false };

    // If a 'tag' is provided, apply it to the filter
    if (tag) {
      filter.tag = { $regex: tag, $options: "i" }; // Case-insensitive search for tag
    }

    // If a 'search' term is provided, we will search on multiple fields
    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive regex for search term

      filter.$or = [
        { tag: { $regex: searchRegex } },  // Search by tag
        { fees: { $regex: searchRegex } }, // Search by fees (as string)
        { "college_id.name": { $regex: searchRegex } },    // Assuming `name` is a field in College model
        { "accommodation_id.name": { $regex: searchRegex } }, // Assuming `name` is a field in Accommodation model
        { "program_id.name": { $regex: searchRegex } },    // Assuming `name` is a field in Program model
        { "department_id.name": { $regex: searchRegex } }, // Assuming `name` is a field in Department model
        { "stream_id.name": { $regex: searchRegex } }      // Assuming `name` is a field in Stream model
      ];
    }

    // Fetch the filtered records
    const programsMapped = await ProgramMapped.find(filter)
      .populate([
        "college_id",
        "accommodation_id",
        "program_id",
        "department_id",
        "stream_id",
      ])
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Get the total number of records matching the filter
    const totalRecords = await ProgramMapped.countDocuments(filter);

    return res.status(200).json({
      status: true,
      message: "ProgramsMapped retrieved successfully.",
      data: {
        programsMapped,
        pagination: {
          totalRecords,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalRecords / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching ProgramsMapped:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve ProgramsMapped.",
      data: false,
    });
  }
};

module.exports = {
  createProgramMapped,
  updateProgramMapped,
  deleteProgramMapped,
  getProgramMappedById,
  getAllProgramMapped,
};
