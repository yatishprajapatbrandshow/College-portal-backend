const express = require("express");
const router = express.Router();
const {eventController} = require("../controller");

// Create a new Event
router.post("/add-event", eventController.createEvent);

// Get all Events
router.get("/all-events", eventController.getAllEvents);

// Get a single Event by ID
router.get("/:id", eventController.getEventById);

// Update an Event by ID
router.put("/:id", eventController.updateEvent);

// Soft delete an Event by ID
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
