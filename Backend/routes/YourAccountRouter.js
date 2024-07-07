// server.js or your main server file
import express from "express";
import decryptJWT from "../controllers/Decryption.js";
const router = express.Router();
import prisma from "../prisma/prisma.js";

router.get("/", decryptJWT, async (req, res, next) => {
 try {
    const {sub} = req.user
    const account = await prisma.account.findMany({where: {userId: sub}})
    if(!account){
        return res.status(404).send({message: "No Accounts added"})
    }
    res.json(account)
 } catch (error) {
    next(error)
 }
});

export default router;