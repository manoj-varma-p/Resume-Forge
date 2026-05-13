'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle, KeyRound } from 'lucide-react';

type Mode = 'login' | 'signup' | 'otp-request' | 'otp-verify' | 'otp-verify-signup';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const clearMessages = () => { setError(''); setSuccess(''); };

  // ── Email+Password Login ─────────────────────────────────────────────────────
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.ok) {
      router.push('/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  // ── Email+Password Signup ────────────────────────────────────────────────────
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    clearMessages();
    setLoading(true);
    try {
      // 1. Check if user exists
      const res = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup initiation failed.');

      // 2. Trigger OTP
      const otpRes = await fetch(`${API}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!otpRes.ok) throw new Error('Failed to send verification code.');

      setSuccess(`Verification code sent to ${email}`);
      setMode('otp-verify-signup');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Verify Signup OTP & Complete ─────────────────────────────────────────────
  const handleVerifySignupOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/signup-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed.');

      setSuccess('Account verified! Signing you in...');
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.ok) {
        router.push('/');
      } else {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Send OTP ─────────────────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP.');
      setSuccess(`OTP sent to ${email}. Check your inbox.`);
      setMode('otp-verify');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Verify OTP ───────────────────────────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        otp,
        redirect: false,
      });
      if (result?.error) throw new Error('Invalid or expired OTP.');

      setSuccess('Verified! Redirecting...');
      setTimeout(() => router.push('/'), 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Google/GitHub OAuth ──────────────────────────────────────────────────────
  const handleOAuth = async (provider: 'google' | 'github') => {
    clearMessages();
    setLoading(true);
    await signIn(provider, { callbackUrl: '/' });
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
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-8"
            >
              {mode === 'login' && (
                <>
                  <h2 className="text-2xl font-black text-black mb-1">Welcome back</h2>
                  <p className="text-gray-500 text-sm">Sign in to continue building your resume</p>
                </>
              )}
              {mode === 'signup' && (
                <>
                  <h2 className="text-2xl font-black text-black mb-1">Create account</h2>
                  <p className="text-gray-500 text-sm">Start building job-winning resumes today</p>
                </>
              )}
              {mode === 'otp-request' && (
                <>
                  <h2 className="text-2xl font-black text-black mb-1">Sign in with email</h2>
                  <p className="text-gray-500 text-sm">We'll send a 6-digit code to your email</p>
                </>
              )}
              {(mode === 'otp-verify' || mode === 'otp-verify-signup') && (
                <>
                  <h2 className="text-2xl font-black text-black mb-1">Check your email</h2>
                  <p className="text-gray-500 text-sm">Enter the code sent to <strong>{email}</strong></p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Error / Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-5 px-4 py-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-5 px-4 py-3 bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 shrink-0" /> {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Social Auth Buttons ──────────────────────────────────────────── */}
          {(mode === 'login' || mode === 'signup') && (
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={() => handleOAuth('google')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleOAuth('github')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-2xl py-3.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>
          )}

          {/* Divider */}
          {(mode === 'login' || mode === 'signup') && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          )}

          {/* ── Login Form ────────────────────────────────────────────────────── */}
            {mode === 'login' && (
              <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-4">
                <InputField icon={<Mail />} type="email" placeholder="Email address" value={email} onChange={setEmail} />
                <div className="space-y-2">
                  <PasswordField value={password} onChange={setPassword} show={showPassword} toggle={() => setShowPassword(v => !v)} />
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      onClick={() => { setMode('otp-request'); clearMessages(); }}
                      className="text-xs font-bold text-gray-400 hover:text-black transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                <SubmitButton loading={loading} label="Sign In" />
              </form>
            )}

          {/* ── Signup Form ───────────────────────────────────────────────────── */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <InputField icon={<Mail />} type="text" placeholder="Full name (optional)" value={name} onChange={setName} />
              <InputField icon={<Mail />} type="email" placeholder="Email address" value={email} onChange={setEmail} />
              <PasswordField value={password} onChange={setPassword} show={showPassword} toggle={() => setShowPassword(v => !v)} />
              <SubmitButton loading={loading} label="Create Account" />
            </form>
          )}

          {/* ── OTP Request Form ─────────────────────────────────────────────── */}
          {mode === 'otp-request' && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <InputField icon={<Mail />} type="email" placeholder="Email address" value={email} onChange={setEmail} />
              <SubmitButton loading={loading} label="Send OTP Code" />
            </form>
          )}

          {/* ── OTP Verify Form (Standard & Signup) ───────────────────────────── */}
          {(mode === 'otp-verify' || mode === 'otp-verify-signup') && (
            <form onSubmit={mode === 'otp-verify-signup' ? handleVerifySignupOtp : handleVerifyOtp} className="flex flex-col gap-4">
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
              <SubmitButton loading={loading} label="Verify & Complete" />
              <button type="button" onClick={() => { setMode(mode === 'otp-verify-signup' ? 'signup' : 'otp-request'); clearMessages(); }} className="text-sm text-gray-500 hover:text-black transition-colors text-center">
                ← Back
              </button>
            </form>
          )}

          {/* ── Footer Links ──────────────────────────────────────────────────── */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3 text-center text-sm text-gray-500">
            {(mode === 'login' || mode === 'signup') && (
              <button
                onClick={() => { setMode('otp-request'); clearMessages(); }}
                className="text-black font-semibold hover:underline"
              >
                Sign in with OTP (no password)
              </button>
            )}
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button onClick={() => { setMode('signup'); clearMessages(); }} className="font-semibold text-black hover:underline">Sign up</button>
              </p>
            )}
            {(mode === 'signup' || mode === 'otp-request') && (
              <p>
                Already have an account?{' '}
                <button onClick={() => { setMode('login'); clearMessages(); }} className="font-semibold text-black hover:underline">Sign in</button>
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-black">Terms</a> &{' '}
          <a href="#" className="underline hover:text-black">Privacy Policy</a>
        </p>
      </motion.div>
    </main>
  );
}

// ── Shared Input Components ───────────────────────────────────────────────────
const InputField = ({ icon, type, placeholder, value, onChange }: any) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all bg-gray-50/50"
    />
  </div>
);

const PasswordField = ({ value, onChange, show, toggle }: any) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
      <Lock className="w-5 h-5" />
    </div>
    <input
      type={show ? 'text' : 'password'}
      placeholder="Password"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-2xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all bg-gray-50/50"
    />
    <button type="button" onClick={toggle} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-black transition-colors">
      {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
);

const SubmitButton = ({ loading, label }: { loading: boolean; label: string }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-black text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_rgb(0,0,0,0.2)]"
  >
    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{label} <ArrowRight className="w-4 h-4" /></>}
  </button>
);
