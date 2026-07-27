import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, onStepClick }) => {
  // Only show a window of steps if totalSteps is large
  const visibleSteps = [];
  const windowSize = 5;
  let start = Math.max(1, currentStep - Math.floor(windowSize / 2));
  let end = Math.min(totalSteps, start + windowSize - 1);
  
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }

  for (let i = start; i <= end; i++) {
    visibleSteps.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 overflow-x-auto py-4">
      {start > 1 && <span className="text-muted-foreground">...</span>}
      
      {visibleSteps.map((step, index) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(step)}
                disabled={!onStepClick || step > currentStep}
                className={`
                  flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300
                  ${isActive ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110' : ''}
                  ${isCompleted ? 'bg-primary/80 text-primary-foreground cursor-pointer' : ''}
                  ${!isActive && !isCompleted ? 'bg-muted text-muted-foreground' : ''}
                `}
              >
                {isCompleted ? <Check size={16} /> : step}
              </button>
            </div>
            
            {index < visibleSteps.length - 1 && (
              <div
                className={`h-1 w-8 sm:w-12 rounded transition-colors duration-300 ${
                  isCompleted ? 'bg-primary/80' : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
      
      {end < totalSteps && <span className="text-muted-foreground ml-2">...</span>}
      <div className="ml-4 text-sm text-muted-foreground font-medium hidden sm:block">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};
