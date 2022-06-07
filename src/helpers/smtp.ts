import { createTransport } from 'nodemailer'

interface SMTP {
  host: string,
  port: number,
  secure: boolean,
  auth: {
    user: string,
    pass: string
  },
  tls: {
    rejectUnauthorized: boolean
  }
}

const config: SMTP = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'igorcbraz1@gmail.com',
    pass: 'Igor1417'
  },
  tls: {
    rejectUnauthorized: false
  }
}

export const transporter = createTransport(config);