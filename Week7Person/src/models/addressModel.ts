import mongoose, {Schema, Document} from "mongoose";

export interface IAddress extends Document {
    street: string;
    city: number;
    people?: [string];
}

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        minLength: 5,
        maxLength: 200,
        required: true
    },
    city: {
        type: String,
        enum: ['Lyngby','Holte','Virum'],
        message:'The city must be Lyngby, Holte or Virum'
    },
    people: [{ type: Schema.Types.ObjectId, ref: 'Person', required: true }]
});

export default mongoose.model<IAddress>('Address',addressSchema);

 