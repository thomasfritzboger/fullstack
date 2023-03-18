import { getAllPeople, createAPerson, getPersonById, deletePerson , updatePerson} from "../controllers/personController";
import express = require('express')

const routes = express.Router()

routes.route("/").get(getAllPeople).post(createAPerson);
routes.route("/:id").get(getPersonById).delete(deletePerson).patch(updatePerson);

export default routes;