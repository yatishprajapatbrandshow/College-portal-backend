const Accommodation = require('../models/Accommodation.model');

// Create Accommodation
const createAccommodation = async (req, res) => {
  try {
    const {
      name,
      type,
      location,
      capacity,
      price,
      available,
      amenities,
      images,
    } = req.body;

    // Validate required fields
    if (!name || !type || !location || !price) {
      return res.status(400).json({
        status: false,
        message: "Name, Type, Location, and Price are required fields.",
        data: false,
      });
    }

    // Create a new Accommodation instance
    const newAccommodation = new Accommodation({
      name,
      type,
      location,
      capacity,
      price,
      available,
      amenities,
      images,
    });

    // Save to the database
    const savedAccommodation = await newAccommodation.save();

    return res.status(201).json({
      status: true,
      message: "Accommodation created successfully.",
      data: savedAccommodation,
    });
  } catch (error) {
    console.error("Error creating accommodation:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Get all Accommodations
const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    return res.status(200).json({
      status: true,
      message: "Accommodations fetched successfully.",
      data: accommodations,
    });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Get Accommodation by ID
const getAccommodationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Accommodation ID is required.",
        data: false,
      });
    }

    // Find the accommodation by ID
    const accommodation = await Accommodation.findById(id);
    if (!accommodation) {
      return res.status(404).json({
        status: false,
        message: "Accommodation not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Accommodation fetched successfully.",
      data: accommodation,
    });
  } catch (error) {
    console.error("Error fetching accommodation by ID:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Update Accommodation
const updateAccommodation = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Accommodation ID is required.",
        data: false,
      });
    }

    // Find the accommodation and update
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAccommodation) {
      return res.status(404).json({
        status: false,
        message: "Accommodation not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Accommodation updated successfully.",
      data: updatedAccommodation,
    });
  } catch (error) {
    console.error("Error updating accommodation:", error);
    return res.status(400).json({
      status: false,
      message: "Validation failed.",
      data: error.message,
    });
  }
};

// Delete Accommodation
const deleteAccommodation = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Accommodation ID is required.",
        data: false,
      });
    }

    // Find the accommodation and delete
    const deletedAccommodation = await Accommodation.findByIdAndDelete(id);
    if (!deletedAccommodation) {
      return res.status(404).json({
        status: false,
        message: "Accommodation not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Accommodation deleted successfully.",
      data: false,
    });
  } catch (error) {
    console.error("Error deleting accommodation:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
};
