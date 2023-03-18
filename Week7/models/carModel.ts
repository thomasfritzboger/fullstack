import mongoose = require('mongoose');

const carSchema = new mongoose.Schema({ 
    model: {
        type: String,
        required: [true, 'You are required to enter a car model'],
        trim: true,
        maxLength: [20, 'A model type must not exceed 20 characters'],
        minLength: [5, 'A model must be at least 5 characters']
    },
    year: Number,
    price: Number,
    color: {
        type: String,
        enum: ['Black','White'],
        message:'The color must be Black or White' 
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Car = mongoose.model('Car',carSchema);



export default Car