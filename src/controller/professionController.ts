import express, { Request, Response } from "express";
import { insertProfession } from "../service/professionService";

import { body, validationResult } from "express-validator";

export const profession = express.Router()

profession.post('/',[
  body('professionName').notEmpty().withMessage('Nome da profissão não informado')
] ,async (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const { professionName } = req.body;
  const { code, msg } = await insertProfession(professionName);

  if(code === 1){
    res.status(201).json({msg});
  } else {
    res.status(400).json({msg});
  }
})

