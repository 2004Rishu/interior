import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Diamond, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const MATERIALS = [
  { id: 'standard', label: 'Standard', desc: 'Durable, cost-effective materials. Engineered wood, laminates.' },
  { id: 'premium', label: 'Premium', desc: 'High-quality finishes. Plywood, acrylics, quartz.' },
  { id: 'luxury', label: 'Ultra Luxury', desc: 'The finest materials. Solid wood, imported marble, brass.' },
];

export const Step6MaterialPreferences: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  
  const selectedMaterial = form.watch('design.materialPreference');

  return (
    <GlassCard className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-foreground">Material Preferences</h2>
        <p className="mt-2 text-muted-foreground">Choose the grade of materials for your interior.</p>
      </div>

      <div className="flex flex-col gap-4">
        {MATERIALS.map((mat) => {
          const isSelected = selectedMaterial === mat.id;
          
          return (
            <div
              key={mat.id}
              onClick={() => form.setValue('design.materialPreference', mat.id as 'standard' | 'premium' | 'luxury', { shouldValidate: true })}
              className={`relative cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-border bg-white hover:border-primary/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {mat.id === 'luxury' && <Diamond size={16} className="text-primary" />}
                    <h3 className={`text-lg font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {mat.label}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {mat.desc}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-primary bg-primary text-white' : 'border-muted-foreground/30'
                }`}>
                  {isSelected && <CheckCircle2 size={16} />}
                </div>
              </div>
              
              {isSelected && (
                <motion.div 
                  layoutId="outline-mat"
                  className="absolute inset-0 rounded-xl border-2 border-primary"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {form.formState.errors.design?.materialPreference && (
        <p className="mt-4 text-sm text-red-500">Please select a material preference.</p>
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
        >
          Continue to Smart Home
        </button>
      </div>
    </GlassCard>
  );
};
