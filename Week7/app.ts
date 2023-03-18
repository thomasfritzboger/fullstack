import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express = require('express')
import routes from './routes/carRoute';

import morgan = require('morgan');
import logger from "./utility/logger";


const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("Development mode...");
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files


app.use("/api/v1/cars", routes );


export default app;