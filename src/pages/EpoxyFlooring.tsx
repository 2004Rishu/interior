import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EpoxyFlooring() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=2000"
            alt="Seamless Epoxy Floor"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 to-charcoal-900/40 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block bg-sand-200/20 px-3 py-1 text-xs font-medium tracking-widest text-white backdrop-blur-sm uppercase">
              Premium Flooring Services
            </span>
            <h1 className="text-4xl font-serif text-white sm:text-5xl md:text-6xl leading-tight">
              Flawless, Durable, and Seamless.
            </h1>
            <p className="mt-6 text-lg text-sand-100 font-light max-w-xl">
              Connect with vetted epoxy flooring specialists for residential garages, interior living spaces, and commercial showrooms. Starting at ₹150 / sq.ft.
            </p>
            <div className="mt-10">
              <a
                href="#quote-form"
                className="inline-flex h-14 items-center justify-center bg-white px-8 text-sm font-medium text-charcoal-900 transition-colors hover:bg-sand-100"
              >
                Get a Free Estimate
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif md:text-4xl text-charcoal-900">Why Choose Epoxy?</h2>
            <p className="mt-4 text-sand-700 text-lg">A modern flooring solution combining industrial-grade durability with high-end aesthetic appeal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Extreme Durability', desc: 'Resistant to impacts, chemicals, stains, and heavy traffic. Built to last decades without chipping.' },
              { icon: Layers, title: 'Seamless Finish', desc: 'No grout lines or seams. A continuous, elegant surface that makes any space feel larger and cleaner.' },
              { icon: Zap, title: 'Low Maintenance', desc: 'Non-porous and incredibly easy to clean. Dust and spills wipe away effortlessly without specialized products.' }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="bg-white p-8 border border-sand-200 text-center flex flex-col items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand-100 text-charcoal-900 mb-6">
                  <benefit.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-charcoal-900 mb-3">{benefit.title}</h3>
                <p className="text-sand-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Gallery */}
      <section className="bg-sand-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-serif md:text-4xl text-charcoal-900">Versatile Applications</h2>
              <p className="mt-4 text-sand-700 text-lg">Perfect for a variety of demanding environments.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <div className="relative aspect-square overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800" alt="Commercial" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                 <h3 className="text-white text-2xl font-serif">Commercial & Retail</h3>
               </div>
             </div>
             <div className="relative aspect-square overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80&w=800" alt="Garage" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                 <h3 className="text-white text-2xl font-serif">Residential Garages</h3>
               </div>
             </div>
             <div className="relative aspect-square overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" alt="Interiors" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                 <h3 className="text-white text-2xl font-serif">Modern Interiors</h3>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="quote-form" className="py-24 md:py-32 bg-charcoal-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
             <div className="lg:col-span-2">
               <h2 className="text-3xl font-serif md:text-4xl text-white mb-6">Ready to upgrade?</h2>
               <p className="text-sand-400 mb-8">
                 Fill out the details below, and we will connect you with a vetted epoxy specialist in your area for a precise, no-obligation quote.
               </p>
               <ul className="space-y-4">
                 <li className="flex items-center text-sand-300">
                   <CheckCircle2 size={20} className="mr-3 text-sand-500" /> Vetted Professionals
                 </li>
                 <li className="flex items-center text-sand-300">
                   <CheckCircle2 size={20} className="mr-3 text-sand-500" /> Transparent Pricing
                 </li>
                 <li className="flex items-center text-sand-300">
                   <CheckCircle2 size={20} className="mr-3 text-sand-500" /> Quality Guarantee
                 </li>
               </ul>
             </div>

             <div className="lg:col-span-3 bg-white p-8 md:p-10 text-charcoal-900">
               {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mb-6">
                      <CheckCircle2 size={32} className="text-sage-700" />
                    </div>
                    <h3 className="text-2xl font-serif text-charcoal-900 mb-4">Request Sent</h3>
                    <p className="text-sand-700">
                      We're connecting you with our top local specialists. Expect a call within 24 hours.
                    </p>
                  </motion.div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-2">Name</label>
                        <input required type="text" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-2">Phone</label>
                        <input required type="tel" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal-900 mb-2">Project Location (City, State)</label>
                      <input required type="text" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-2">Space Type</label>
                        <select required className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none">
                          <option value="">Select space</option>
                          <option value="garage">Garage</option>
                          <option value="interior">Interior Floor</option>
                          <option value="commercial">Commercial/Retail</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-2">Approx. Area (sq.ft)</label>
                        <input type="number" placeholder="e.g. 500" className="block w-full border-b border-sand-300 bg-transparent py-2 focus:border-charcoal-900 focus:outline-none" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-charcoal-900 py-4 text-sm font-medium text-white transition-colors hover:bg-charcoal-800 mt-4"
                    >
                      Get Free Estimate
                    </button>
                  </form>
               )}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
