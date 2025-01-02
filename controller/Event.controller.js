const { Event } = require('../models');

// Create a new Event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, status, images } = req.body;

    // Create a new event using the provided data
    const event = new Event({
      title,
      description,
      date,
      status,
      images,
    });

    // Save the event to the database
    await event.save();

    // Send response with status, message, and data
    res.status(201).json({
      status: true,
      message: "Event created successfully",
      data: event,
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

// Get all Events with Search functionality
const getAllEvents = async (req, res) => {
  try {
    const { search = "" } = req.query; // Search query parameter

    const filter = { deleteflag: false }; // Only fetch active events

    // If a search term is provided, dynamically search all fields
    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive regex
      filter.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { date: { $regex: searchRegex } },
        { status: { $regex: searchRegex } },
      ];
    }

    // Fetch events based on the filter (search term, deleteflag: false)
    const events = await Event.find(filter);

    if (events.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No events found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Events fetched successfully",
      data: events,
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

// Get a single Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event || event.deleteflag) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Event fetched successfully",
      data: event,
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

// Update an Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Event updated successfully",
      data: event,
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

// Soft delete an Event (Set deleteflag to true)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { deleteflag: true },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: null,
      });
    }

    // Send response with status, message, and data
    res.status(200).json({
      status: true,
      message: "Event deleted successfully",
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
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
