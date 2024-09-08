import cors from 'cors';
import express, { Express } from "express";
import connect_to_database from "./db";
import allRoutes from "./routes";
import error_handling from './controllers/error';
import "dotenv/config";


const app: Express = express();
const port = process.env.PORT;
const server = process.env.SERVER

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"]
}));

app.use(express.json());

const StartServer_with_DB = async () => {
  try {
    await connect_to_database();
    app.listen(port, () => {
      console.log(`Example app listening on ${server}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

allRoutes(app);

app.use(error_handling);

StartServer_with_DB();
