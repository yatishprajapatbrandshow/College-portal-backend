const Accommodation= require('../models'); 
// Create a new Accommodation
exports.createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    const savedAccommodation = await accommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Accommodations
exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Accommodation by ID
exports.getAccommodationById = async (req, res) => {
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
exports.updateAccommodation = async (req, res) => {
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
exports.deleteAccommodation = async (req, res) => {
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
