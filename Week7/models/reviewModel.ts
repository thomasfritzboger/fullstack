import mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: [true, 'You are required to enter a comment'],
      maxLength: [200, 'A comment type must not exceed 200 characters'],
      minLength: [10, 'A comment must be at least 10 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;