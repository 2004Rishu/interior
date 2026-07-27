import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { CheckCircle, Home, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Step16ProjectCreation: React.FC = () => {
  const { form, clearDraft } = useWizard();
  
  const data = form.getValues();

  // In a real app, this is where you would submit `data` to your backend via API.
  // Example: await submitProjectToAPI(data);

  return (
    <GlassCard className="p-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-8"
      >
        <CheckCircle size={48} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-4xl font-serif text-charcoal-900 mb-4">Project Created Successfully!</h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">
          Congratulations {data.customer?.firstName}, your interior design project has been initiated. Your consultation is booked and your matched designer will contact you shortly.
        </p>

        <div className="bg-sand-50 rounded-xl p-6 border border-border inline-block text-left mb-10">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">Next Steps</h3>
          <ul className="space-y-3 text-sm text-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" /> Check your email for the detailed PDF quotation.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" /> Download the Interior Me app to track project progress.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" /> Start browsing the Design Gallery to save more ideas.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            onClick={clearDraft}
            className="px-8 py-4 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Home size={18} /> Back to Homepage
          </Link>
          <button
            onClick={() => {
              clearDraft();
              alert('Dashboard feature coming soon!');
            }}
            className="px-8 py-4 rounded-xl bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors font-medium shadow-lg flex items-center justify-center gap-2"
          >
            <LayoutDashboard size={18} /> Go to Dashboard
          </button>
        </div>
      </motion.div>
    </GlassCard>
  );
};
