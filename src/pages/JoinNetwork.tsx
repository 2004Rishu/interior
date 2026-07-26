import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function JoinNetwork() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="bg-charcoal-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-serif sm:text-5xl md:text-6xl text-white">Grow your design practice.</h1>
            <p className="mt-6 text-xl text-sand-400 font-light max-w-2xl">
              Join our vetted network of premium interior designers. We connect you with high-intent clients whose style and budget align perfectly with your expertise.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            
            {/* Value Prop */}
            <div>
              <h2 className="text-3xl font-serif text-charcoal-900 mb-8">Why Interior Me?</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-charcoal-900">Pre-Qualified Leads</h3>
                  <p className="mt-2 text-sand-700">We do the heavy lifting of vetting clients, budgets, and project scope before they ever reach your inbox.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-charcoal-900">No Upfront Costs</h3>
                  <p className="mt-2 text-sand-700">Joining our network is free. We only earn a transparent commission when you secure a signed contract.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-charcoal-900">Focus on Design</h3>
                  <p className="mt-2 text-sand-700">Spend less time marketing and more time doing what you do best: creating beautiful spaces.</p>
                </div>
              </div>

              <div className="mt-12 bg-sand-100 p-8">
                <h3 className="font-serif text-xl text-charcoal-900 mb-4">The Review Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-sand-700">
                  <li>Submit your portfolio and details.</li>
                  <li>Our curation team reviews your work.</li>
                  <li>Brief interview to understand your ideal client.</li>
                  <li>Welcome to the network.</li>
                </ol>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-12 text-center shadow-sm"
                >
                   <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mb-6">
                    <Check size={32} className="text-sage-700" />
                  </div>
                  <h3 className="text-2xl font-serif text-charcoal-900 mb-4">Application Received</h3>
                  <p className="text-sand-700">
                    Thank you for applying to join Interior Me. Our curation team will review your portfolio and be in touch within 3-5 business days.
                  </p>
                </motion.div>
              ) : (
                <div className="bg-white p-8 md:p-12 shadow-sm">
                  <h2 className="text-2xl font-serif text-charcoal-900 mb-8">Apply to Join</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                       <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-1">First Name</label>
                        <input required type="text" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-1">Last Name</label>
                        <input required type="text" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal-900 mb-1">Email Address</label>
                      <input required type="email" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                    </div>

                     <div>
                      <label className="block text-sm font-medium text-charcoal-900 mb-1">City & State</label>
                      <input required type="text" placeholder="Where are you based?" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-900 mb-1">Portfolio URL</label>
                      <input required type="url" placeholder="https://" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-900 mb-1">Years of Experience</label>
                      <select required className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none">
                        <option value="">Select range</option>
                        <option value="1-3">1-3 years</option>
                        <option value="4-7">4-7 years</option>
                        <option value="8-12">8-12 years</option>
                        <option value="12+">12+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-900 mb-1">Primary Design Styles (comma separated)</label>
                      <input required type="text" placeholder="Modern, Minimalist, Transitional..." className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-charcoal-900 py-4 text-sm font-medium text-white transition-colors hover:bg-charcoal-800 mt-4"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
