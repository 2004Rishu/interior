import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Wallet, Layout, Sparkles, ChevronRight, MessageSquareText } from 'lucide-react';
import { ROOM_CATEGORIES } from '../../../api/homepage-data';

export default function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const room = ROOM_CATEGORIES.find((r) => r.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!room) {
    return (
      <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl font-serif text-charcoal-900 mb-4">Space Not Found</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          We couldn't find the specific design space you're looking for. It may have been removed or updated.
        </p>
        <Link 
          to="/"
          className="px-6 py-3 bg-charcoal-900 text-white rounded-lg font-medium hover:bg-charcoal-800 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={room.imageUrl} 
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 lg:px-24">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit group"
          >
            <div className="p-2 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Back</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
              <Sparkles size={14} /> {room.popularStyle}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold leading-tight mb-4 drop-shadow-lg">
              {room.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl leading-relaxed">
              {room.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-border">
              <h2 className="text-2xl font-serif text-charcoal-900 mb-6">About this Space</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                Designed to blend aesthetics with optimal functionality, this {room.name.toLowerCase()} configuration utilizes premium materials to create a lasting impression. Every corner is meticulously planned to reflect the elegant {room.popularStyle.toLowerCase()} styling while remaining incredibly practical for everyday use.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-sand-50 border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Wallet size={20} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Starting Investment</h3>
                  <p className="text-2xl font-serif text-charcoal-900 font-bold">{room.startingPrice}</p>
                  <p className="text-sm text-muted-foreground mt-2">Includes base materials and execution.</p>
                </div>
                <div className="p-6 rounded-xl bg-sand-50 border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Estimated Timeline</h3>
                  <p className="text-2xl font-serif text-charcoal-900 font-bold">{room.completionTime}</p>
                  <p className="text-sm text-muted-foreground mt-2">From design approval to handover.</p>
                </div>
              </div>
            </div>

            <div className="bg-charcoal-900 rounded-2xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                <Sparkles size={120} />
              </div>
              <h2 className="text-2xl font-serif mb-4 relative z-10">Have questions about this design?</h2>
              <p className="text-white/70 mb-8 max-w-lg relative z-10">
                Our AI design assistant can answer specific queries about materials, layout variations, and cost breakdown for this {room.popularStyle} setup.
              </p>
              <button className="px-6 py-3 bg-white text-charcoal-900 rounded-lg font-medium hover:bg-sand-50 transition-colors inline-flex items-center gap-2 relative z-10">
                <MessageSquareText size={18} /> Ask AI Assistant
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h3 className="text-xl font-serif text-charcoal-900 mb-6">Ready to bring this to life?</h3>
              <p className="text-muted-foreground text-sm mb-8">
                Start your project wizard to get a precise quotation tailored to your actual floor plan.
              </p>

              <div className="space-y-4">
                <Link 
                  to="/start-project"
                  className="flex items-center justify-center w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-md group"
                >
                  Start Project <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="flex items-center justify-center w-full py-4 bg-sand-50 text-charcoal-900 rounded-xl font-medium border border-border hover:bg-muted transition-colors">
                  Save to Moodboard
                </button>
              </div>

              <hr className="my-8 border-border" />
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-50 text-green-600 shrink-0">
                  <Layout size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">Free 2D Layouts</h4>
                  <p className="text-xs text-muted-foreground mt-1">Included with every consultation.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
