const { Program } = require("../models");

const createProgram = async (req, res) => {
  try {
    const { name, shortName, description } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name, Short Name , Description are required.",
        data: false,
      });
    }

    // Check for duplicate name in the database
    const existingProgram = await Program.findOne({
      name,
      short_name:shortName,
      description,
      status: true,
      deleteflag: false,
    });
    if (existingProgram) {
      return res.status(400).json({
        status: false,
        message: "A program with this course ID already exists.",
        data: false,
      });
    }

    const newProgram = new Program(req.body);
    const savedProgram = await newProgram.save();

    return res.status(201).json({
      status: true,
      message: "Program created successfully.",
      data: savedProgram,
    });
  } catch (error) {
    console.error("Error creating program:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to create program.",
      data: false,
    });
  }
};

const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Program ID is required.",
        data: false,
      });
    }

    // Validate if program exists
    const existingProgram = await Program.findById({
      _id: id,
      status: true,
      deleteflag: false,
    });
    if (!existingProgram) {
      return res.status(404).json({
        status: false,
        message: "Program not found.",
        data: false,
      });
    }

    // Update program
    const updatedProgram = await Program.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "Program updated successfully.",
      data: updatedProgram,
    });
  } catch (error) {
    console.error("Error updating program:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to update program.",
      data: false,
    });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Program ID is required.",
        data: false,
      });
    }

    const existingProgram = await Program.findById({
      _id: id,
      status: true,
      deleteflag: false,
    });

    if (!existingProgram) {
      return res.status(404).json({
        status: false,
        message: "Program not found.",
        data: false,
      });
    }
    existingProgram.deleteflag = true;
    existingProgram.status = false;
    const deletedProgram = await existingProgram.save();
    return res.status(200).json({
      status: true,
      message: "Program deleted successfully.",
      data: deletedProgram,
    });
  } catch (error) {
    console.error("Error deleting program:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to delete program.",
      data: false,
    });
  }
};

const getProgramById = async (req, res) => {
  try {
    const { id } = req.query;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Program ID is required.",
        data: false,
      });
    }

    const program = await Program.findById({
      _id: id,
      status: true,
      deleteflag: false,
    });

    if (!program) {
      return res.status(404).json({
        status: false,
        message: "Program not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Program retrieved successfully.",
      data: program,
    });
  } catch (error) {
    console.error("Error fetching program:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve program.",
      data: false,
    });
  }
};

const getAllPrograms = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      name,
    } = req.query;

    // Build filter object
    const filter = {};
    filter.status = true;
    filter.deleteflag = false;
    if (name) filter.name = { $regex: name, $options: "i" };

    const sortOrder = order === "asc" ? 1 : -1;

    // Fetch programs with pagination and sorting
    const programs = await Program.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Program.countDocuments(filter);

    return res.status(200).json({
      status: true,
      message: "Programs retrieved successfully.",
      data: {
        programs,
        pagination: {
          totalRecords: total,
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve programs.",
      data: false,
    });
  }
};

module.exports = {
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramById,
  getAllPrograms,
};
