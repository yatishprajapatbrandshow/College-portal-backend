const express = require('express');
const router = express.Router();
const {AdvertisementController} = require('../controller'); // Adjust the path accordingly

// Route to create an advertisement
router.post('/add-advertisement', AdvertisementController.createAdvertisement);

// Route to get all advertisements
router.get('/all-advertisement', AdvertisementController.getAllAdvertisements);

// Route to get a single advertisement by ID
router.get('/:id', AdvertisementController.getAdvertisementById);

// Route to update an advertisement
router.put('/:id', AdvertisementController.updateAdvertisement);

// Route to delete an advertisement (soft delete)
router.delete('/:id', AdvertisementController.deleteAdvertisement);

module.exports = router;
