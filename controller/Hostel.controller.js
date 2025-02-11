const { Hostel } = require('../models'); 

// 1. Create a new hostel listing
const createHostel = async (req, res) => {
  try {
    const hostelData = req.body;
    
    // Create a new Hostel document
    const newHostel = new Hostel(hostelData);
    await newHostel.save();
    
    return res.status(201).json({
      status: 'success',
      message: 'Hostel created successfully',
      data: newHostel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error creating hostel',
      error: error.message
    });
  }
};

// 2. Get all hostels with optional search filters
const getAllHostels = async (req, res) => {
  try {
    const { name, city, country, status, minRating } = req.query;

    let searchQuery = { deleteFlag: false };

    if (name) {
      searchQuery.name = { $regex: name, $options: 'i' }; // Case-insensitive search on name
    }
    if (city) {
      searchQuery.city = { $regex: city, $options: 'i' }; // Case-insensitive search on city
    }
    if (country) {
      searchQuery.country = { $regex: country, $options: 'i' }; // Case-insensitive search on country
    }
    if (status !== undefined) {
      searchQuery.status = status === 'true'; // Convert status to boolean
    }
    if (minRating) {
      searchQuery.rating = { $gte: minRating }; // Filter by minimum rating
    }

    const hostels = await Hostel.find(searchQuery);
    return res.status(200).json({
      status: 'success',
      message: 'Hostels fetched successfully',
      data: hostels
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching hostels',
      error: error.message
    });
  }
};

// 3. Get a single hostel by its ID
const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel || hostel.deleteFlag) {
      return res.status(404).json({
        status: 'error',
        message: 'Hostel not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Hostel fetched successfully',
      data: hostel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching hostel',
      error: error.message
    });
  }
};

// 4. Update a hostel's details
const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!hostel || hostel.deleteFlag) {
      return res.status(404).json({
        status: 'error',
        message: 'Hostel not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Hostel updated successfully',
      data: hostel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error updating hostel',
      error: error.message
    });
  }
};

// 5. Soft delete a hostel (set deleteFlag to true)
const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel || hostel.deleteFlag) {
      return res.status(404).json({
        status: 'error',
        message: 'Hostel not found or already deleted'
      });
    }

    hostel.deleteFlag = true; // Mark the hostel as deleted
    await hostel.save();

    return res.status(200).json({
      status: 'success',
      message: 'Hostel marked for deletion',
      data: hostel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error deleting hostel',
      error: error.message
    });
  }
};

module.exports = { 
  createHostel, 
  getAllHostels, 
  getHostelById, 
  updateHostel, 
  deleteHostel 
};
