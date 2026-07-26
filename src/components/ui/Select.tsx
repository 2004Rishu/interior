import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, helperText, options, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <select
          ref={ref}
          className={cn(
            'flex h-12 w-full border-b border-border bg-transparent px-3 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
            error && 'border-red-500 focus-visible:border-red-500',
            className
          )}
          {...props}
        >
          <option value="" disabled>Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-background text-foreground">
              {opt.label}
            </option>
          ))}
        </select>
        {helperText && (
          <p className={cn('text-xs', error ? 'text-red-500' : 'text-muted-foreground')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
