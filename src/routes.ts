import { Router }  from "express";

import { user } from './controller/userController'
import { login } from "./controller/loginController";
import { profession } from "./controller/professionController";
import { patient } from "./controller/patientController";
import { specialist } from "./controller/specialistController";

export const routes = Router();

routes.use('/user', user);
routes.use('/login', login)
routes.use('/profession', profession)
routes.use('/patient', patient)
routes.use('/specialist', specialist)