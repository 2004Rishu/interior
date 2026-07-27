import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Image as ImageIcon, Heart, Sparkles } from 'lucide-react';
import { RoomCategory } from '../../../api/homepage-data';
import { Link } from 'react-router-dom';
import { AskAIModal } from './AskAIModal';

interface PremiumRoomCardProps {
  room: RoomCategory;
}

export const PremiumRoomCard: React.FC<PremiumRoomCardProps> = ({ room }) => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-charcoal-900 aspect-[4/5] md:aspect-[3/4]">
        {/* Background Image with Zoom on Hover */}
        <img
          src={room.imageUrl}
          alt={room.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Persistent Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/40 to-transparent opacity-80" />
        
        {/* Interactive Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm border border-white/30">
            {room.popularStyle}
          </span>
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 transform translate-y-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-white/40">
            <Heart size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full">
          <h3 className="text-2xl font-serif text-white mb-2">{room.name}</h3>
          
          {/* Description & Stats (Revealed on Hover on desktop, always visible on mobile) */}
          <div className="overflow-hidden">
            <div className="transform translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:h-0 group-hover:h-auto h-auto opacity-100 translate-y-0 md:group-hover:opacity-100">
              <p className="text-sand-100 text-sm mb-4 leading-relaxed hidden md:block group-hover:block">
                {room.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-sand-300">Starting</span>
                  <span className="text-sm font-medium text-white">{room.startingPrice}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <span className="block text-[10px] uppercase tracking-wider text-sand-300">Timeline</span>
                  <span className="text-sm font-medium text-white">{room.completionTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Link to={`/room/${room.id}`} className="flex items-center justify-center w-full h-12 bg-white text-charcoal-900 rounded-lg font-medium transition-colors hover:bg-sand-50">
                  Explore Designs <ArrowRight size={16} className="ml-2" />
                </Link>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center h-12 bg-charcoal-800/80 backdrop-blur-md text-white rounded-lg font-medium border border-white/10 transition-colors hover:bg-charcoal-700">
                    <ImageIcon size={16} className="mr-2" /> Gallery
                  </button>
                  <button 
                    onClick={() => setIsAIModalOpen(true)}
                    className="flex-1 flex items-center justify-center h-12 bg-primary/20 backdrop-blur-md text-primary-foreground rounded-lg font-medium border border-primary/30 transition-colors hover:bg-primary/40"
                  >
                    <Sparkles size={16} className="mr-2 text-yellow-300" /> Ask AI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AskAIModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        room={room} 
      />
    </>
  );
};
