import mongoose, {Schema} from 'mongoose';

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A person needs a name'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'A person needs an age'],
        minValue: [0, 'A person cannot be under 0 years old'],
    },
    url: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
    addresses: {
        type: [Schema.Types.ObjectId],
        ref:'Address',
    },
});

const Person = mongoose.model('Person', personSchema);

export default Person;