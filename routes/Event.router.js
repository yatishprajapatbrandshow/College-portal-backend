const express = require("express");
const router = express.Router();
const {EventController} = require("../controller");

// Create a new Event
router.post("/add-event", EventController.createEvent);

// Get all Events
router.get("/all-events", EventController.getAllEvents);

// Get a single Event by ID
router.get("/:id", EventController.getEventById);

// Update an Event by ID
router.put("/:id", EventController.updateEvent);

// Soft delete an Event by ID
router.delete("/:id", EventController.deleteEvent);

module.exports = router;
