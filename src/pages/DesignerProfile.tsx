import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Star, Award } from 'lucide-react';
import { MOCK_DESIGNERS, MOCK_PROJECTS } from '../data';

export default function DesignerProfile() {
  const { id } = useParams();
  const designer = MOCK_DESIGNERS.find(d => d.id === id);
  const projects = MOCK_PROJECTS.filter(p => p.designerId === id);

  if (!designer) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-sand-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-charcoal-900">Designer not found</h2>
          <Link to="/designers" className="mt-4 inline-block text-sand-600 hover:text-charcoal-900">
             Return to directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sand-50">
      {/* Profile Header */}
      <section className="border-b border-sand-200 bg-white pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/designers" className="inline-flex items-center text-sm font-medium text-sand-500 hover:text-charcoal-900 mb-12 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Directory
          </Link>

          <div className="flex flex-col md:flex-row gap-12 md:items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/3 max-w-sm shrink-0"
            >
              <div className="aspect-[4/5] bg-sand-200 overflow-hidden w-full">
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
              <h1 className="text-4xl font-serif text-charcoal-900 sm:text-5xl">{designer.name}</h1>
              
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-sand-700">
                <span className="flex items-center"><MapPin size={16} className="mr-1.5" /> {designer.city}</span>
                <span className="flex items-center"><Award size={16} className="mr-1.5" /> {designer.experienceYears} Years Experience</span>
                <span className="flex items-center text-charcoal-900 font-medium">
                  <Star size={16} className="mr-1.5 text-sand-500 fill-current" /> {designer.rating} ({designer.reviews} reviews)
                </span>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-charcoal-900 uppercase tracking-widest mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {designer.styles.map(style => (
                    <span key={style} className="bg-sand-100 px-3 py-1 text-sm text-charcoal-900">
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-charcoal-900 uppercase tracking-widest mb-3">About</h3>
                <p className="text-lg text-sand-700 leading-relaxed max-w-2xl">
                  {designer.bio}
                </p>
              </div>

              <div className="mt-12">
                <Link
                  to="/start-project"
                  className="inline-flex h-14 items-center justify-center bg-charcoal-900 px-8 text-sm font-medium text-white transition-colors hover:bg-charcoal-800"
                >
                  Request Consultation with {designer.name.split(' ')[0]}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-charcoal-900 mb-12">Selected Works</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
             {designer.portfolio.map((imgUrl, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className={`relative overflow-hidden bg-sand-200 ${idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-auto h-full min-h-[400px]' : 'aspect-square'}`}
                >
                  <img 
                    src={imgUrl} 
                    alt={`Portfolio piece ${idx + 1} by ${designer.name}`}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
             ))}
             {projects.map((project, idx) => (
                <motion.div 
                  key={`p-${idx}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (designer.portfolio.length + idx) * 0.1, duration: 0.8 }}
                  className="relative overflow-hidden bg-sand-200 aspect-square group"
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       <p className="text-sm tracking-widest uppercase mb-1 opacity-80">{project.roomType}</p>
                       <h4 className="font-serif text-xl">{project.title}</h4>
                    </div>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
