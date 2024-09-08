import decryptJWT, { JwtPayload } from "../controllers/Decryption";
import prisma from "../../prisma/prisma";
import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
interface UserReq extends Request {
  user?: JwtPayload;
}

router.get(
  "/",
  decryptJWT,
  async (req: UserReq, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { sub } = req.user;
      const account = await prisma.account.findMany({ where: { userId: sub } });
      if (!account) {
        return res.status(404).send({ message: "No Accounts added" });
      }
      res.json(account);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
