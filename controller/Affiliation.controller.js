const { Affiliation } = require('../models');

// Create a new Affiliation
const createAffiliation = async (req, res) => {
  try {
    const { name, short_name, description, status } = req.body;

    // Create a new affiliation using the provided data
    const affiliation = new Affiliation({
      name,
      short_name,
      description,
      status,
    });

    // Save the affiliation to the database
    await affiliation.save();

    // Send response with status, message, and data
    res.status(201).json({
      status: true,
      message: "Affiliation created successfully",
      data: affiliation,
    });
  } catch (error) {
    // Handle errors with consistent response format
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// Get all Affiliations with Search functionality
const getAllAffiliations = async (req, res) => {
  try {
    const { search = "" } = req.query; // Search query parameter

    const filter = { deleteflag: false }; // Only fetch active affiliations

    // If a search term is provided, dynamically search all fields
    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive regex
      filter.$or = [
        { name: { $regex: searchRegex } },
        { short_name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { status: { $regex: searchRegex } },
      ];
    }

    // Fetch affiliations based on the filter (search term, deleteflag: false)
    const affiliations = await Affiliation.find(filter);

    if (affiliations.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No affiliations found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Affiliations fetched successfully",
      data: affiliations,
    });
  } catch (error) {
    // Handle errors with consistent response format
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// Get a single Affiliation by ID
const getAffiliationById = async (req, res) => {
  try {
    const affiliation = await Affiliation.findById(req.params.id);

    if (!affiliation || affiliation.deleteflag) {
      return res.status(404).json({
        status: false,
        message: "Affiliation not found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Affiliation fetched successfully",
      data: affiliation,
    });
  } catch (error) {
    // Handle errors with consistent response format
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// Update an Affiliation
const updateAffiliation = async (req, res) => {
  try {
    const affiliation = await Affiliation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!affiliation) {
      return res.status(404).json({
        status: false,
        message: "Affiliation not found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Affiliation updated successfully",
      data: affiliation,
    });
  } catch (error) {
    // Handle errors with consistent response format
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// Soft delete an Affiliation (Set deleteflag to true)
const deleteAffiliation = async (req, res) => {
  try {
    const affiliation = await Affiliation.findByIdAndUpdate(
      req.params.id,
      { deleteflag: true },
      { new: true }
    );

    if (!affiliation) {
      return res.status(404).json({
        status: false,
        message: "Affiliation not found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Affiliation deleted successfully",
      data: null,
    });
  } catch (error) {
    // Handle errors with consistent response format
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  createAffiliation,
  getAllAffiliations,
  getAffiliationById,
  updateAffiliation,
  deleteAffiliation,
};
