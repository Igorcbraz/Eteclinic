import { Router }  from "express";

import { user } from './controller/userController'
import { login } from "./controller/loginController";
import { profession } from "./controller/professionController";

export const routes = Router();

routes.use('/user', user);
routes.use('/login', login)
routes.use('/profession', profession)