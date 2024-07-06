// server.js or your main server file
import express from "express";
import decryptJWT from "../controllers/Decryption.js";
import prisma from "../prisma/prisma.js";

const router = express.Router();

router.get("/", decryptJWT, async (req, res, next) => {
  try {
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
    next()
  }
});

export default router;