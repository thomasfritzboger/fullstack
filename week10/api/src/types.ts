import Types from "mongoose";

type PersonType = {
    id:Types.ObjectId,
    name:string,
    age:number,
    url:string,
    addressId:Types.ObjectId
};

type AddressType = {
    id:Types.ObjectId,
    street:string,
    zip:number,
    personId:Types.ObjectId
};

type Context = {
    people:PersonType[];
    addresses:AddressType[];
};

type Args = {
    id:string;
    input:PersonType | AddressType;
};

export type {PersonType, AddressType, Context, Args};