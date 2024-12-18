const express = require('express');
const router = express.Router();
const{ AccommodationController }= require('../controller'); 

// Routes
router.post('/', AccommodationController.createAccommodation); // Ensure this method exists in the controller
router.get('/', AccommodationController.getAllAccommodations); // Ensure this method exists
router.get('/:id',AccommodationController.getAccommodationById); // Ensure this method exists
router.put('/:id', AccommodationController.updateAccommodation); // Ensure this method exists
router.delete('/:id',AccommodationController.deleteAccommodation); // Ensure this method exists

module.exports = router;
