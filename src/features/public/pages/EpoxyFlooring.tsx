import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function EpoxyFlooring() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background">
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
              <Button asChild size="lg" className="px-8 bg-white text-charcoal-900 hover:bg-sand-100">
                <a href="#quote-form">Get a Free Estimate</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif md:text-4xl text-foreground">Why Choose Epoxy?</h2>
            <p className="mt-4 text-muted-foreground text-lg">A modern flooring solution combining industrial-grade durability with high-end aesthetic appeal.</p>
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
                className="bg-card p-8 border border-border text-center flex flex-col items-center shadow-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground mb-6">
                  <benefit.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif md:text-4xl text-foreground">Transparent Pricing</h2>
            <p className="mt-4 text-muted-foreground text-lg">Select a package that fits your space and budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Standard Solid', price: '₹150/sq.ft', desc: 'Durable solid color epoxy perfect for basic garage or storage spaces.', features: ['Solid color finish', 'Light UV protection', '2-year warranty'] },
              { name: 'Premium Flake', price: '₹250/sq.ft', desc: 'Decorative flake system offering high slip-resistance and aesthetic appeal.', features: ['Full broadcast flake', 'High UV resistance', '5-year warranty', 'Slip-resistant texture'], popular: true },
              { name: 'Metallic Luxury', price: '₹400/sq.ft', desc: 'High-end artisan finish that mimics marble or natural stone.', features: ['Custom metallic pigments', 'Mirror-like high gloss', '10-year warranty', 'Premium topcoat'] }
            ].map((pkg, idx) => (
              <Card key={idx} className={pkg.popular ? 'border-primary ring-2 ring-primary relative' : ''}>
                {pkg.popular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                    <Badge variant="default">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle>{pkg.name}</CardTitle>
                  <p className="text-3xl font-serif mt-4 text-foreground">{pkg.price}</p>
                  <p className="text-muted-foreground text-sm mt-2">{pkg.desc}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mt-6">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-primary mr-2 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button variant={pkg.popular ? 'primary' : 'outline'} className="w-full" asChild>
                    <a href="#quote-form">Select {pkg.name}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Gallery */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-serif md:text-4xl text-foreground">Versatile Applications</h2>
              <p className="mt-4 text-muted-foreground text-lg">Perfect for a variety of demanding environments.</p>
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

             <div className="lg:col-span-3 bg-card p-8 md:p-10 text-foreground border border-border">
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
                      <Input required type="text" placeholder="Name" />
                      <Input required type="tel" placeholder="Phone" />
                    </div>
                    
                    <Input required type="text" placeholder="Project Location (City, State)" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <Select
                         required
                         options={[
                           { value: 'garage', label: 'Garage' },
                           { value: 'interior', label: 'Interior Floor' },
                           { value: 'commercial', label: 'Commercial/Retail' },
                           { value: 'other', label: 'Other' },
                         ]}
                       />
                       <Input type="number" placeholder="Approx. Area (sq.ft)" />
                    </div>

                    <Button type="submit" className="w-full mt-4">
                      Get Free Estimate
                    </Button>
                  </form>
               )}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
