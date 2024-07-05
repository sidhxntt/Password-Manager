// server.js or your main server file
import express from "express";
import decryptJWT from "../controllers/Decryption.js";
import prisma from "../prisma/prisma.js";

const router = express.Router();

router.delete("/:id", decryptJWT, async (req, res, next) => {
  try {
    const { sub } = req.user; // Ensure decryptJWT middleware populates req.user
    const { id } = req.params;

    const account = await prisma.account.delete({
      where: {
        id: parseInt(id, 10), // Ensure id is parsed as an integer
        userId: sub,
      },
    });

    res.status(202).send({ message: "Account successfully deleted" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).send({ message: "Account doesn't exist" });
    }
    next(error); // Pass the error to the next middleware
  }
});

export default router;