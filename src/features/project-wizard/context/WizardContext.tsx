import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectWizardSchema, ProjectWizardData, defaultWizardData } from '../schema';

export interface LiveCost {
  baseCost: number;
  materialsCost: number;
  designFee: number;
  totalCost: number;
}

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  goToStep: (step: number) => void;
  form: UseFormReturn<ProjectWizardData>;
  isDraft: boolean;
  saveDraft: () => void;
  clearDraft: () => void;
  liveCost: LiveCost;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const WIZARD_STORAGE_KEY = 'interior_me_wizard_draft';

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 16;
  const [isDraft, setIsDraft] = useState(false);
  
  const [liveCost, setLiveCost] = useState<LiveCost>({
    baseCost: 0,
    materialsCost: 0,
    designFee: 0,
    totalCost: 0,
  });

  // Initialize form with defaults or local storage draft
  const form = useForm<ProjectWizardData>({
    resolver: zodResolver(projectWizardSchema) as any,
    defaultValues: defaultWizardData as any,
    mode: 'onTouched',
  });

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        form.reset(parsedDraft.data);
        if (parsedDraft.step) {
          setCurrentStep(parsedDraft.step);
        }
        setIsDraft(true);
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, [form]);

  // Auto-save draft and calculate live cost when form values change
  useEffect(() => {
    const subscription = form.watch((value: any) => {
      localStorage.setItem(
        WIZARD_STORAGE_KEY,
        JSON.stringify({ step: currentStep, data: value })
      );
      setIsDraft(true);

      // LIVE COST CALCULATION ENGINE (INR)
      const area = value.property?.carpetArea || 0;
      
      // 1. Base Cost (Assume avg ₹1500 per sqft)
      const base = area * 1500;
      
      // 2. Materials Cost 
      let materials = 0;
      
      // Dynamically assign per-room cost based on priority
      let costPerRoom = 150000; // 'balanced' (medium): 1 to 2.5 Lakh range
      
      if (value.budget?.priority === 'cost-effective') {
        costPerRoom = 50000; // 'cheap': 30k to 70k range
      } else if (value.budget?.priority === 'premium') {
        costPerRoom = 300000; // premium
      } else if (value.budget?.priority === 'luxury') {
        costPerRoom = 450000; // 'luxury': > 4 Lakh
      }

      if (value.roomPlanner?.rooms?.length) {
        materials += value.roomPlanner.rooms.length * costPerRoom;
      }
      
      // Smart Home features
      if (value.smartHome?.features?.length) {
        materials += value.smartHome.features.length * 25000; // ₹25k per smart feature
      }

      // 3. Design Fee (8% of materials + base)
      const fee = (base + materials) * 0.08;

      setLiveCost({
        baseCost: base,
        materialsCost: materials,
        designFee: fee,
        totalCost: base + materials + fee,
      });

    });
    return () => subscription.unsubscribe();
  }, [form.watch, currentStep]);

  const saveDraft = () => {
    localStorage.setItem(
      WIZARD_STORAGE_KEY,
      JSON.stringify({ step: currentStep, data: form.getValues() })
    );
    setIsDraft(true);
  };

  const clearDraft = () => {
    localStorage.removeItem(WIZARD_STORAGE_KEY);
    form.reset(defaultWizardData as any);
    setCurrentStep(1);
    setIsDraft(false);
  };

  const validateStep = async (stepNumber: number) => {
    // Depending on the step, we validate specific fields
    switch (stepNumber) {
      case 1:
        return await form.trigger('customer');
      case 2:
        return await form.trigger('property');
      case 3:
        return await form.trigger('homeConfig');
      case 4:
        return await form.trigger('roomPlanner');
      case 5:
      case 6:
        return await form.trigger('design');
      case 7:
        return await form.trigger('smartHome');
      case 8:
      case 9:
        return await form.trigger('budget');
      // Steps 10-16 might not require strict form validation to proceed, or have their own logic
      default:
        return true;
    }
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
        form,
        isDraft,
        saveDraft,
        clearDraft,
        liveCost,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
