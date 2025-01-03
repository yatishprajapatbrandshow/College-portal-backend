const express = require("express");
const router = express.Router();

const { SearchController } = require("../controller"); // Import the search function

// Route to perform a search query
router.get("/",SearchController.search);  // This will handle all the search queries for different tables

module.exports = router;
