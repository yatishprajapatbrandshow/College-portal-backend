const { Accommodation } = require('../models'); 

// Create a new Accommodation
const createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    const savedAccommodation = await accommodation.save();
    res.status(201).json({
      status: true,
      data: savedAccommodation,
      message: "Accommodation created successfully."
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: null,
      message: error.message
    });
  }
};

// Get all Accommodations with Search functionality
const getAllAccommodations = async (req, res) => {
  try {
    const { search = "" } = req.query;  // Search query parameter
    const filter = {};

    // If a search term is provided, dynamically search all fields
    if (search) {
      const searchRegex = new RegExp(search, "i");  // Case-insensitive regex
      filter.$or = [
        { name: { $regex: searchRegex } },
        { city: { $regex: searchRegex } },
        { state: { $regex: searchRegex } },
        { type: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { price: { $regex: searchRegex } },
        { amenities: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
      ];
    }

    // Fetch accommodations based on the search filter
    const accommodations = await Accommodation.find(filter);

    // Return accommodations as a response
    res.status(200).json({
      status: true,
      data: accommodations,
      message: "Accommodations retrieved successfully."
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message
    });
  }
};

// Get Accommodation by ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'Accommodation not found'
      });
    }
    res.json({
      status: true,
      data: accommodation,
      message: "Accommodation retrieved successfully."
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message
    });
  }
};

// Update Accommodation
const updateAccommodation = async (req, res) => {
  try {
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAccommodation) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'Accommodation not found'
      });
    }
    res.json({
      status: true,
      data: updatedAccommodation,
      message: "Accommodation updated successfully."
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: null,
      message: error.message
    });
  }
};

// Delete Accommodation
const deleteAccommodation = async (req, res) => {
  try {
    const deletedAccommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!deletedAccommodation) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'Accommodation not found'
      });
    }
    res.json({
      status: true,
      data: null,
      message: 'Accommodation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message
    });
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation
};
