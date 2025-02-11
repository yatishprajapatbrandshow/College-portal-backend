const express = require('express');
const router = express.Router();
const  { BookingController } = require('../controller');

router.post('/create', BookingController.createBooking);
router.get('/bookings', BookingController.getAllBookings);
router.get('/:id', BookingController.getBookingById);
router.put('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.deleteBooking);

module.exports = router;
