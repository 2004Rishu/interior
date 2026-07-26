import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, MapPin } from 'lucide-react';
import { MOCK_PROJECTS } from '../data';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-sand-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
            alt="Beautifully designed interior living space"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/60 to-charcoal-900/20 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-serif text-white sm:text-5xl md:text-7xl leading-tight">
              The Right Designer for Your Home, <span className="italic text-sand-200">Matched for You.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-sand-50 md:text-xl font-light">
              Designing Spaces, Defining You. We hand-pick premium interior designers and epoxy flooring experts tailored to your style, budget, and vision.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
              <Link
                to="/start-project"
                className="inline-flex h-14 items-center justify-center bg-white px-8 text-lg font-medium text-charcoal-900 transition-all hover:bg-sand-50"
              >
                Start Your Project
              </Link>
              <Link
                to="/designers"
                className="inline-flex h-14 items-center justify-center border border-white/30 bg-white/10 px-8 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Browse Portfolios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-sand-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl font-serif md:text-5xl text-charcoal-900">How It Works</h2>
            <p className="mt-4 text-sand-700 text-lg">A refined, effortless process to bring your vision to life.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {[
              { num: '01', title: 'Share Your Vision', desc: 'Tell us about your space, budget, and design preferences through our simple intake form.' },
              { num: '02', title: 'Get Matched', desc: 'We hand-select the perfect designers from our vetted network who align with your unique style.' },
              { num: '03', title: 'Bring It to Life', desc: 'Collaborate with your matched professional and watch your dream space become reality.' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand-200 text-xl font-serif text-charcoal-900 transition-colors group-hover:bg-charcoal-900 group-hover:text-white">
                  {step.num}
                </div>
                <h3 className="mt-8 text-xl font-serif text-charcoal-900">{step.title}</h3>
                <p className="mt-3 text-sand-700 max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-sand-100 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-serif md:text-5xl text-charcoal-900">Featured Spaces</h2>
              <p className="mt-4 text-sand-700 text-lg">Curated projects from our network of premium designers.</p>
            </div>
            <Link to="/designers" className="hidden md:inline-flex items-center text-charcoal-900 font-medium hover:text-sand-600 transition-colors">
              View All Projects <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_PROJECTS.slice(0, 4).map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand-200 w-full">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif text-charcoal-900">{project.title}</h3>
                    <p className="mt-1 text-sand-600">Designed by {project.designerName}</p>
                  </div>
                  <span className="inline-block bg-sand-200 px-3 py-1 text-xs font-medium text-charcoal-800 tracking-wide uppercase">
                    {project.style}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 md:hidden flex justify-center">
             <Link to="/designers" className="inline-flex items-center text-charcoal-900 font-medium hover:text-sand-600 transition-colors">
              View All Projects <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-charcoal-900 py-24 md:py-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif md:text-5xl mb-16">The Interior Me Standard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="flex flex-col items-center">
              <Star size={40} strokeWidth={1} className="text-sand-300 mb-6" />
              <h3 className="text-4xl font-serif text-sand-100 mb-2">50+</h3>
              <p className="text-sand-400">Vetted Designers</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin size={40} strokeWidth={1} className="text-sand-300 mb-6" />
              <h3 className="text-4xl font-serif text-sand-100 mb-2">12</h3>
              <p className="text-sand-400">Major Cities</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={40} strokeWidth={1} className="text-sand-300 mb-6" />
              <h3 className="text-4xl font-serif text-sand-100 mb-2">100%</h3>
              <p className="text-sand-400">Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Epoxy CTA */}
      <section className="relative overflow-hidden bg-sand-200 py-24 md:py-32">
         <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=2000"
            alt="Epoxy Flooring"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif md:text-5xl text-charcoal-900">Transform Your Surfaces</h2>
          <p className="mt-6 text-lg text-charcoal-800">
            Beyond interiors, we connect you with top-tier epoxy flooring professionals for homes, garages, and commercial spaces.
          </p>
          <div className="mt-10">
             <Link
                to="/epoxy-flooring"
                className="inline-flex h-14 items-center justify-center bg-charcoal-900 px-8 text-lg font-medium text-white transition-all hover:bg-charcoal-800"
              >
                Explore Epoxy Services
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
