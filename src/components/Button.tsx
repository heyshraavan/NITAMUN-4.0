import React from 'react';
import { cn } from '../lib/utils';
import { ArrowUpRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'editorial';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  withArrow = false,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-heading font-medium tracking-wide transition-all duration-300 select-none cursor-pointer focus:outline-none max-w-full text-center';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 uppercase tracking-wider',
    md: 'text-sm px-5 py-2.5 gap-2 uppercase tracking-wider',
    lg: 'text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 gap-2 sm:gap-2.5 tracking-wider font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#CB1B29] text-[#EBE9D8] border border-[#A51420] shadow-sm hover:bg-[#A51420] hover:shadow-md active:translate-y-0.5',
    secondary:
      'bg-[#25231F] text-[#EBE9D8] border border-[#25231F] hover:bg-[#3D3934] active:translate-y-0.5',
    outline:
      'bg-transparent text-[#25231F] border border-[#25231F]/30 hover:border-[#CB1B29] hover:text-[#CB1B29] hover:bg-[#CB1B29]/5 active:translate-y-0.5',
    ghost:
      'bg-transparent text-[#25231F] hover:text-[#CB1B29] p-0 hover:bg-transparent',
    editorial:
      'bg-[#F6F4EB] text-[#25231F] border border-[#DCD8C5] hover:border-[#CB1B29] hover:text-[#CB1B29] shadow-xs active:translate-y-0.5',
  };

  const content = (
    <>
      <span className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 text-center">
        {children}
        {withArrow && (
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
};
