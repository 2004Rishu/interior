import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { useWizard, WizardProvider } from '../../project-wizard/context/WizardContext';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { Step1CustomerDetails } from '../../project-wizard/components/Step1CustomerDetails';
import { Step2PropertyInfo } from '../../project-wizard/components/Step2PropertyInfo';
import { Step3HomeConfig } from '../../project-wizard/components/Step3HomeConfig';
import { Step4RoomPlanner } from '../../project-wizard/components/Step4RoomPlanner';
import { Step5DesignStyle } from '../../project-wizard/components/Step5DesignStyle';
import { Step6MaterialPreferences } from '../../project-wizard/components/Step6MaterialPreferences';
import { Step7SmartHome } from '../../project-wizard/components/Step7SmartHome';
import { Step8Budget } from '../../project-wizard/components/Step8Budget';
import { Step9Package } from '../../project-wizard/components/Step9Package';
import { Step10FileManager } from '../../project-wizard/components/Step10FileManager';
import { Step11GeminiAI } from '../../project-wizard/components/Step11GeminiAI';
import { Step12CostBreakdown } from '../../project-wizard/components/Step12CostBreakdown';
import { Step13DesignerMatch } from '../../project-wizard/components/Step13DesignerMatch';
import { Step14Quotation } from '../../project-wizard/components/Step14Quotation';
import { Step15BookConsultation } from '../../project-wizard/components/Step15BookConsultation';
import { Step16ProjectCreation } from '../../project-wizard/components/Step16ProjectCreation';
import { GlassCard } from '../../../components/ui/GlassCard';

const WizardContent = () => {
  const { currentStep, totalSteps, goToStep, form, isDraft, liveCost } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1CustomerDetails />;
      case 2:
        return <Step2PropertyInfo />;
      case 3:
        return <Step3HomeConfig />;
      case 4:
        return <Step4RoomPlanner />;
      case 5:
        return <Step5DesignStyle />;
      case 6:
        return <Step6MaterialPreferences />;
      case 7:
        return <Step7SmartHome />;
      case 8:
        return <Step8Budget />;
      case 9:
        return <Step9Package />;
      case 10:
        return <Step10FileManager />;
      case 11:
        return <Step11GeminiAI />;
      case 12:
        return <Step12CostBreakdown />;
      case 13:
        return <Step13DesignerMatch />;
      case 14:
        return <Step14Quotation />;
      case 15:
        return <Step15BookConsultation />;
      case 16:
        return <Step16ProjectCreation />;
      default:
        return (
          <div className="text-center py-20 text-muted-foreground">
            Step {currentStep} is under construction...
          </div>
        );
    }
  };

  // Helper to format currency in INR
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-sand-50 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Progress Header */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          {isDraft && (
            <span className="text-sm text-muted-foreground flex items-center bg-white px-3 py-1 rounded-full border border-border shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              Draft saved automatically
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Wizard Area */}
          <div className="lg:col-span-8">
            <form onSubmit={form.handleSubmit(() => {})}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </form>
          </div>

          {/* Sticky Sidebar: Live Estimate */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <GlassCard className="p-6">
                <h3 className="text-xl font-serif text-foreground mb-6">Live Estimate</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Cost</span>
                    <span className="font-medium">{formatINR(liveCost?.baseCost || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Materials</span>
                    <span className="font-medium">{formatINR(liveCost?.materialsCost || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Design Fee</span>
                    <span className="font-medium">{formatINR(liveCost?.designFee || 0)}</span>
                  </div>
                  
                  <div className="my-4 border-t border-border" />
                  
                  <div className="flex justify-between items-end">
                    <span className="font-medium text-foreground">Total Estimate</span>
                    <span className="text-2xl font-serif text-charcoal-900">
                      {formatINR(liveCost?.totalCost || 0)}
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
                  *This is a live estimate in INR (₹) and is subject to change based on final material selections, site conditions, and project scope.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StartProject() {
  const { user, openLoginModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      openLoginModal();
      navigate('/', { replace: true });
    }
  }, [user, openLoginModal, navigate]);

  if (!user) return null;

  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
