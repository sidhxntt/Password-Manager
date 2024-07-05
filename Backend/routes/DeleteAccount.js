// server.js or your main server file
import express from "express";
import decryptJWT from "../controllers/Decryption.js";
const router = express.Router();
import prisma from "../prisma/prisma.js";

router.delete("/", decryptJWT, async (req, res, next) => {
 try {
    const {sub} = req.user
    const account = await prisma.account.delete({where: {userId: sub}})
    if(!account){
        return res.status(404).send({message: "Account doesn't exists "})
    }
    res.status(202).send({message: "Account successfully deleted"})
 } catch (error) {
    next()
 }
});

export default router;