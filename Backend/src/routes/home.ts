import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

// Serve favicon.ico to prevent CastError
router.get("/favicon.ico", (req: Request, res: Response) =>
  res.status(204).end()
);

router.get("/", (req: Request, res: Response) =>
  res.status(200).json({message: "Checking done"})
);



export default router;
