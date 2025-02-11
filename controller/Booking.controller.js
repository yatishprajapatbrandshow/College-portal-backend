const Booking = require('../models');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking({
      user_id: req.body.user_id,
      accommodation_id: req.body.accommodation_id,
      room_type: req.body.room_type,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      total_amount: req.body.total_amount,
      status: req.body.status || true, // Default to active
      payment_status: req.body.payment_status || 'unpaid',
      payment_details: req.body.payment_status === 'paid' ? req.body.payment_details : undefined,
      cancellation_details: req.body.status === false ? req.body.cancellation_details : undefined,
    });

    const booking = await newBooking.save();
    res.status(201).json({
      status: true,
      message: 'Booking created successfully!',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error creating booking.',
      data: error.message,
    });
  }
};

// Get all bookings with search and filter functionality
const getAllBookings = async (req, res) => {
  try {
    const { user_id, accommodation_id, status, payment_status, start_date, end_date, minAmount, maxAmount } = req.query;

    // Build search filter
    const filter = {};
    
    // Filter by user_id
    if (user_id) filter.user_id = user_id;

    // Filter by accommodation_id
    if (accommodation_id) filter.accommodation_id = accommodation_id;

    // Filter by booking status (active/inactive)
    if (status !== undefined) filter.status = status === 'true';

    // Filter by payment status (paid/unpaid)
    if (payment_status) filter.payment_status = payment_status;

    // Filter by start_date and end_date
    if (start_date || end_date) {
      filter.start_date = {};
      if (start_date) filter.start_date.$gte = new Date(start_date);
      if (end_date) filter.end_date = filter.end_date || {};
      if (end_date) filter.end_date.$lte = new Date(end_date);
    }

    // Filter by price range (total_amount)
    if (minAmount || maxAmount) {
      filter.total_amount = {};
      if (minAmount) filter.total_amount.$gte = parseFloat(minAmount);
      if (maxAmount) filter.total_amount.$lte = parseFloat(maxAmount);
    }

    const bookings = await Booking.find(filter).populate('user_id').populate('accommodation_id');

    res.status(200).json({
      status: true,
      message: bookings.length
        ? 'Bookings fetched successfully!'
        : 'No bookings found matching your criteria.',
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error fetching bookings.',
      data: error.message,
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user_id').populate('accommodation_id');
    if (!booking) {
      return res.status(404).json({
        status: false,
        message: 'Booking not found.',
        data: null,
      });
    }
    res.status(200).json({
      status: true,
      message: 'Booking fetched successfully!',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error fetching booking.',
      data: error.message,
    });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        user_id: req.body.user_id,
        accommodation_id: req.body.accommodation_id,
        room_type: req.body.room_type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        total_amount: req.body.total_amount,
        status: req.body.status,
        payment_status: req.body.payment_status,
        payment_details: req.body.payment_status === 'paid' ? req.body.payment_details : undefined,
        cancellation_details: req.body.status === false ? req.body.cancellation_details : undefined,
      },
      { new: true }
    ).populate('user_id').populate('accommodation_id');

    if (!updatedBooking) {
      return res.status(404).json({
        status: false,
        message: 'Booking not found.',
        data: null,
      });
    }

    res.status(200).json({
      status: true,
      message: 'Booking updated successfully!',
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error updating booking.',
      data: error.message,
    });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({
        status: false,
        message: 'Booking not found.',
        data: null,
      });
    }
    res.status(200).json({
      status: true,
      message: 'Booking deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error deleting booking.',
      data: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
