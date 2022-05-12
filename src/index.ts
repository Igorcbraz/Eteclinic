import express  from "express";
import { routes }  from "./routes";
import { config } from 'dotenv'

const app = express();

config(); //Using .env variables
const port = process.env.PORT;

app.use(express.json())

app.use('/', routes)

app.listen(port, () => console.log(`Server is running on port ${port} 🚀`))

