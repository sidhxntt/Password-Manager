// routes/index.mjs
import express from 'express';
const router = express.Router();

// Serve favicon.ico to prevent CastError
router.get("/favicon.ico", (req, res) => res.status(204).end());

router.get("/", (req, res) => {
  res.send("HOME PAGE");
});

export default router;