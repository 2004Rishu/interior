import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const STYLES = [
  { id: 'modern', label: 'Modern Minimalist', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80' },
  { id: 'luxury', label: 'Ultra Luxury', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' },
  { id: 'contemporary', label: 'Contemporary', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80' },
  { id: 'traditional', label: 'Traditional Classic', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
  { id: 'scandinavian', label: 'Scandinavian', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400&q=80' },
  { id: 'industrial', label: 'Industrial Loft', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80' },
];

export const Step5DesignStyle: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  
  const selectedStyles = form.watch('design.stylePreferences') || [];

  const toggleStyle = (id: string) => {
    if (selectedStyles.includes(id)) {
      form.setValue('design.stylePreferences', selectedStyles.filter(s => s !== id), { shouldValidate: true });
    } else {
      form.setValue('design.stylePreferences', [...selectedStyles, id], { shouldValidate: true });
    }
  };

  return (
    <GlassCard className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-foreground">Design Style</h2>
        <p className="mt-2 text-muted-foreground">Select one or more interior styles that inspire you.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {STYLES.map((style) => {
          const isSelected = selectedStyles.includes(style.id);
          
          return (
            <div
              key={style.id}
              onClick={() => toggleStyle(style.id)}
              className="relative cursor-pointer group rounded-xl overflow-hidden aspect-square"
            >
              <img 
                src={style.image} 
                alt={style.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className={`absolute inset-0 transition-opacity duration-300 ${
                isSelected ? 'bg-primary/40' : 'bg-black/30 group-hover:bg-black/20'
              }`} />

              {isSelected && (
                <div className="absolute top-4 right-4 bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                  <Check size={18} strokeWidth={3} />
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-white font-medium drop-shadow-md">{style.label}</span>
              </div>

              {isSelected && (
                <motion.div 
                  layoutId={`outline-${style.id}`}
                  className="absolute inset-0 rounded-xl border-4 border-white"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {form.formState.errors.design?.stylePreferences && (
        <p className="mt-4 text-sm text-red-500">{form.formState.errors.design.stylePreferences.message}</p>
      )}

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
          disabled={selectedStyles.length === 0}
        >
          Continue to Materials
        </button>
      </div>
    </GlassCard>
  );
};
