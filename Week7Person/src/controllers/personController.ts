import { Request, Response } from "express"
import Person from "../models/personModel";

interface Person {
    id: string,
    name: string,
    age: number,
    city: string,

    [key : string] : any
}

export const getAllPeople = async (req: Request, res: Response) => {

    try {
        const people:Person[] = await Person.find()
        res.status(200)
            .json({
                people
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

export const getPersonById = async (req: Request, res: Response) => {

    try {
        const personFound = await Person.findById(req.params.id)
        res.status(200).
        json ({
            personFound
        })

    } catch (err) {
        res.status(404)
            .json({
                status: `No person with id:  `,
                message: err
            })
    }
}

export const createAPerson = async(req: Request, res: Response) => {

    try {
        const createdPerson = await Person.create(req.body)
        res.status(201)
            .json({
                data: createdPerson
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

export const updatePerson = async(req:Request, res:Response) => {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if (!updatedPerson) {
        res.status(404).json({
            message:'No such person to update'
        })
    }
    res.status(200).json({
        updatedPerson
    })
}

export const deletePerson = async(req: Request, res: Response) => {
    await Person.findByIdAndDelete(req.params.id)
    res.status(204).json({
        message: 'Person successfully deleted'
    });
}