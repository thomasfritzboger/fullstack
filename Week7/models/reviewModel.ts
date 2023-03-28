import mongoose = require('mongoose');
import validator from 'validator';

const reviewSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: true,
      maxLength: 200,
      minLength: 10
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

reviewSchema.pre('save', async function(next){
  if (validator.contains(this.comment, "lort")) {
    next(new Error('bandeord is not ok'))
  }
  else {
    this.comment = this.comment.toLowerCase()
    next()
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;