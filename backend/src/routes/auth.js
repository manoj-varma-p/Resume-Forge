const express = require('express');
const prisma = require('../lib/prisma');
const { sendOtpEmail } = require('../lib/mailer');

const router = express.Router();

// ─── POST /auth/send-otp ─────────────────────────────────────────────────────
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

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
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
router.post('/verify-otp', async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email and code are required.' });

  const otpRecord = await prisma.otp.findFirst({
    where: { email, code, used: false },
    orderBy: { createdAt: 'desc' },
  });

  if (!otpRecord) return res.status(400).json({ error: 'Invalid OTP.' });
  if (new Date() > otpRecord.expiresAt) return res.status(400).json({ error: 'OTP has expired.' });

  await prisma.otp.update({ where: { id: otpRecord.id }, data: { used: true } });

  const user = await prisma.user.upsert({
    where: { email },
    update: { emailVerified: new Date() },
    create: { email, emailVerified: new Date() },
  });

  res.json({ user: { id: user.id, email: user.email, name: user.name, image: user.image } });
});

// ─── POST /auth/social-sync ──────────────────────────────────────────────────
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
router.post('/social-sync', async (req, res) => {
  const { email, name, image } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { 
        name: name || undefined, 
        image: image || undefined,
        emailVerified: new Date()
      },
      create: { 
        email, 
        name: name || null, 
        image: image || null,
        emailVerified: new Date() 
      },
    });

    res.json({ user: { id: user.id, email: user.email, name: user.name, image: user.image } });
  } catch (err) {
    console.error('Social sync error:', err);
    res.status(500).json({ error: 'Failed to sync social user.' });
  }
});

// ─── GET /auth/me ─────────────────────────────────────────────────────────────
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
router.get('/me', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  const user = await prisma.user.findUnique({ where: { email: String(email) } });
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ user: { id: user.id, email: user.email, name: user.name, image: user.image } });
});

module.exports = router;
