const express = require('express');
const router = express.Router();
const  { HostelController}  = require('../controller');

// Create a hostel listing
router.post('/add-hostel', HostelController.createHostel);

// Get all hostels with optional search filters
router.get('/hostels', HostelController.getAllHostels);

// Get a single hostel by ID
router.get('/:id', HostelController.getHostelById);

// Update a hostel listing
router.put('/:id', HostelController.updateHostel);

// Soft delete a hostel listing
router.delete('/:id', HostelController.deleteHostel);

module.exports = router;
