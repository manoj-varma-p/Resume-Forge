require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/auth', authRouter);

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`✅  Resume Forge API running on http://localhost:${PORT}`);
  
  // Database Connection Check
  try {
    const prisma = require('./lib/prisma');
    await prisma.$connect();
    console.log('✅  Database connected successfully');
  } catch (err) {
    /** @type {any} */
    const error = err;
    console.error('❌  Database connection failed:', error.message);
    console.error('    Check your DATABASE_URL in the .env file and ensure your project is active.');
  }
});
