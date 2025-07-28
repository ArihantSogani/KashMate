const express = require('express');
const router = express.Router();
const { submitReview, getAllReviews, getReviewStats } = require('../controllers/reviewController');

// Submit a new review (public route)
router.post('/', submitReview);

// Get all reviews (for admin purposes)
router.get('/', getAllReviews);

// Get review statistics
router.get('/stats', getReviewStats);

module.exports = router; 