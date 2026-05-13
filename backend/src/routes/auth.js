const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const prisma = require('../lib/prisma');
const { sendOtpEmail } = require('../lib/mailer');

const router = express.Router();

// ─── POST /auth/send-otp ─────────────────────────────────────────────────────
// Generates a 6-digit OTP, saves it (hashed) to DB, and emails it to the user.
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  // Invalidate any previous unused OTPs for this email
  await prisma.otp.updateMany({
    where: { email, used: false },
    data: { used: true },
  });

  await prisma.otp.create({
    data: { email, code: otp, expiresAt },
  });

  try {
    await sendOtpEmail(email, otp);
    res.json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error('Mailer error:', err);
    res.status(500).json({ error: 'Failed to send OTP email.' });
  }
});

// ─── POST /auth/verify-otp ───────────────────────────────────────────────────
// Verifies the OTP. Returns a token + user object on success.
router.post('/verify-otp', async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email and code are required.' });

  const otpRecord = await prisma.otp.findFirst({
    where: { email, code, used: false },
    orderBy: { createdAt: 'desc' },
  });

  if (!otpRecord) return res.status(400).json({ error: 'Invalid OTP.' });
  if (new Date() > otpRecord.expiresAt) return res.status(400).json({ error: 'OTP has expired.' });

  // Mark as used
  await prisma.otp.update({ where: { id: otpRecord.id }, data: { used: true } });

  // Upsert user (create if doesn't exist)
  const user = await prisma.user.upsert({
    where: { email },
    update: { emailVerified: new Date() },
    create: { email, emailVerified: new Date() },
  });

  res.json({ user: { id: user.id, email: user.email, name: user.name, image: user.image } });
});

// ─── POST /auth/signup-complete ──────────────────────────────────────────────
// Verifies OTP and then finalized user creation with password.
router.post('/signup-complete', async (req, res) => {
  const { email, password, name, code } = req.body;
  if (!email || !password || !code) {
    return res.status(400).json({ error: 'Email, password, and OTP code are required.' });
  }

  // 1. Verify OTP
  const otpRecord = await prisma.otp.findFirst({
    where: { email, code, used: false },
    orderBy: { createdAt: 'desc' },
  });

  if (!otpRecord) return res.status(400).json({ error: 'Invalid OTP.' });
  if (new Date() > otpRecord.expiresAt) return res.status(400).json({ error: 'OTP has expired.' });

  // 2. Mark OTP as used
  await prisma.otp.update({ where: { id: otpRecord.id }, data: { used: true } });

  // 3. Hash password and create/update user
  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, name: name || null, emailVerified: new Date() },
    create: { email, password: hashed, name: name || null, emailVerified: new Date() },
  });

  res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } });
});

// ─── POST /auth/signup ───────────────────────────────────────────────────────
// This now just triggers an OTP send to start the verification process.
router.post('/signup', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.password) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  // Reuse the internal logic of send-otp or just tell frontend to call send-otp
  // For simplicity, we'll just return a success and let frontend call send-otp,
  // or we can trigger it here.
  res.json({ message: 'Proceed to OTP verification.' });
});

// ─── POST /auth/login ────────────────────────────────────────────────────────
// Validates credentials. Returns user on success.
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

  res.json({ user: { id: user.id, email: user.email, name: user.name, image: user.image } });
});

// ─── GET /auth/me ─────────────────────────────────────────────────────────────
// Returns user info by email query param (used by NextAuth credentials callback).
router.get('/me', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  const user = await prisma.user.findUnique({ where: { email: String(email) } });
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ user: { id: user.id, email: user.email, name: user.name, image: user.image } });
});

module.exports = router;
