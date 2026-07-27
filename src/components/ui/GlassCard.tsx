import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`
        bg-white/40 dark:bg-black/40 
        backdrop-blur-xl 
        border border-white/20 dark:border-white/10 
        shadow-sm rounded-2xl p-6
        ${hoverEffect ? 'transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
