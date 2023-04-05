import mongoose , {Schema, Document} from 'mongoose';

export interface IPerson extends Document {
    name: string;
    age: number;
    addresses?: [string]
}

const peopleSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'You are required to enter a name'],
        maxLength: 40,
        minLength: 5
    },
    age: Number,
    createdAt:{
        type: Date,
        default: Date.now
    },
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address', required: true }]
});

export default mongoose.model<IPerson>('Person',peopleSchema);




