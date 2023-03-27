import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express = require('express')
import {NextFunction, Request, Response} from 'express';
import morgan = require('morgan')
import carRouter from './routes/carRouter';
import AppError from './utilities/appError';
import globalErrorHandler from './middlewares/globalErrorHandler'

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("Development mode...");
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
})

app.use("/api/v1/cars", carRouter );

app.all('*', (req,res,next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})

app.use(globalErrorHandler);

export default app;