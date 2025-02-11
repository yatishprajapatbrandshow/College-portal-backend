const { Review } = require('../models'); 

// 1. Create a new review
const createReview = async (req, res) => {
  try {
    const reviewData = req.body;

    // Create a new Review document
    const newReview = new Review(reviewData);
    await newReview.save();

    return res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: newReview
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error creating review',
      error: error.message
    });
  }
};

// 2. Get all reviews with optional search filters
const getAllReviews = async (req, res) => {
  try {
    const { user_id, accommodation_id, status } = req.query;

    let searchQuery = {};

    if (user_id) {
      searchQuery.user_id = user_id;
    }
    if (accommodation_id) {
      searchQuery.accommodation_id = accommodation_id;
    }
    if (status !== undefined) {
      searchQuery.status = status === 'true'; // Convert status to boolean
    }

    const reviews = await Review.find(searchQuery).populate('user_id accommodation_id'); // Populate user and accommodation details if needed
    return res.status(200).json({
      status: 'success',
      message: 'Reviews fetched successfully',
      data: reviews
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// 3. Get a single review by its ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user_id accommodation_id');

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Review fetched successfully',
      data: review
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching review',
      error: error.message
    });
  }
};

// 4. Update a review's details
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error updating review',
      error: error.message
    });
  }
};

// 5. Soft delete a review (set status to false)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found'
      });
    }

    review.status = false; // Mark the review as deleted
    await review.save();

    return res.status(200).json({
      status: 'success',
      message: 'Review marked for deletion',
      data: review
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error deleting review',
      error: error.message
    });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
};
