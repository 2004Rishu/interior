import React, { useEffect, useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const DESIGNERS = [
  {
    id: 'd1',
    name: 'Aisha Sharma',
    specialty: 'Modern Minimalist',
    experience: '8 Years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80',
    matchScore: 98,
  },
  {
    id: 'd2',
    name: 'Rahul Verma',
    specialty: 'Ultra Luxury & Villas',
    experience: '12 Years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80',
    matchScore: 94,
  },
  {
    id: 'd3',
    name: 'Priya Patel',
    specialty: 'Contemporary & Japandi',
    experience: '5 Years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80',
    matchScore: 91,
  }
];

export const Step13DesignerMatch: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  const [isMatching, setIsMatching] = useState(true);
  const selectedDesigner = form.watch('preferences.assignedDesigner');

  useEffect(() => {
    const timer = setTimeout(() => setIsMatching(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlassCard className="p-8">
      {isMatching ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-muted rounded-full" />
            <motion.div
              className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary font-serif font-bold">AI</span>
            </div>
          </div>
          <h2 className="text-2xl font-serif text-foreground">Matching you with top designers...</h2>
          <p className="text-muted-foreground mt-2">Analyzing your style preferences and location.</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-serif text-foreground">Your Top Matches</h2>
            <p className="mt-2 text-muted-foreground">We found 3 professional designers who specialize in your exact requirements.</p>
          </div>

          <div className="space-y-4">
            {DESIGNERS.map((designer, idx) => {
              const isSelected = selectedDesigner === designer.id;
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={designer.id}
                  onClick={() => form.setValue('preferences.assignedDesigner', designer.id, { shouldValidate: true })}
                  className={`relative cursor-pointer p-6 rounded-2xl border transition-all flex flex-col md:flex-row items-center gap-6 ${
                    isSelected ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-white hover:border-primary/30'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={designer.image} alt={designer.name} className="w-24 h-24 rounded-full object-cover shadow-sm" />
                    {isSelected && (
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1 rounded-full border-2 border-white">
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-serif text-foreground font-medium">{designer.name}</h3>
                      <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold mt-2 md:mt-0">
                        {designer.matchScore}% Match
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /> {designer.rating} Rating</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> Local Expert</span>
                      <span>{designer.experience} Exp.</span>
                    </div>
                    
                    <p className="text-sm font-medium text-foreground bg-muted/50 inline-block px-3 py-1 rounded-full">
                      Specializes in {designer.specialty}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 rounded-lg bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors font-medium shadow-sm"
              disabled={!selectedDesigner}
            >
              Generate Final Quotation
            </button>
          </div>
        </motion.div>
      )}
    </GlassCard>
  );
};
