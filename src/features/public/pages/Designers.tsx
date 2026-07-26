import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Star, Filter, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { designersRepository } from '../../../api/designers.repository';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { Skeleton } from '../../../components/ui/Skeleton';

export default function Designers() {
  const [filterStyle, setFilterStyle] = useState('');
  const [searchCity, setSearchCity] = useState('');

  // Fetch all or by city
  const { data: designers, isLoading } = useQuery({
    queryKey: ['designers', searchCity],
    queryFn: () => {
      if (searchCity.trim()) {
        return designersRepository.getByCity(searchCity);
      }
      return designersRepository.getAll();
    },
  });

  const allStyles = ['Minimalist', 'Modern', 'Industrial', 'Mid-Century', 'Transitional', 'Eclectic', 'Traditional'];

  const filteredDesigners = designers?.filter(d => 
    filterStyle ? d.styles.includes(filterStyle) : true
  ) || [];

  return (
    <div className="bg-background min-h-screen py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl font-serif text-foreground sm:text-5xl">Our Designers</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Browse our curated network of premium interior design professionals.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-y border-border py-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar flex-1">
            <span className="flex items-center text-sm font-medium text-foreground mr-2 shrink-0">
              <Filter size={16} className="mr-2" /> Style:
            </span>
            <button 
              onClick={() => setFilterStyle('')}
              className={`whitespace-nowrap px-4 py-2 text-sm rounded-full transition-colors ${filterStyle === '' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}
            >
              All
            </button>
            {allStyles.map(style => (
              <button 
                key={style}
                onClick={() => setFilterStyle(style)}
                className={`whitespace-nowrap px-4 py-2 text-sm rounded-full transition-colors ${filterStyle === style ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}
              >
                {style}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by city..." 
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : filteredDesigners.length > 0 ? (
            <AnimatePresence>
              {filteredDesigners.map((designer, idx) => (
                <motion.div
                  key={designer.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full overflow-hidden group hover:border-primary transition-colors flex flex-col border-none shadow-none bg-transparent">
                    <Link 
                      to={`/designers/${designer.id}`} 
                      className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4 block"
                    >
                      <img 
                        src={designer.imageUrl} 
                        alt={designer.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    </Link>
                    
                    <div className="flex flex-col flex-1 px-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-serif text-foreground">
                          <Link to={`/designers/${designer.id}`} className="hover:text-primary transition-colors">
                            {designer.name}
                          </Link>
                        </h3>
                        <div className="flex items-center text-sm font-medium text-foreground bg-muted px-2 py-1 rounded">
                          <Star size={14} className="mr-1 text-primary fill-current" />
                          {designer.rating}
                        </div>
                      </div>
                      
                      <p className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin size={14} className="mr-1" /> {designer.city}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {designer.styles.map(style => (
                          <Badge key={style} variant="secondary" className="font-normal">
                            {style}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="col-span-full text-center py-24">
              <h3 className="text-2xl font-serif text-foreground mb-2">No designers found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setFilterStyle(''); setSearchCity(''); }}
                className="mt-6 text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
