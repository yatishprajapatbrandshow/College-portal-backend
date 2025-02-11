const express = require('express');
const router = express.Router();
const { ReviewController } = require('../controller'); 

// Route 1: Create a new review
router.post('/add-review', ReviewController.createReview);

// Route 2: Get all reviews (with optional query parameters for filtering)
router.get('/all-reviews', ReviewController.getAllReviews);

// Route 3: Get a single review by its ID
router.get('/:id', ReviewController.getReviewById);

// Route 4: Update a review by its ID
router.put('/:id', ReviewController.updateReview);

// Route 5: Soft delete a review by its ID (mark as inactive)
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;
