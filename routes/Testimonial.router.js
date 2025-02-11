const express = require('express');
const router = express.Router();
const  {TestimonialController } = require('../controller');

// Create a new testimonial
router.post('/create', TestimonialController.createTestimonial);

// Get all testimonials
router.get('/all-testimonials', TestimonialController.getAllTestimonials);

// Get testimonial by ID
router.get('/:id', TestimonialController.getTestimonialById);

// Update testimonial
router.put('/:id', TestimonialController.updateTestimonial);

// Soft delete testimonial
router.delete('/:id/delete', TestimonialController.deleteTestimonial);



module.exports = router;
