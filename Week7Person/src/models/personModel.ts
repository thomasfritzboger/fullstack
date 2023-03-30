import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You are required to enter a name'],
        maxLength: [40, 'A name must not exceed 40 characters'],
        minLength: [5, 'A name must be at least 5 characters']
    },
    age: Number,
    city: {
        type: String,
        enum: ['Lyngby','Holte','Virum'],
        message:'The city must be Lyngby, Holte or Virum'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Person = mongoose.model('Person',peopleSchema);



export default Person