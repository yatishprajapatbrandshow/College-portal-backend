const express = require('express');
const router = express.Router();
const {advertisementController} = require('../controller'); // Adjust the path accordingly

// Route to create an advertisement
router.post('/add-advertisement', advertisementController.createAdvertisement);

// Route to get all advertisements
router.get('/all-advertisement', advertisementController.getAllAdvertisements);

// Route to get a single advertisement by ID
router.get('/:id', advertisementController.getAdvertisementById);

// Route to update an advertisement
router.put('/:id', advertisementController.updateAdvertisement);

// Route to delete an advertisement (soft delete)
router.delete('/:id', advertisementController.deleteAdvertisement);

module.exports = router;
