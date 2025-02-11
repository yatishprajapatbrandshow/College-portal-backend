const mongoose = require('mongoose');

// Define the schema for the Booking model
const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  accommodation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation',  // Reference to the Accommodation model
    required: true,
  },
  room_type: {
    type: String,
    required: true, // Type of room booked (e.g., single, double, dorm)
  },
  booking_date: {
    type: Date,
    default: Date.now,  // The date when the booking was created
  },
  start_date: {
    type: Date,
    required: true,  // The start date of the booking
  },
  end_date: {
    type: Date,
    required: true,  // The end date of the booking
  },
  total_amount: {
    type: Number,
    required: true,  // Total price for the booking
  },
  status: {
    type: Boolean,
    default: true,  // 'true' means the booking is active/confirmed, 'false' means the booking is cancelled or completed
  },
  payment_status: {
    type: String,
    enum: ['unpaid', 'paid', 'failed'],
    default: 'unpaid',  // Payment status (unpaid, paid, or failed)
  },
  payment_details: {
    transaction_id: {
      type: String,
      required: function() { return this.payment_status === 'paid'; },  // Only required if paid
    },
    payment_date: {
      type: Date,
      required: function() { return this.payment_status === 'paid'; },  // Only required if paid
    },
  },
  cancellation_details: {
    cancelled_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // If cancelled, store the user who cancelled it
    },
    cancellation_date: {
      type: Date,
      required: function() { return this.status === false; },  
    },
    cancellation_reason: {
      type: String,
      required: function() { return this.status === false; },  // Only required if cancelled
    },
  },
  created_at: {
    type: Date,
    default: Date.now,  
  },
  updated_at: {
    type: Date,
    default: Date.now, 
  },
});

// Create the Booking model using the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
