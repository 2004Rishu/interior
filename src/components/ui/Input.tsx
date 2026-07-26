import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full border-b border-border bg-transparent px-3 py-2 text-sm text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:border-red-500',
            className
          )}
          {...props}
        />
        {helperText && (
          <p className={cn('text-xs', error ? 'text-red-500' : 'text-muted-foreground')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
