import decryptJWT, { JwtPayload } from "../controllers/Decryption";
import prisma from "../../prisma/prisma";
import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
interface UserReq extends Request {
  user?: JwtPayload;
}
router.patch("/:id", decryptJWT, async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    if (!(req.user)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { sub } = req.user;
    const { password } = req.body;
    const { id } = req.params;
    const account = await prisma.account.update({
      where: {
        id: parseInt(id, 10),
        userId: sub,
      },
      data: {
        password,
      },
    });
    if (!account) {
      return res.status(404).send({ message: "No Accounts Found" });
    }
    res.json(account);
    console.log("Password updated");
  } catch (error) {
    next(error);
  }
});

export default router;