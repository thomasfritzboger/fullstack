import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express = require('express')
import personRoutes from "./routes/personRoutes";

import morgan = require('morgan');
import logger from "./utility/logger";
import routes from "./routes/personRoutes";


const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log("Development mode...");
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files


app.use("/api/v1/people", routes );


export default app;