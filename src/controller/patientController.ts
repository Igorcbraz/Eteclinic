import express, { Request, Response } from "express";
import { validationResult } from 'express-validator'

export const patient = express.Router();

patient.post('/', async(req: Request, res: Response) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({message: errors.array()});
  }

  const {cep, rua, numero, bairro, cidade, estado} = req.body;
  const validatedAdress = await insertAdress(cep, rua, numero, bairro, cidade, estado)

  const {cpf, nome_cliente, telefone_cliente, celular_cliente, email_cliente,tipo_sanguineo, FK_id_endereco} = req.body;
  const validatedPatient =  await insertPatient(cpf, nome_cliente, telefone_cliente, celular_cliente, email_cliente,tipo_sanguineo, FK_id_endereco)

  if(validatedAdress.value && validatedPatient.value){
    res.status(201).json({message:
      `${nome_cliente} e endreço ${cep} foram cadastrados `
    })  
  } else {
    res.status(401).json({message: 'Erro ao inserir o paciente'})
  }
})