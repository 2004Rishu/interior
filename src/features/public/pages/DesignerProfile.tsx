import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Star, MessageSquare, Calendar, ChevronRight, Award, Shield, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { designersRepository } from '../../../api/designers.repository';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Badge } from '../../../components/ui/Badge';

export default function DesignerProfile() {
  const { id } = useParams<{ id: string }>();

  const { data: designer, isLoading, error } = useQuery({
    queryKey: ['designer', id],
    queryFn: () => designersRepository.getById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-48 mb-12" />
          <div className="flex flex-col md:flex-row gap-12 md:items-start">
            <Skeleton className="w-full md:w-1/3 aspect-[4/5]" />
            <div className="flex-1 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !designer) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-foreground">Designer not found</h2>
          <Link to="/designers" className="mt-4 inline-block text-primary hover:underline">
             Return to directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Profile Header */}
      <section className="border-b border-border bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/designers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Directory
          </Link>

          <div className="flex flex-col md:flex-row gap-12 md:items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/3 max-w-sm shrink-0"
            >
              <div className="aspect-[4/5] bg-muted overflow-hidden w-full rounded-lg">
                <img 
                  src={designer.imageUrl} 
                  alt={designer.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 pt-4"
            >
              <h1 className="text-4xl font-serif text-foreground sm:text-5xl">{designer.name}</h1>
              
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center"><MapPin size={16} className="mr-1.5" /> {designer.city}</span>
                <span className="flex items-center"><Award size={16} className="mr-1.5" /> {designer.experienceYears} Years Experience</span>
                <span className="flex items-center text-foreground font-medium bg-muted px-2 py-1 rounded">
                  <Star size={16} className="mr-1.5 text-primary fill-current" /> {designer.rating} ({designer.reviews} reviews)
                </span>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-foreground uppercase tracking-widest mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {designer.styles.map(style => (
                    <Badge key={style} variant="secondary">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-foreground uppercase tracking-widest mb-3">About</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {designer.bio}
                </p>
              </div>

              <div className="mt-12">
                <Button asChild size="lg">
                  <Link to={`/start-project?designerId=${designer.id}`}>
                    Request Consultation with {designer.name.split(' ')[0]}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-foreground mb-12">Selected Works</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {designer.portfolio.map((imgUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="aspect-square overflow-hidden bg-muted rounded-lg"
              >
                <img 
                  src={imgUrl} 
                  alt={`${designer.name} portfolio piece ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
