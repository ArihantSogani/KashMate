const Review = require('../models/Review');

// Submit a new review
exports.submitReview = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    // Validate required fields
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Create new review
    const review = new Review({
      name,
      email,
      rating,
      message
    });

    await review.save();

    res.status(201).json({ 
      message: 'Review submitted successfully',
      review: {
        id: review._id,
        name: review.name,
        rating: review.rating,
        message: review.message,
        createdAt: review.createdAt
      }
    });

  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ message: 'Failed to submit review', error: error.message });
  }
};

// Get all reviews (for admin purposes)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

// Get review statistics
exports.getReviewStats = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();
    const averageRating = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    const ratingDistribution = await Review.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      totalReviews,
      averageRating: averageRating.length > 0 ? Math.round(averageRating[0].averageRating * 10) / 10 : 0,
      ratingDistribution
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({ message: 'Failed to fetch review statistics', error: error.message });
  }
}; 