const College  = require("../models/College.model.js");

const createCollege = async (req, res) => {
  try {
    const {
      name,
      city,
      state,
      phone,
      email,
      established_year,
      affiliated_university,
      college_type,
      ranking,
      accreditation,
      placement_details,
      hostel_availability,
      scholarship_details,
      location,
      images,
      datasheet_url,
      website_url,
    } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        status: false,
        message: "Name, Phone, and Email are required fields.",
        data: false,
      });
    }

    // Validate data types
    if (established_year && isNaN(Number(established_year))) {
      return res.status(400).json({
        status: false,
        message: "Established year must be a number.",
        data: false,
      });
    }

    if (ranking && isNaN(Number(ranking))) {
      return res.status(400).json({
        status: false,
        message: "Ranking must be a number.",
        data: false,
      });
    }

    if (location) {
      const { latitude, longitude } = location;
      if (latitude && typeof latitude !== "number") {
        return res.status(400).json({
          status: false,
          message: "Latitude must be a number.",
          data: false,
        });
      }
      if (longitude && typeof longitude !== "number") {
        return res.status(400).json({
          status: false,
          message: "Longitude must be a number.",
          data: false,
        });
      }
    }

    // Avoid duplicate email or phone (if required)
    const existingCollege = await College.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingCollege) {
      return res.status(409).json({
        status: false,
        message: "A college with the same email or phone already exists.",
        data: false,
      });
    }

    // Create a new College instance
    const newCollege = new College({
      name,
      city,
      state,
      phone,
      email,
      established_year,
      affiliated_university,
      college_type,
      ranking,
      accreditation,
      placement_details,
      hostel_availability,
      scholarship_details,
      location,
      images,
      datasheet_url,
      website_url,
    });

    // Save to database
    const savedCollege = await newCollege.save();

    return res.status(201).json({
      status: true,
      message: "College created successfully.",
      data: savedCollege,
    });
  } catch (error) {
    console.error("Error creating college:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: false,
        message: "Validation failed.",
        data: error.message,
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        status: false,
        message: "Duplicate entry detected.",
        data: error.keyValue,
      });
    }

    // General server error
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};
const updateCollege = async (req, res) => {
  try {
    const { id } = req.params; // College ID to update
    const updates = req.body;

    // Check if college ID is provided
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "College ID is required.",
        data: false,
      });
    }

    // Validate data types for specific fields
    if (updates.established_year && isNaN(Number(updates.established_year))) {
      return res.status(400).json({
        status: false,
        message: "Established year must be a number.",
        data: false,
      });
    }

    if (updates.ranking && isNaN(Number(updates.ranking))) {
      return res.status(400).json({
        status: false,
        message: "Ranking must be a number.",
        data: false,
      });
    }

    if (updates.location) {
      const { latitude, longitude } = updates.location;
      if (latitude && typeof latitude !== "number") {
        return res.status(400).json({
          status: false,
          message: "Latitude must be a number.",
          data: false,
        });
      }
      if (longitude && typeof longitude !== "number") {
        return res.status(400).json({
          status: false,
          message: "Longitude must be a number.",
          data: false,
        });
      }
    }

    // Find the college to update
    const existingCollege = await College.findById(id);
    if (!existingCollege) {
      return res.status(404).json({
        status: false,
        message: "College not found.",
        data: false,
      });
    }

    // Update fields
    const updatedCollege = await College.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "College updated successfully.",
      data: updatedCollege,
    });
  } catch (error) {
    console.error("Error updating college:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: false,
        message: "Validation failed.",
        data: error.message,
      });
    }

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid College ID format.",
        data: false,
      });
    }

    // General server error
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};
const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "College ID is required.",
        data: false,
      });
    }

    // Find the college by ID
    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({
        status: false,
        message: "College not found.",
        data: false,
      });
    }

    // Soft delete the college
    college.deleteflag = true;
    college.status = false;
    await college.save();

    return res.status(200).json({
      status: true,
      message: "College deleted successfully.",
      data: false,
    });
  } catch (error) {
    console.error("Error deleting college:", error);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid College ID format.",
        data: false,
      });
    }

    // General server error
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};
const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "College ID is required.",
        data: false,
      });
    }

    // Find the college by ID
    const college = await College.findById(id);

    // Check if the college exists
    if (!college) {
      return res.status(404).json({
        status: false,
        message: "College not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "College retrieved successfully.",
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college by ID:", error);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid College ID format.",
        data: false,
      });
    }

    // General server error
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};
const getAllColleges = async (req, res) => {
  try {
    // Destructure query parameters for filtering, pagination, and sorting
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      city,
      state,
      name,
    } = req.query;

    // Build a dynamic filter object
    const filter = {};
    if (city) filter.city = { $regex: city, $options: "i" }; // Case-insensitive city filter
    if (state) filter.state = { $regex: state, $options: "i" }; // Case-insensitive state filter
    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive name filter

    // Parse sorting order
    const sortOrder = order === "asc" ? 1 : -1;

    // Fetch records with filtering, pagination, and sorting
    const colleges = await College.find(filter)
      .sort({ [sortBy]: sortOrder }) // Dynamic sorting
      .skip((page - 1) * limit) // Pagination: skip records
      .limit(parseInt(limit)); // Pagination: limit records

    // Total count of matching records
    const total = await College.countDocuments(filter);

    return res.status(200).json({
      status: true,
      message: "Colleges retrieved successfully.",
      data: {
        colleges,
        pagination: {
          totalRecords: total,
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve colleges.",
      data: false,
    });
  }
};
module.exports = {
  createCollege,
  updateCollege,
  deleteCollege,
  getCollegeById,
  getAllColleges,
};
