import decryptJWT, { JwtPayload } from "../controllers/Decryption";
import prisma from "../../prisma/prisma";
import express, { Request, Response, NextFunction, Router } from "express";

const router: Router = express.Router();
interface UserReq extends Request {
  user?: JwtPayload;
}

router.get("/", decryptJWT, async (req: UserReq, res: Response, next: NextFunction) => {
  try {
    if (!(req.user)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { sub } = req.user;
    const user = await prisma.user.findUnique({
      where: { userID: sub },
      select: { first_name: true, profile_pic: true },
    });
    if (!user) {
      return res.status(404).send({ message: "No User exists" });
    }
    res.json(user);
  } catch (error) {
    next(error)
  }
});

export default router;