import React from 'react';
import { motion } from 'motion/react';
import { RoomCategory } from '../../../api/homepage-data';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface MasonryGalleryProps {
  rooms: RoomCategory[];
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ rooms }) => {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-serif text-foreground">Trending Masterpieces</h2>
        <p className="mt-4 text-lg text-muted-foreground">Most saved interiors by our community this month.</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {rooms.map((room, idx) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl bg-muted break-inside-avoid"
          >
            <img
              src={room.imageUrl}
              alt={room.name}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
              <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-xl font-serif text-white">{room.name}</h3>
                <p className="text-sand-200 text-sm mb-4">{room.popularStyle}</p>
                <Link to={`/room/${room.id}`} className="inline-flex items-center text-sm font-medium text-white hover:text-sand-200 transition-colors">
                  View Project <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
