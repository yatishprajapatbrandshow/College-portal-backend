const express = require('express');
const router = express.Router();
const {PopularCollegeController} = require('../controller');  // Assuming your controller file is in controllers/collegeController.js

// Create a new college
router.post('/create', PopularCollegeController.createPopularCollege);

// Get all colleges with optional search, filter, and pagination
router.get('/colleges', PopularCollegeController.getPopularColleges);

// Get a single college by ID
router.get('/:id', PopularCollegeController.getPopularCollegeById);

// Update a college by ID
router.put('/:id', PopularCollegeController.updatePopularCollege);

// Delete a college by ID
router.delete('/:id', PopularCollegeController.deletePopularCollege);

module.exports = router;
