import express, { Request, Response } from "express";
import { body, validationResult} from 'express-validator'

import { insertAdress } from "../service/adessService";
import { insertSpecialist } from "../service/specialistService";

export const specialist = express.Router()

specialist.post('/', async (req: Request, res: Response) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const { cep, rua, numero, bairro, cidade, estado } = req.body
  const { code, msg } = await insertAdress({ cep, rua, numero, bairro, cidade, estado })

  if(code === 1){
    const {registro, nome_especialista, telefone_especialista,
        celular_especialista, email_especialista, 
        FK_id_endereco, FK_id_profissao} = req.body

    const { code, msg } = await insertSpecialist({ registro, nome_especialista, telefone_especialista,
                                       celular_especialista, email_especialista, 
                                       FK_id_endereco, FK_id_profissao })

    if(code === 1){
        res.status(200).json({ message:`${nome_especialista} e endreço ${cep} foram cadastrados ` })
    } else {
        res.status(400).json({msg});
    }
  } else {
    res.status(400).json({msg});
  }
})
