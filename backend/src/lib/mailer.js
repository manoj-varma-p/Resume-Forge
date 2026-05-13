const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an OTP email to the given address.
 */
async function sendOtpEmail(email, otp) {
  await transporter.sendMail({
    from: `"Resume Forge" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Resume Forge Verification Code',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; font-weight: 900; color: #000; margin: 0;">Resume <span style="color: #6b7280;">Forge</span></h1>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #111; margin-bottom: 8px;">Your verification code</h2>
        <p style="color: #6b7280; font-size: 15px; margin-bottom: 24px;">Enter this code to verify your email address. It expires in 10 minutes.</p>
        <div style="text-align: center; background: #f9fafb; border: 2px dashed #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <span style="font-size: 40px; font-weight: 900; letter-spacing: 8px; color: #000;">${otp}</span>
        </div>
        <p style="color: #9ca3af; font-size: 13px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendOtpEmail };
