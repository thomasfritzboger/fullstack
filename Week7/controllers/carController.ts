import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilities/catchAsync';
import Car from "../models/carModel"
import Review from '../models/reviewModel';

interface Car {
  id: string,
  model: string,
  year: number,
  price: number,
  color: string,

  [key : string] : any
}




export const getAllCars = async (req: Request, res: Response, next:NextFunction) => {

  const cars:Car[] = await Car.find()
  res.status(200)
    .json({
      cars
    })
}


export const getCarById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const carFound = await Car.findById(req.params.id)
  res.status(200).
  json ({
    carFound
  });
});

export const createACar = catchAsync(async(req: Request, res: Response, next:NextFunction) => {

  const createdCar = await Car.create(req.body)
  res.status(201)
    .json({
      data: createdCar
    });
});

export const updateCar = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})

  if (!updatedCar) {
    res.status(404).json({
      message:'No such car to update'
    })
  }
  res.status(200).json({
    updatedCar
  });
});

export const deleteCar = catchAsync(async(req: Request, res: Response, next:NextFunction) => {
  await Car.findByIdAndDelete(req.params.id)
  res.status(204).json({
    message: 'Car successfully deleted'
  });


});

export const createCarReview = catchAsync(async (req:Request, res:Response, next:NextFunction) =>{
  const car:Car | null = await Car.findById(req.params.id);
  if (!car) {
    return res.status(404).json({
      message: 'No such car'
    });
  }
  const review = new Review({"comment": req.body.comment});
  await review.save();
  car.reviews.push(review);
  await car.save();
  res.status(201).json({
    car
  })
})


