import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function ShopWaitlist() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-[85vh] flex-col bg-sand-50">
      <div className="flex flex-1 items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block bg-sand-200 px-3 py-1 text-xs font-medium tracking-widest text-charcoal-800 uppercase">
              Coming Soon
            </span>
            <h1 className="text-4xl font-serif text-charcoal-900 sm:text-5xl mb-6">
              Shop Your Interior
            </h1>
            <p className="text-lg text-sand-700 leading-relaxed mb-12">
              We're building an exclusive marketplace for premium furniture and decor, curated by our network of designers. Join the waitlist to get early access.
            </p>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 border border-sand-200 flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-700 mb-4">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-serif text-charcoal-900 mb-2">You're on the list</h3>
                <p className="text-sand-600 text-sm">
                  We'll notify you as soon as our curated shop goes live.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  className="w-full sm:w-auto flex-1 border-b border-sand-300 bg-transparent px-4 py-3 text-charcoal-900 focus:border-charcoal-900 focus:outline-none transition-colors"
                />
                <button 
                  type="submit"
                  className="bg-charcoal-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-800 whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Blurred preview of shop */}
      <div className="w-full overflow-hidden border-t border-sand-200 bg-white py-12 opacity-40 blur-[2px] select-none pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 flex gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-64 shrink-0">
              <div className="aspect-square bg-sand-200 mb-4 rounded-sm"></div>
              <div className="h-4 w-3/4 bg-sand-300 mb-2 rounded-sm"></div>
              <div className="h-4 w-1/4 bg-sand-200 rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
