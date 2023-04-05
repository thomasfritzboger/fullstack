import * as dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import  typeDefs  from "./graphql_schemas";
dotenv.config({path:"./.env"})
import * as mongoose from "mongoose";
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';

const DBString = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);

console.log((DBString));

mongoose.connect(DBString)
    .then(() => console.log('DB connection successful!'));

const server = new ApolloServer({
    typeDefs,
    resolvers : {Query, Mutation},
});

const  port:number = parseInt(process.env.PORT!)
const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});

console.log(`🚀  Server ready at: ${url}`);








