// server.js or your main server file
import express from "express";
import decryptJWT from "../controllers/Decryption.js";
import prisma from "../prisma/prisma.js";
const router = express.Router();

router.patch("/:id", decryptJWT, async (req, res, next) => {
  try {
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