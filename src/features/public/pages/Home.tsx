import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, MapPin } from 'lucide-react';
import { AnimatedCounter } from '../../../components/ui/AnimatedCounter';
import { ROOM_CATEGORIES, RoomCategory } from '../../../api/homepage-data';
import { PremiumRoomCard } from '../components/PremiumRoomCard';
import { InfiniteCarousel } from '../components/InfiniteCarousel';
import { MasonryGallery } from '../components/MasonryGallery';
import { useAuth } from '../../../context/AuthContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState<RoomCategory['category']>('Living');
  const { user, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const handleAuthNavigation = (path: string) => {
    if (!user) {
      openLoginModal();
    } else {
      navigate(path);
    }
  };

  const filteredRooms = ROOM_CATEGORIES.filter(room => room.category === activeTab);
  
  // Dynamically update the premium spaces carousel based on the active tab from Explore Every Space
  const carouselRooms = ROOM_CATEGORIES.filter(room => room.category === activeTab);

  // Handpick a few rooms for the masonry gallery
  const masonryRooms = [...ROOM_CATEGORIES].reverse().slice(0, 9);

  return (
    <div className="flex flex-col bg-background">
      {/* 1. Ultra Premium Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
            alt="Beautifully designed interior living space"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/40 to-transparent mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-serif text-white sm:text-5xl md:text-7xl leading-tight drop-shadow-lg">
              The Right Designer for Your Home, <span className="italic text-sand-200">Matched for You.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-sand-50 md:text-xl font-light drop-shadow">
              Designing Spaces, Defining You. We hand-pick premium interior designers and epoxy flooring experts tailored to your style, budget, and vision.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
              <button
                onClick={() => handleAuthNavigation('/start-project')}
                className="inline-flex h-14 items-center justify-center bg-white px-8 text-lg font-medium text-charcoal-900 transition-all hover:bg-sand-50 rounded-lg shadow-xl"
              >
                Start Your Project
              </button>
              <button
                onClick={() => handleAuthNavigation('/designers')}
                className="inline-flex h-14 items-center justify-center border border-white/30 bg-white/10 px-8 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 rounded-lg"
              >
                Browse Portfolios
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Infinite Carousel (Featured Rooms) */}
      <section className="bg-sand-50 py-12 md:py-24 overflow-hidden border-b border-border">
        <InfiniteCarousel rooms={carouselRooms} title="Discover Premium Spaces" />
      </section>

      {/* 3. Explore Every Space (The 39 Categories) */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Explore Every Space</h2>
            <p className="text-lg text-muted-foreground">
              Beautiful interiors designed for every corner of your home. Browse professionally curated inspirations before starting your project.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {(['Living', 'Kitchen', 'Bedroom', 'Bathroom', 'Other'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-charcoal-900 text-white shadow-md' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tab} Spaces
              </button>
            ))}
          </div>

          {/* Animated Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRooms.map(room => (
                <motion.div
                  key={room.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PremiumRoomCard room={room} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <div className="mt-16 text-center">
             <button
                onClick={() => handleAuthNavigation('/start-project')}
                className="inline-flex h-14 items-center justify-center bg-charcoal-900 px-8 text-lg font-medium text-white transition-all hover:bg-charcoal-800 rounded-lg shadow-lg"
              >
                Calculate Cost <ArrowRight size={20} className="ml-2" />
              </button>
          </div>
        </div>
      </section>

      {/* 4. Masonry Gallery */}
      <section className="bg-sand-50 border-t border-border">
        <MasonryGallery rooms={masonryRooms} />
      </section>

      {/* 5. How It Works */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl font-serif md:text-5xl text-foreground">How It Works</h2>
            <p className="mt-4 text-muted-foreground text-lg">A refined, effortless process to bring your vision to life.</p>
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-xl font-serif text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                  {step.num}
                </div>
                <h3 className="mt-8 text-xl font-serif text-foreground">{step.title}</h3>
                <p className="mt-3 text-muted-foreground max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trust Section */}
      <section className="bg-charcoal-900 py-24 md:py-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif md:text-5xl mb-16">The Interior Me Standard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="flex flex-col items-center">
              <Star size={40} strokeWidth={1} className="text-sand-300 mb-6" />
              <h3 className="text-4xl font-serif text-sand-100 mb-2">
                <AnimatedCounter value={50} suffix="+" />
              </h3>
              <p className="text-sand-400">Vetted Designers</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin size={40} strokeWidth={1} className="text-sand-300 mb-6" />
              <h3 className="text-4xl font-serif text-sand-100 mb-2">
                <AnimatedCounter value={12} />
              </h3>
              <p className="text-sand-400">Major Cities</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={40} strokeWidth={1} className="text-sand-300 mb-6" />
              <h3 className="text-4xl font-serif text-sand-100 mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </h3>
              <p className="text-sand-400">Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Epoxy CTA */}
      <section className="relative overflow-hidden bg-sand-200 py-24 md:py-32">
         <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=2000"
            alt="Epoxy Flooring"
            className="h-full w-full object-cover opacity-30 mix-blend-multiply"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif md:text-5xl text-charcoal-900 drop-shadow-md">Transform Your Surfaces</h2>
          <p className="mt-6 text-lg text-charcoal-900 font-medium drop-shadow">
            Beyond interiors, we connect you with top-tier epoxy flooring professionals for homes, garages, and commercial spaces.
          </p>
          <div className="mt-10">
             <button
                onClick={() => handleAuthNavigation('/epoxy-flooring')}
                className="inline-flex h-14 items-center justify-center bg-charcoal-900 px-8 text-lg font-medium text-white transition-all hover:bg-charcoal-800 rounded-lg shadow-xl"
              >
                Explore Epoxy Services
              </button>
          </div>
        </div>
      </section>
    </div>
  );
}
