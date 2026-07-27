import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sofa } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google verification successful:', tokenResponse);
      
      // We consider the Google Auth as a success for Verification
      login({
        id: Math.random().toString(36).substring(7),
        name,
        phone,
        role: 'client',
        status: 'approved'
      });
      setIsProcessing(false);
      closeLoginModal();
    },
    onError: (errorResponse) => {
      console.error('Google verification failed:', errorResponse);
      setError('Google verification blocked or failed. Please check your browser popup blocker or console for details.');
      setIsProcessing(false);
    }
  });

  const handleGoogleVerify = () => {
    if (!name.trim() || !phone.trim()) {
      setError('Please provide your name and phone number to continue.');
      return;
    }
    
    // Basic phone validation (at least 10 digits)
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setError('');
    setIsProcessing(true);
    
    // Trigger the real Google OAuth popup
    loginWithGoogle();
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLoginModal}
            className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md z-10"
          >
            <div className="bg-white p-8 shadow-2xl overflow-hidden rounded-2xl border border-gray-100">
              <button
                onClick={closeLoginModal}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-900 mb-4 shadow-lg">
                  <Sofa className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-serif text-charcoal-900">Welcome to Interior Me</h2>
                <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                  Please verify your details to access premium features and get your live cost estimate.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal-900 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:border-charcoal-900 focus:ring-1 focus:ring-charcoal-900 outline-none transition-all text-charcoal-900 placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal-900 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:border-charcoal-900 focus:ring-1 focus:ring-charcoal-900 outline-none transition-all text-charcoal-900 placeholder-gray-400"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleGoogleVerify}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-charcoal-900 font-medium hover:bg-gray-50 transition-all shadow-sm disabled:opacity-70"
                >
                  {isProcessing ? (
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Verify & Continue with Google
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-6 text-center text-xs text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
