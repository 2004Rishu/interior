import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';

export const Step8Budget: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  
  const minBudget = form.watch('budget.minAmount') || 500000;
  const maxBudget = form.watch('budget.maxAmount') || 1000000;
  const priority = form.watch('budget.priority');

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <GlassCard className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-foreground">Budget Planning</h2>
        <p className="mt-2 text-muted-foreground">Help us understand your investment range in INR.</p>
      </div>

      <div className="space-y-12">
        {/* Sliders */}
        <div>
          <label className="text-sm font-medium text-foreground mb-4 block">Select your budget range</label>
          <div className="flex gap-4 items-center">
            <div className="flex-1 space-y-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Minimum (₹)</label>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={100000}
                value={minBudget}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  form.setValue('budget.minAmount', val);
                  if (val > maxBudget) form.setValue('budget.maxAmount', val);
                }}
                className="w-full accent-charcoal-900"
              />
              <div className="text-sm font-medium">{formatINR(minBudget)}</div>
            </div>
            
            <div className="flex-1 space-y-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Maximum (₹)</label>
              <input
                type="range"
                min={100000}
                max={10000000}
                step={100000}
                value={maxBudget}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  form.setValue('budget.maxAmount', val);
                  if (val < minBudget) form.setValue('budget.minAmount', val);
                }}
                className="w-full accent-charcoal-900"
              />
              <div className="text-sm font-medium">{formatINR(maxBudget)}</div>
            </div>
          </div>
        </div>

        {/* Priority Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-4 block">What is your primary focus?</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: 'cost-effective', label: 'Cost Effective', desc: 'Focus on budget & utility' },
              { id: 'balanced', label: 'Balanced', desc: 'Quality within reason' },
              { id: 'premium', label: 'Premium', desc: 'High-end finish' },
              { id: 'luxury', label: 'Ultra Luxury', desc: 'Bespoke, no compromises' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => form.setValue('budget.priority', opt.id as any, { shouldValidate: true })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  priority === opt.id ? 'border-primary bg-primary/5' : 'border-border bg-white hover:bg-muted'
                }`}
              >
                <div className={`font-medium ${priority === opt.id ? 'text-primary' : 'text-foreground'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
          {form.formState.errors.budget?.priority && (
            <p className="mt-2 text-sm text-red-500">Please select a priority.</p>
          )}
        </div>
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
        >
          Continue to Packages
        </button>
      </div>
    </GlassCard>
  );
};
