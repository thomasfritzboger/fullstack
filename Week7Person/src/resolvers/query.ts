import Person from "../models/personModel"
import Address from "../models/addressModel"

export default {
    hello: () => 'Hello world!',
    people: async () => await Person.find().populate('addresses'),
    addresses: async () => await Address.find().populate('people'),
}