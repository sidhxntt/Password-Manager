// server.js or your main server file
import express from "express";
import decryptJWT from "../controllers/Decryption.js";
const router = express.Router();
import prisma from "../prisma/prisma.js";

router.post("/", decryptJWT, async (req, res, next) => {
  try {
    const {
      sub,
      first_name,
      last_name,
      full_name,
      username,
      primary_email,
      primary_phone_number,
      profile_pic,
      createdAt,
      updatedAt,
    } = req.user;
    const { name, websiteLink, Username, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { userID: sub },
    });
    
    if (!existingUser) {
      // Create the user if it doesn't exist
      existingUser = await prisma.user.create({
        data: {
          userID: sub,
          first_name,
          last_name,
          full_name,
          username,
          primary_email,
          primary_phone_number,
          profile_pic,
          createdAt,
          updatedAt,
        },
      });
    }

    // Check if the account already exists
    const existingAccount = await prisma.account.findFirst({
      where: {
        OR: [{ name: name }, { website_link: websiteLink }],
      },
    });

    if (!existingAccount) {
      // Create the account if it doesn't exist
      await prisma.account.create({
        data: {
          name,
          website_link: websiteLink,
          username: Username,
          password,
          userId: existingUser.userID,
        },
      });
      console.log("Account created successfully")
      res.status(201).send({ message: "Account created successfully" });
    } else {
      res.status(400).send({ message: "This account is already saved. Please enter a new one" });
    }
  } catch (error) {
    next()
  }
});

export default router;