import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Home, Building2, PaintBucket, Hammer } from 'lucide-react';
import { motion } from 'motion/react';

export const Step3HomeConfig: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  
  const options = [
    {
      id: 'new-home',
      label: 'New Home Interiors',
      description: 'Designing a completely new space from scratch.',
      icon: Home,
    },
    {
      id: 'renovation',
      label: 'Home Renovation',
      description: 'Upgrading and redesigning an existing space.',
      icon: Hammer,
    },
    {
      id: 'commercial',
      label: 'Commercial Space',
      description: 'Offices, restaurants, and retail spaces.',
      icon: Building2,
    },
    {
      id: 'only-painting',
      label: 'Painting & Flooring',
      description: 'Only looking for painting or epoxy flooring services.',
      icon: PaintBucket,
    },
  ];

  return (
    <GlassCard className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-foreground">Project Type</h2>
        <p className="mt-2 text-muted-foreground">What kind of project are we looking at?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = form.watch('property.propertyType') === option.id;
          const Icon = option.icon;
          
          return (
            <div
              key={option.id}
              onClick={() => form.setValue('property.propertyType', option.id, { shouldValidate: true })}
              className={`relative cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-border bg-white hover:border-primary/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {option.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <motion.div 
                  layoutId="outline"
                  className="absolute inset-0 rounded-xl border-2 border-primary"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {form.formState.errors.property?.propertyType && (
        <p className="mt-4 text-sm text-red-500">Please select a project type to continue.</p>
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
          Continue to Room Planner
        </button>
      </div>
    </GlassCard>
  );
};
