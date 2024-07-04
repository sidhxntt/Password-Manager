// server.js or your main server file
import express from 'express';
import decryptJWT from '../controllers/Decryption.js';
const router = express.Router();
import prisma from '../prisma/prisma.js';

router.post('/', decryptJWT, (req, res) => {
  try {
    const user = req.user;
    console.log('Decoded User:', user);

    const data = req.body;
    console.log('Request Data:', data);

    // Example: Save account data to database or perform other operations
    // Replace with your actual logic here

    res.status(200).send('Account added successfully');
  } catch (error) {
    console.error('Error adding account:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
