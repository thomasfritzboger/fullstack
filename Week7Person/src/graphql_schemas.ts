const typeDefs = `#graphql 
  type Query {
    hello: String
    people: [Person]!
    addresses: [Address]!
  }

  type Mutation {
    createPerson(args:PersonArgs!): Person
    createAddress(args:AddressArgs!): Address
    connectPersonToAddress(args:RelationArgs!): Person
    removePersonAddressRelation(args:RelationArgs!): Address
    deletePerson(id:ID!): Boolean
  }

  input PersonArgs {
    name: String!
    age: Int!
    addressId:ID
  }

  input AddressArgs {
    street:String!
    city:String!
    personId:ID
  }

  input RelationArgs {
    personId:ID!
    addressId:ID!
  }

  type Person {
    id:ID!
    name:String!
    age:Int
    addresses:[Address]
  }

  type Address {
    id:ID!
    street:String!
    city:String!
    people:[Person]
  } 
`;

export default typeDefs