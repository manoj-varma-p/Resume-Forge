'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Loader2, CheckCircle, KeyRound } from 'lucide-react';

type Mode = 'otp-request' | 'otp-verify';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('otp-request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle URL errors (e.g. from NextAuth redirect)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    if (errorParam) {
      setError(`Authentication error: ${errorParam}`);
    }
  }, []);

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const clearMessages = () => { setError(''); setSuccess(''); };

  // ── Send Email OTP ──────────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    clearMessages();
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send verification code.');

      setSuccess(`Verification code sent to ${email}`);
      setMode('otp-verify');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Verify Email OTP ────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the verification code.');
      return;
    }
    clearMessages();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        otp,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error('Invalid or expired verification code.');
      }

      setSuccess('Verified! Redirecting...');
      setTimeout(() => router.push('/'), 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Google OAuth ───────────────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    clearMessages();
    setLoading(true);
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center p-4 font-sans">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} 
      />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-block">
            <h1 className="text-3xl font-black text-black tracking-tight">
              Resume <span className="text-gray-400">Forge</span>
            </h1>
          </a>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-10">
          
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-black mb-1">
              {mode === 'otp-request' ? 'Sign in' : 'Verify Code'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'otp-request' 
                ? 'Use your email or Google to continue' 
                : `Enter the 6-digit code sent to ${email}`}
            </p>
          </div>

          {/* Error / Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-5 px-4 py-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-5 px-4 py-3 bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4 shrink-0" /> {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Google Login ────────────────────────────────────────────────── */}
          {mode === 'otp-request' && (
            <>
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* ── Email OTP Request Form ──────────────────────────────────── */}
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all bg-gray-50/50"
                    required
                  />
                </div>
                <SubmitButton loading={loading} label="Send Code" />
              </form>
            </>
          )}

          {/* ── Email OTP Verify Form ───────────────────────────────────────── */}
          {mode === 'otp-verify' && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl text-base tracking-[0.3em] text-center font-bold text-black focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all bg-gray-50/50"
                  required
                />
              </div>
              <SubmitButton loading={loading} label="Verify & Login" />
              <button 
                type="button" 
                onClick={() => { setMode('otp-request'); clearMessages(); }} 
                className="text-sm text-gray-500 hover:text-black transition-colors text-center"
              >
                ← Back to email
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 px-10 leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-black">Terms</a> &{' '}
          <a href="#" className="underline hover:text-black">Privacy Policy</a>
        </p>
      </motion.div>
    </main>
  );
}

const SubmitButton = ({ loading, label }: { loading: boolean; label: string }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-black text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_rgb(0,0,0,0.2)]"
  >
    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{label} <ArrowRight className="w-4 h-4" /></>}
  </button>
);
