import express, { Request, Response } from "express";
import { loginUser } from "../service/loginService"

export const login = express.Router();

login.post('/', async(req: Request, res: Response) => {
  const { email, password } = req.body;

  const validatedUser = await loginUser(email, password);

  if(validatedUser.code === 1){
    const [name1, name2] = email.split("@")
    res.status(200).json({
      message: `Seja bem-vindo ${name1}!`
    })
  } else {
    res.status(401).json({
      message: `Login e/ou senha inválido(s)`
    })
  }
})
