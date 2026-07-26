import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function StartProject() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    roomType: '',
    budget: '',
    city: '',
    name: '',
    email: '',
    phone: '',
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    setStep(4);
  };

  return (
    <div className="min-h-[80vh] bg-sand-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif text-charcoal-900">Start Your Project</h1>
          <p className="mt-4 text-sand-700">Tell us about your space. Free consultation, no obligation.</p>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="mb-12 flex items-center justify-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  step >= i ? 'bg-charcoal-900 text-white' : 'bg-sand-200 text-sand-500'
                }`}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={`mx-2 h-[1px] w-12 ${step > i ? 'bg-charcoal-900' : 'bg-sand-200'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white p-8 md:p-12 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-serif text-charcoal-900">What type of project are you looking for?</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {['Full Interior', 'Consultation', 'Epoxy Flooring'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`border p-6 text-left transition-all ${
                        formData.projectType === type 
                          ? 'border-charcoal-900 bg-sand-50' 
                          : 'border-sand-200 hover:border-sand-400'
                      }`}
                    >
                      <div className="flex h-full items-center justify-between">
                        <span className="font-medium text-charcoal-900">{type}</span>
                        {formData.projectType === type && <Check size={18} className="text-charcoal-900" />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-6">
                  <button
                    onClick={nextStep}
                    disabled={!formData.projectType}
                    className="inline-flex items-center bg-charcoal-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-serif text-charcoal-900">Tell us about the space.</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Room Type</label>
                    <input
                      type="text"
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      placeholder="e.g. Master Bedroom, Garage, Full House"
                      className="block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">City & State</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Austin, TX"
                      className="block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0"
                    >
                      <option value="" disabled>Select a range</option>
                      <option value="under_5k">Under $5,000</option>
                      <option value="5k_20k">$5,000 - $20,000</option>
                      <option value="20k_50k">$20,000 - $50,000</option>
                      <option value="50k_plus">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={prevStep}
                    className="inline-flex items-center text-sm font-medium text-sand-600 hover:text-charcoal-900"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!formData.roomType || !formData.city || !formData.budget}
                    className="inline-flex items-center bg-charcoal-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-serif text-charcoal-900">How can we reach you?</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0"
                    />
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center text-sm font-medium text-sand-600 hover:text-charcoal-900"
                    >
                      <ArrowLeft size={16} className="mr-2" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.name || !formData.email}
                      className="inline-flex items-center bg-charcoal-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Request <Check size={16} className="ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mb-6">
                  <Check size={32} className="text-sage-700" />
                </div>
                <h2 className="text-3xl font-serif text-charcoal-900 mb-4">Request Received</h2>
                <p className="text-sand-700 max-w-md mx-auto">
                  Thank you for sharing your vision with us. Our curation team is reviewing your details and will reach out within 24 hours with your tailored matches.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
