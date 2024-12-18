// routes/StreamRoutes.js

const express = require("express");
const router = express.Router();

const { StreamController } = require("../controller/Stream.controller");

// Route to create a new stream
router.post("/add-stream", StreamController.createStream);

// Route to get all streams
router.get("/all-streams", StreamController.getAllStreams);

// Route to get a stream by ID
router.get("/:id", StreamController.getStreamById);

// Route to update a stream
router.put("/:id", StreamController.updateStream);

// Route to soft delete a stream
router.delete("/:id", StreamController.deleteStream);

module.exports = router;
