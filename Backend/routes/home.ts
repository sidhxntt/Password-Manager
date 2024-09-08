// routes/index.mjs
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

// Serve favicon.ico to prevent CastError
router.get("/favicon.ico", (req: Request, res: Response) =>
  res.status(204).end()
);

export default router;
