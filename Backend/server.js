import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import connect_to_database from './db.js';
import allRoutes from './routes/index.js';
import error_handling from './controllers/error.js';

const app = express();
const port = 8080;

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
      console.log(`Example app listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Use the routers
allRoutes(app);

// Error handling middleware
app.use(error_handling);

StartServer_with_DB();
