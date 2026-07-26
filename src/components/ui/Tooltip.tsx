import React, { HTMLAttributes, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className, ...props }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={cn(
              "absolute z-50 -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary shadow-sm whitespace-nowrap pointer-events-none",
              className
            )}
            {...props}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
