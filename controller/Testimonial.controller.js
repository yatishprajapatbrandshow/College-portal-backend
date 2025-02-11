const { Testimonial } = require('../models'); 

// CREATE: Add a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, img, rating, email, designation, description } = req.body;

    // Create a new Testimonial object
    const newTestimonial = new Testimonial({
      name,
      img,
      rating,
      email,
      designation,
      description,  // Include description field
    });

    // Save the testimonial to the database
    await newTestimonial.save();

    res.status(201).json({
      message: 'Testimonial created successfully!',
      testimonial: newTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating testimonial',
      error: error.message,
    });
  }
};

// GET ALL: Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ deleteflag: false });

    res.status(200).json({
      message: 'Testimonials fetched successfully!',
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching testimonials',
      error: error.message,
    });
  }
};

// GET BY ID: Get a single testimonial by ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        message: 'Testimonial not found',
      });
    }

    res.status(200).json({
      message: 'Testimonial fetched successfully!',
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching testimonial',
      error: error.message,
    });
  }
};

// UPDATE: Update a testimonial by ID
const updateTestimonial = async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedTestimonial) {
      return res.status(404).json({
        message: 'Testimonial not found to update',
      });
    }

    res.status(200).json({
      message: 'Testimonial updated successfully!',
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating testimonial',
      error: error.message,
    });
  }
};

// DELETE: Delete a testimonial by ID (soft delete)
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        message: 'Testimonial not found',
      });
    }

    // Mark testimonial as deleted
    testimonial.deleteflag = true;
    await testimonial.save();

    res.status(200).json({
      message: 'Testimonial marked as deleted',
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting testimonial',
      error: error.message,
    });
  }
};

module.exports = {  
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
