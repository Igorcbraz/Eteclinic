import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';

config(); // Using .env variables

export async function connect() {
  const connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    })
  return connection
}