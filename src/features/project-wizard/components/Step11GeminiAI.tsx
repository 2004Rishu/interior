import React, { useEffect, useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Sparkles, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Step11GeminiAI: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  const [isScanning, setIsScanning] = useState(true);

  // Simulate AI scanning time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const data = form.getValues();
  const propertyType = data.property?.propertyType || 'residential';
  const totalArea = data.property?.carpetArea || 0;
  const roomCount = data.roomPlanner?.rooms?.length || 0;
  const budgetTier = data.budget?.priority || 'balanced';

  return (
    <GlassCard className="p-8">
      {isScanning ? (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <BrainCircuit size={80} className="text-primary relative z-10 drop-shadow-xl" />
          </motion.div>
          
          <h2 className="text-2xl font-serif text-foreground mb-4">Gemini AI is analyzing your project...</h2>
          
          <div className="space-y-3 w-full max-w-sm">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <CheckCircle2 size={16} className="text-green-500" /> Analyzing floor plan dimensions...
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <CheckCircle2 size={16} className="text-green-500" /> Calculating material dependencies...
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <CheckCircle2 size={16} className="text-green-500" /> Optimizing budget constraints...
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles size={32} />
            </div>
            <h2 className="text-3xl font-serif text-foreground">AI Project Insights</h2>
            <p className="mt-2 text-muted-foreground">Based on your inputs, here is a professional assessment.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Feasibility Score</h4>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-green-600">92</span>
                <span className="text-lg text-muted-foreground mb-1">/100</span>
              </div>
              <p className="text-sm text-foreground">Your budget of {budgetTier} tier aligns perfectly with a {totalArea} sqft {propertyType} space.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline Estimate</h4>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-charcoal-900">{roomCount > 3 ? '60-90' : '45-60'}</span>
                <span className="text-lg text-muted-foreground mb-1">Days</span>
              </div>
              <p className="text-sm text-foreground">Standard execution time for {roomCount} rooms including custom modular manufacturing.</p>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 shadow-sm md:col-span-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                <Sparkles size={16} /> AI Recommendations
              </h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Given your preference for a {budgetTier} budget, we recommend focusing investment on high-traffic areas like the Living Room and Kitchen.
                </li>
                {data.smartHome?.wantsSmartHome && (
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    Integrating smart lighting during the false-ceiling stage will save 15% on wiring costs.
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Using modular engineered wood for wardrobes will significantly reduce delivery timelines.
                </li>
              </ul>
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
              View Cost Breakdown
            </button>
          </div>
        </motion.div>
      )}
    </GlassCard>
  );
};
