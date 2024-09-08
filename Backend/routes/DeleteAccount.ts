import decryptJWT, { JwtPayload } from "../controllers/Decryption.js";
import prisma from "../prisma/prisma.js";
import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();

interface UserReq extends Request {
  user?: JwtPayload;
}


router.delete("/:id", decryptJWT, async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    if (!(req.user)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { sub } = req.user;
    const { id } = req.params;

    const account = await prisma.account.delete({
      where: {
        id: parseInt(id, 10),
        userId: sub,
      },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(202).send({ message: "Account successfully deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
