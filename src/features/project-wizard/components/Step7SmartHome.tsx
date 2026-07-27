import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Lightbulb, Speaker, Shield, ThermometerSnowflake, Check } from 'lucide-react';

const FEATURES = [
  { id: 'lighting', label: 'Smart Lighting', icon: Lightbulb, desc: 'Automated moods & voice control.' },
  { id: 'audio', label: 'Multi-room Audio', icon: Speaker, desc: 'Integrated ceiling speakers.' },
  { id: 'security', label: 'Smart Security', icon: Shield, desc: 'Digital locks & cameras.' },
  { id: 'climate', label: 'Climate Control', icon: ThermometerSnowflake, desc: 'Smart AC integration.' },
];

export const Step7SmartHome: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  
  const selectedFeatures = form.watch('smartHome.features') || [];
  const wantsSmartHome = form.watch('smartHome.wantsSmartHome');

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      form.setValue('smartHome.features', selectedFeatures.filter(f => f !== id), { shouldValidate: true });
    } else {
      form.setValue('smartHome.features', [...selectedFeatures, id], { shouldValidate: true });
    }
  };

  return (
    <GlassCard className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-foreground">Smart Home Integration</h2>
        <p className="mt-2 text-muted-foreground">Would you like to integrate smart home technology?</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          type="button"
          onClick={() => form.setValue('smartHome.wantsSmartHome', true)}
          className={`flex-1 py-3 rounded-lg border transition-colors ${
            wantsSmartHome === true ? 'bg-charcoal-900 text-white border-charcoal-900' : 'bg-white border-border text-foreground hover:bg-muted'
          }`}
        >
          Yes, I'm interested
        </button>
        <button
          type="button"
          onClick={() => {
            form.setValue('smartHome.wantsSmartHome', false);
            form.setValue('smartHome.features', []);
          }}
          className={`flex-1 py-3 rounded-lg border transition-colors ${
            wantsSmartHome === false ? 'bg-charcoal-900 text-white border-charcoal-900' : 'bg-white border-border text-foreground hover:bg-muted'
          }`}
        >
          No, maybe later
        </button>
      </div>

      {wantsSmartHome && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {FEATURES.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            const Icon = feature.icon;
            
            return (
              <div
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 flex items-start gap-4 ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-white hover:border-primary/30'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {feature.label}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                </div>
                {isSelected && <Check size={16} className="text-primary mt-1" />}
              </div>
            );
          })}
        </div>
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
          disabled={wantsSmartHome === undefined}
        >
          Continue to Budget
        </button>
      </div>
    </GlassCard>
  );
};
