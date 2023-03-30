import app from "./app";
import * as dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import Person from "./models/personModel";


dotenv.config({path:"./.env"})
import * as mongoose from "mongoose";
import {graphql} from "graphql/graphql";


const DB = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);

console.log((DB));

mongoose.connect(DB, {
}).then(() => console.log('DB connection successful!'));




// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const people = await Person.find({},"name age city")
//const people2= Person.find({},"name")
export const typeDefs = `#graphql 
  type Query {
    hello: String
    users: [User]!
    books: [Book]!
    people: [Person]!
  }
  
  type Person {
    id:ID!
    name:String!
    age:Int
    city:String!
    
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  
  type Book {
    title:String!
    author:String!
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        users: () => users,
        books: () => books,
        people: () => people,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const  port:number = parseInt(process.env.PORT!)


// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});

console.log(`🚀  Server ready at: ${url}`);

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'johnd@mail.dk',
        age: 25,
    },
    {
        id: '2',
        name: 'Jane Doe',
        email: 'janed@mail.dk',
        age: 30,
    },
    {
        id: '3',
        name: 'John Smith',
        email: 'jonhs@mail.dk',
        age: 35,
    },
];






