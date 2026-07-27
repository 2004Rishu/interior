import React, { useRef } from 'react';
import { RoomCategory } from '../../../api/homepage-data';
import { PremiumRoomCard } from './PremiumRoomCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InfiniteCarouselProps {
  rooms: RoomCategory[];
  title: string;
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ rooms, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-12">
      <div className="flex justify-between items-end mb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground">{title}</h2>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-4 sm:px-6 lg:px-8 pb-12 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* We duplicate the array to simulate infinite scroll visually for now, or just show them all */}
        {rooms.map((room, idx) => (
          <div key={`${room.id}-${idx}`} className="shrink-0 w-[85vw] sm:w-[320px] md:w-[400px] snap-center">
            <PremiumRoomCard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
};
