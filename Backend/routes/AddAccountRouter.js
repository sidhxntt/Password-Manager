// accountRoutes.js
import express from "express";
import decryptJWT from "../controllers/Decryption.js";
import prisma from "../prisma/prisma.js";

const router = express.Router();

router.post("/", decryptJWT, async (req, res, next) => {
  try {
    const {
      sub,
      first_name,
      last_name,
      full_name,
      primary_email,
      profile_pic,
      createdAt,
      updatedAt,
    } = req.user;
    const { name, websiteLink, Username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { userID: sub },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          userID: sub,
          first_name,
          last_name,
          full_name,
          primary_email,
          profile_pic,
          createdAt,
          updatedAt,
        },
      });
    }

    const existingAccount = await prisma.account.findFirst({
      where: {
        OR: [{ name: name }, { website_link: websiteLink }],
      },
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          name,
          website_link: websiteLink,
          username: Username,
          password,
          userId: sub,
        },
      });
      res.status(201).send({ message: "Account created successfully" });
    } else {
      res.status(400).send({ message: "This account is already saved. Please enter a new one" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
