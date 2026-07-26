import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-muted text-foreground',
      outline: 'text-foreground',
      success: 'border-transparent bg-sage-200 text-charcoal-900',
      warning: 'border-transparent bg-amber-100 text-amber-900',
      destructive: 'border-transparent bg-red-100 text-red-900',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center border px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
