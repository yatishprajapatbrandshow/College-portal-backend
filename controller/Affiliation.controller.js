const{ Affiliation} = require('../models');

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

    res.status(201).json({
      status: true,
      message: "Affiliation created successfully",
      data: affiliation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get all Affiliations
const getAllAffiliations = async (req, res) => {
  try {
    const affiliations = await Affiliation.find({ deleteflag: false });

    if (affiliations.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No affiliations found.",
      });
    }

    res.status(200).json({
      status: true,
      data: affiliations,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
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
      });
    }

    res.status(200).json({
      status: true,
      data: affiliation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
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
      });
    }

    res.status(200).json({
      status: true,
      message: "Affiliation updated successfully",
      data: affiliation,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
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
      });
    }

    res.status(200).json({
      status: true,
      message: "Affiliation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
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
