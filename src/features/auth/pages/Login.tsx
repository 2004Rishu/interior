import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate lookup - Default to client if testing
    // In a real app, backend determines role based on phone number
    login({
      id: Math.random().toString(36).substr(2, 9),
      name: 'Welcome Back',
      phone: phone,
      role: 'client', // mocking as client for demo
    });
    
    navigate('/dashboard/client');
  };

  const handleGoogleLogin = () => {
    login({
      id: Math.random().toString(36).substr(2, 9),
      name: 'Google User',
      phone: '',
      email: 'user@gmail.com',
      role: 'client',
    });
    navigate('/dashboard/client');
  };

  return (
    <div className="flex min-h-[85vh] flex-col bg-sand-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-10 text-center">
          <Link to="/" className="text-2xl font-serif tracking-tight text-charcoal-900">
            Interior Me
          </Link>
          <h1 className="mt-8 text-3xl font-serif text-charcoal-900">Welcome back</h1>
        </div>

        <div className="bg-white p-8 md:p-10 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none placeholder:text-sand-400"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-charcoal-900 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-800"
                  >
                    Send Login Code
                  </button>

                  <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-sand-200"></div>
                    <span className="flex-shrink-0 mx-4 text-sand-400 text-xs uppercase tracking-widest">Or</span>
                    <div className="flex-grow border-t border-sand-200"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full border border-sand-200 bg-white py-3 text-sm font-medium text-charcoal-900 transition-colors hover:bg-sand-50 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Log in with Google
                  </button>
                  
                  <div className="pt-4 text-center text-sm text-sand-600">
                    Don't have an account? <Link to="/signup" className="font-medium text-charcoal-900 hover:underline">Sign up</Link>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-serif text-charcoal-900">Enter your code</h2>
                  <p className="mt-2 text-sm text-sand-600">
                    Sent to {phone}. <button onClick={() => setStep(1)} className="underline hover:text-charcoal-900">Change number</button>
                  </p>
                </div>
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="000000"
                      className="w-full border-b border-sand-300 bg-transparent py-4 text-center text-3xl tracking-[1em] text-charcoal-900 focus:border-charcoal-900 focus:outline-none"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-charcoal-900 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-800"
                  >
                    Verify & Log In
                  </button>
                  <div className="text-center">
                    <button type="button" className="text-sm font-medium text-sand-500 hover:text-charcoal-900">
                      Resend Code
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
