import * as dotenv from "dotenv";
dotenv.config({path:"./.env"});
import * as mongoose from "mongoose";
import {ApolloServer} from "@apollo/server";
import typeDefs from "./graphql_schemas";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import express, {Express, Request, Response} from "express";
import * as http from "http";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from "cors";
import body_parser_pkg from 'body-parser';
import {expressMiddleware} from "@apollo/server/express4";
const { json } = body_parser_pkg;

const app:Express = express();

const httpServer:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> = http.createServer(app);

const server:ApolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

await server.start();

app.use("/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server));


const port = parseInt(process.env.PORT!);

await new Promise<void>((resolve) => httpServer.listen({port}, resolve));
console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);

app.get("*", function (req:Request, res:Response):void {
    res.send({status:404, message:"Resource not found"});
});

const DB:string = process.env.DATABASE_DEV!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!,
);
mongoose.connect(DB, {
}).then(() => console.log('DB connection has succeed!'));
