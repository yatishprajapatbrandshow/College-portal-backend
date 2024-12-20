const {Accommodation} = require('../models'); 

// Create a new Accommodation
const createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    const savedAccommodation = await accommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      message: "Accommodations retrieved successfully.",
      data: accommodations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Accommodation by ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.json(accommodation);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.json(updatedAccommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Accommodation
const deleteAccommodation = async (req, res) => {
  try {
    const deletedAccommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!deletedAccommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation
};
