import React from 'react';
import { cn } from '../lib/utils';

export interface StatusBadgeProps {
  label: string;
  variant?: 'crimson' | 'charcoal' | 'subtle';
  isPulsing?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'crimson',
  isPulsing = true,
  className,
}) => {
  const variantStyles = {
    crimson: 'text-[#CB1B29] border-[#CB1B29]/30 bg-[#CB1B29]/8',
    charcoal: 'text-[#25231F] border-[#25231F]/20 bg-[#25231F]/5',
    subtle: 'text-[#6B655D] border-[#DCD8C5] bg-[#F6F4EB]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono-tech tracking-wider uppercase border',
        variantStyles[variant],
        className
      )}
    >
      {isPulsing && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CB1B29] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#CB1B29]"></span>
        </span>
      )}
      {label}
    </span>
  );
};
