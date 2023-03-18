import { Request, Response } from "express"
import Car from "../models/carModel"

interface Car {
    id: string,
    model: string,
    year: number,
    price: number,
    color: string,

    [key : string] : any
}

export const getAllCars = async (req: Request, res: Response) => {

    try {
      const cars:Car[] = await Car.find()
      res.status(200)
      .json({
          cars
      })
    }
    catch (err) {
      res.status(400)
      .json({
          status: "fail",
          message: err
      })
    }
  }

  export const getCarById = async (req: Request, res: Response) => {
        
    try {
        const carFound = await Car.findById(req.params.id)
        res.status(200).
        json ({
            carFound
        })

    } catch (err) {
        res.status(404)
      .json({
          status: `No car with id:  `,
          message: err
      })
    }
  }
  
  export const createACar = async(req: Request, res: Response) => {
  
    try {  
      const createdCar = await Car.create(req.body)
      res.status(201)
      .json({
          data: createdCar     
      })
    }
    catch (err) {
      res.status(400)
      .json({
          status: 'fail',
          message: err
      })
    }
  }

  export const updateCar = async(req:Request, res:Response) => {
      const updatedCar = await Car.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if (!updatedCar) {
        res.status(404).json({
          message:'No such car to update'
        })
      }
      res.status(200).json({
        updatedCar
      })
  }

  export const deleteCar = async(req: Request, res: Response) => {
    await Car.findByIdAndDelete(req.params.id)
    res.status(204).json({
        message: 'Car successfully deleted'
    });
}


