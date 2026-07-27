import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential',
    price: '₹1,200/sqft',
    desc: 'Perfect for rental properties or strict budgets.',
    features: ['Standard materials', 'Basic 2D Layouts', '2 Revisions', 'Standard Warranty', '45 Day Delivery'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹2,500/sqft',
    desc: 'The sweet spot between luxury and affordability.',
    features: ['Premium Materials', '3D Walkthroughs', 'Unlimited Revisions', 'Extended Warranty', 'Dedicated PM', '60 Day Delivery'],
    popular: true,
  },
  {
    id: 'luxury',
    name: 'Ultra Luxury',
    price: '₹4,500/sqft+',
    desc: 'Bespoke designs with imported, top-tier materials.',
    features: ['Imported Materials', 'VR Experience', 'Unlimited Revisions', 'Lifetime Support', 'Senior Designer', 'Custom Delivery'],
  },
];

export const Step9Package: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  
  const selectedPackage = form.watch('budget.package');

  return (
    <GlassCard className="p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif text-foreground">Select a Package</h2>
        <p className="mt-2 text-muted-foreground">Choose the level of service and finishing that best suits your needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => {
          const isSelected = selectedPackage === pkg.id;
          
          return (
            <div
              key={pkg.id}
              onClick={() => form.setValue('budget.package', pkg.id as any, { shouldValidate: true })}
              className={`relative cursor-pointer rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-xl scale-105 z-10' 
                  : 'border-border bg-white hover:border-primary/30 hover:scale-105'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 inset-x-0 flex justify-center">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6 mt-4">
                <h3 className="text-xl font-serif text-foreground mb-2">{pkg.name}</h3>
                <div className="text-2xl font-bold text-charcoal-900">{pkg.price}</div>
                <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">{pkg.desc}</p>
              </div>
              
              <div className="flex-1">
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`mt-8 py-3 rounded-lg text-center font-medium transition-colors ${
                isSelected ? 'bg-primary text-white' : 'bg-muted text-foreground'
              }`}>
                {isSelected ? 'Selected' : 'Select Package'}
              </div>
              
              {isSelected && (
                <motion.div 
                  layoutId="outline-pkg"
                  className="absolute inset-0 rounded-2xl border-2 border-primary"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {form.formState.errors.budget?.package && (
        <p className="mt-4 text-sm text-center text-red-500">Please select a package to continue.</p>
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
          disabled={!selectedPackage}
        >
          Continue to Floor Plan
        </button>
      </div>
    </GlassCard>
  );
};
