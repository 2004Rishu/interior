import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, MapPin, Filter } from 'lucide-react';
import { MOCK_DESIGNERS } from '../data';

export default function Designers() {
  const [filterStyle, setFilterStyle] = useState('');

  const allStyles = Array.from(new Set(MOCK_DESIGNERS.flatMap(d => d.styles)));

  const filteredDesigners = filterStyle 
    ? MOCK_DESIGNERS.filter(d => d.styles.includes(filterStyle))
    : MOCK_DESIGNERS;

  return (
    <div className="bg-sand-50 min-h-screen py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-serif text-charcoal-900 sm:text-5xl">Our Designers</h1>
          <p className="mt-4 text-lg text-sand-700 max-w-2xl">
            Browse our curated network of premium interior design professionals.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-sand-200 py-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <span className="flex items-center text-sm font-medium text-charcoal-900 mr-2">
              <Filter size={16} className="mr-2" /> Filter by Style:
            </span>
            <button 
              onClick={() => setFilterStyle('')}
              className={`whitespace-nowrap px-4 py-2 text-sm transition-colors ${filterStyle === '' ? 'bg-charcoal-900 text-white' : 'bg-sand-200 text-charcoal-900 hover:bg-sand-300'}`}
            >
              All Styles
            </button>
            {allStyles.map(style => (
              <button 
                key={style}
                onClick={() => setFilterStyle(style)}
                className={`whitespace-nowrap px-4 py-2 text-sm transition-colors ${filterStyle === style ? 'bg-charcoal-900 text-white' : 'bg-sand-200 text-charcoal-900 hover:bg-sand-300'}`}
              >
                {style}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sand-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by city..." 
              className="w-full md:w-64 border-b border-sand-300 bg-transparent py-2 pl-10 pr-4 text-charcoal-900 focus:border-charcoal-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDesigners.map((designer, idx) => (
            <motion.div
              key={designer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group flex flex-col"
            >
              <Link to={`/designers/${designer.id}`} className="relative aspect-[4/5] overflow-hidden bg-sand-200 mb-6 block">
                <img 
                  src={designer.imageUrl} 
                  alt={designer.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </Link>
              
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-charcoal-900">
                    <Link to={`/designers/${designer.id}`} className="hover:text-sand-600 transition-colors">
                      {designer.name}
                    </Link>
                  </h3>
                  <div className="flex items-center text-sm font-medium text-charcoal-900">
                    <svg className="w-4 h-4 mr-1 text-sand-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {designer.rating}
                  </div>
                </div>
                
                <p className="flex items-center text-sm text-sand-600 mb-4">
                  <MapPin size={14} className="mr-1" /> {designer.city}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {designer.styles.map(style => (
                    <span key={style} className="bg-white border border-sand-200 px-2 py-1 text-xs text-sand-700">
                      {style}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t border-sand-200">
                   <Link to={`/designers/${designer.id}`} className="text-sm font-medium text-charcoal-900 hover:text-sand-600 transition-colors inline-flex items-center">
                    View Portfolio & Profile <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
