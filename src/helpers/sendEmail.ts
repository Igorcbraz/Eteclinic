import { transporter } from './smtp'

export function sendEmail(email: string, newPassword: string){
  transporter.sendMail({
    subject: 'Redefinição de senha - Eteclinic',
    from: 'Suport Eteclinic <igorcbraz1@gmail.com>',
    to: `${email}`,
    html: `
      <html>
        <body>
        <p>Olá tudo bem ?</p>
        </body>
      </html>
    `
  });
}