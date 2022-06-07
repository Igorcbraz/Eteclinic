import express, { Request, Response } from "express";
import { loginUser, reset } from "../service/loginService"
import { generatedPassword } from '../helpers/resetPassword'
import { sendEmail } from "../helpers/sendEmail";

export const login = express.Router();

login.post('/', async(req: Request, res: Response) => {
  const { email, password } = req.body;

  const validatedUser = await loginUser(email, password);

  if(validatedUser.value){
    res.status(200).json({message: 'Login efetuado com sucesso'})
  } else {
    res.status(401).json({message: 'Login ou senha inválido'})
  }
})

login.post('/reset', async(req: Request, res: Response) => {
  const { email } = req.body;
  const password = generatedPassword()

  const validatedReser = await reset(email, password);

  if(validatedReser.value){
    sendEmail(email, password)

    res.status(200).json({message: 'Senha alterada com sucesso'})
  } else {
    res.status(401).json({message: 'Erro ao alterar a senha'})
  }
})