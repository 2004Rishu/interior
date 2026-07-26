import React, { HTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, onValueChange, className, children, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <div className={cn('w-full', className)} {...props} data-active-tab={activeTab}>
      {children}
    </div>
  );
}

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center border-b border-border', className)} {...props} />
  )
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground',
          className
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 focus-visible:outline-none', className)}
        {...props}
      />
    );
  }
);
TabsContent.displayName = 'TabsContent';
