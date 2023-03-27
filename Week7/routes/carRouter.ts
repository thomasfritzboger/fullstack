import {
  getAllCars,
  createACar,
  getCarById,
  deleteCar,
  updateCar,
  createCarReview,
} from '../controllers/carController';
import express = require('express')

const routes = express.Router()

routes.route("/").get(getAllCars).post(createACar);
routes.route("/:id").get(getCarById).delete(deleteCar).patch(updateCar);
routes.route("/:id/reviews").post(createCarReview)

export default routes;