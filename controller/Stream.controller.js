// controllers/StreamController.js

const { Stream } = require('../models/Stream.model'); 

// Create a new Stream
const createStream = async (req, res) => {
  try {
    const {
      name,
      short_name,
      description,
      status,
      deleteflag,
    } = req.body;

    // Validate required fields
    if (!name || !short_name) {
      return res.status(400).json({
        status: false,
        message: "Name and Short Name are required fields.",
        data: false,
      });
    }

    // Avoid duplicate short_name (if required)
    const existingStream = await Stream.findOne({ short_name });
    if (existingStream) {
      return res.status(409).json({
        status: false,
        message: "A stream with the same short name already exists.",
        data: false,
      });
    }

    // Create a new Stream instance
    const newStream = new Stream({
      name,
      short_name,
      description,
      status,
      deleteflag,
    });

    // Save to database
    const savedStream = await newStream.save();

    return res.status(201).json({
      status: true,
      message: "Stream created successfully.",
      data: savedStream,
    });
  } catch (error) {
    console.error("Error creating stream:", error);

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

// Get all Streams
const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find({ deleteflag: false }); // Fetch only streams that are not marked as deleted
    return res.status(200).json({
      status: true,
      message: "Streams retrieved successfully.",
      data: streams,
    });
  } catch (error) {
    console.error("Error fetching streams:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve streams.",
      data: false,
    });
  }
};

// Get Stream by ID
const getStreamById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Stream ID is required.",
        data: false,
      });
    }

    const stream = await Stream.findById(id);

    if (!stream) {
      return res.status(404).json({
        status: false,
        message: "Stream not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Stream retrieved successfully.",
      data: stream,
    });
  } catch (error) {
    console.error("Error fetching stream by ID:", error);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid Stream ID format.",
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

// Update a Stream
const updateStream = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Stream ID is required.",
        data: false,
      });
    }

    // Find the Stream by ID
    const existingStream = await Stream.findById(id);
    if (!existingStream) {
      return res.status(404).json({
        status: false,
        message: "Stream not found.",
        data: false,
      });
    }

    // Update Stream
    const updatedStream = await Stream.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "Stream updated successfully.",
      data: updatedStream,
    });
  } catch (error) {
    console.error("Error updating stream:", error);

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
        message: "Invalid Stream ID format.",
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

// Soft Delete a Stream
const deleteStream = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Stream ID is required.",
        data: false,
      });
    }

    // Find the Stream by ID
    const stream = await Stream.findById(id);
    if (!stream) {
      return res.status(404).json({
        status: false,
        message: "Stream not found.",
        data: false,
      });
    }

    // Soft delete the Stream
    stream.deleteflag = true;
    await stream.save();

    return res.status(200).json({
      status: true,
      message: "Stream deleted successfully.",
      data: false,
    });
  } catch (error) {
    console.error("Error deleting stream:", error);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid Stream ID format.",
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

module.exports = {
  createStream,
  getAllStreams,
  getStreamById,
  updateStream,
  deleteStream,
};
