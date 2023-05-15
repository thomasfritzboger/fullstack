import Person from "../../models/personModel";
import Address from "../../models/addressModel";
import { PersonType, AddressType, Context, Args} from "../types";


export default {
    createPerson: async (_parent:PersonType, {input}:Args) => {
        return await Person.create(input);
    },
    createAddress: async (_parent:AddressType, {input}:Args)=> {
        return await Address.create(input);
    },
    addPersonToAddress: async (_parent:never, {input}:any)=> {
        const person = await Person.findById(input.personId);
        const address = await Address.findById(input.addressId);

        if (!person!.addresses.includes(input.addressId)) {
            person!.addresses.push(input.addressId);
            await person!.save();
        }

        if (!address!.people.includes(input.personId)) {
            address!.people.push(input.personId);
            await address!.save();
        }

        const populatedAddress = await address!.populate("people");

        return populatedAddress;
    },
    removePersonFromAddress: async (_parent:never, {input}:Args) => {
        const person:any = await Person.findById(input.id);
        const address:any = await Address.findById(input.id);

        if (person!.addresses.includes(input.id)) {

            person!.addresses.splice(person!.addresses.indexOf(address), 1);
            await person!.save();
        }

        if (address!.people.includes(input.id)) {

            address!.people.splice(address!.people.indexOf(person), 1);
            await address!.save();
        }

        const updateAddress = await address!.populate("people");

        return updateAddress;
    },
    deletePerson: async (_parent:any, {id}:any)=> {
        await Person.findByIdAndDelete(id);
        return {
            id:id,
        };
    }
}