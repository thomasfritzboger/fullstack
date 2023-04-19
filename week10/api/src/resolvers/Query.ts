import Person from "../../models/personModel";
import Address from "../../models/addressModel";
import {Args, Context} from "../types";

export default {
    people: async () => await Person.find().populate("addresses"),
    addresses: async () => await Address.find().populate("people"),
    person: async (_parent:never, {id}:Args) => await Person.findById(id).populate("addresses"),
    address: async (_parent:never, {id}:Args) => await Address.findById(id).populate("people")
}