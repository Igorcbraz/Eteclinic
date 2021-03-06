import express, { Request, Response } from "express";
import { insertUser } from "../service/userService";
import { body, validationResult } from "express-validator";

export const user = express.Router()

user.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "Funfou o get"
  })
})

user.post('/',[
  body('email').isEmail().withMessage('Email informado é inválido')
] ,async (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const { email, password, user } = req.body;
  const { code, msg } = await insertUser({email, password, user});

  if(code === 1){
    res.status(201).json({msg});
  } else {
    res.status(400).json({msg});
  }
})

