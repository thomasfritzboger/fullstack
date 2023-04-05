import Person, { IPerson } from "../models/personModel"
import Address, { IAddress } from "../models/addressModel"
import { CreateAddressInput,CreatePersonInput ,RelationArgs, DeletePersonInput} from "../inputs"

export default {
    createPerson: async (_parent:unknown, {args}:{args:CreatePersonInput}) => {
        return await Person.create(args)
    },
    createAddress: async (_parent:unknown, args:CreateAddressInput) => {
        return await Address.create(args)
    },

    connectPersonToAddress: async (_parent:unknown, args:RelationArgs) => {

        let person: IPerson | null;
        let address: IAddress | null;

        try {
            person = await Person.findById(args.personId);
            address = await Address.findById(args.addressId);
        } catch (execException:any)

        {
            console.log((execException).message);
            return
        }

        if (!person!.addresses!.includes(args.addressId)) {
            person!.addresses?.push(args.addressId);
            await person!.save();
        }

        if (!address!.people!.includes(args.personId)) {
            address!.people!.push(args.personId);
            await address!.save();
        }

        return await person!.populate('addresses');
    },

    removePersonAddressRelation: async (_parent:unknown,args:RelationArgs) => {
        let person: IPerson | null;
        let address: IAddress | null;

        try {
            person = await Person.findById(args.personId);
            address = await Address.findById(args.addressId);
        } catch (execException:any)

        {
            console.log((execException).message);
            return
        }
        if (person!.addresses!.includes(args.addressId)) {
            person!.addresses!.splice(person!.addresses!.indexOf(args.addressId),1);
            await person!.save();
        }

        if (address!.people!.includes(args.personId)) {
            address!.people!.splice(address!.people!.indexOf(args.personId),1);
            await address!.save();
        }

        const updatedAddress = await address!.populate('people');
        return updatedAddress;
    },
    deletePerson: async (_parent:unknown, args:DeletePersonInput) => {
        await Person.findByIdAndDelete(args.id)

    }

}