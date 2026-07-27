import React, { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const Step15BookConsultation: React.FC = () => {
  const { nextStep, prevStep } = useWizard();
  
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 7 days for mockup
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dayStr: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      fullDate: d.getTime(),
    };
  });

  const times = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

  return (
    <GlassCard className="p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif text-foreground">Book Your Free Consultation</h2>
        <p className="mt-2 text-muted-foreground">Select a time to discuss your project with your matched designer.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Date Selection */}
        <div>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Calendar size={16} /> Select Date
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {dates.map((d) => {
              const isSelected = selectedDate === d.fullDate;
              return (
                <button
                  key={d.fullDate}
                  onClick={() => setSelectedDate(d.fullDate)}
                  className={`shrink-0 w-20 h-24 rounded-2xl border flex flex-col items-center justify-center transition-all snap-start ${
                    isSelected ? 'bg-charcoal-900 border-charcoal-900 text-white shadow-lg scale-105' : 'bg-white border-border hover:border-charcoal-900/30'
                  }`}
                >
                  <span className={`text-xs uppercase font-medium ${isSelected ? 'text-sand-200' : 'text-muted-foreground'}`}>
                    {d.dayStr}
                  </span>
                  <span className="text-2xl font-bold mt-1">
                    {d.dateNum}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: selectedDate ? 1 : 0.5 }}
          className={!selectedDate ? 'pointer-events-none' : ''}
        >
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock size={16} /> Select Time
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {times.map((t) => {
              const isSelected = selectedTime === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 rounded-xl border font-medium transition-all ${
                    isSelected ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-border text-foreground hover:border-primary/30'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </motion.div>

      </div>

      <div className="mt-12 flex justify-between">
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
          disabled={!selectedDate || !selectedTime}
        >
          Confirm Booking & Finish
        </button>
      </div>
    </GlassCard>
  );
};
