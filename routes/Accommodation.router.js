// routes/AccommodationRoutes.js

const express = require('express');
const router = express.Router();

const AccommodationController = require('../controller/Accomodation.controller');

// Routes
router.post('/add-accommodation', AccommodationController.createAccommodation); // Create
router.get('/all-accommodations', AccommodationController.getAllAccommodations); // Read all
router.get('/:id', AccommodationController.getAccommodationById); // Read by ID
router.put('/:id', AccommodationController.updateAccommodation); // Update
router.delete('/:id', AccommodationController.deleteAccommodation); // Delete

module.exports = router;
