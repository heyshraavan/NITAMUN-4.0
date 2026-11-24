import React from 'react';
import { cn } from '../lib/utils';

export interface SectionHeadingProps {
  sectionNumber?: string;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark';
  className?: string;
  as?: 'h1' | 'h2';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  sectionNumber,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = 'left',
  variant = 'light',
  className,
  as = 'h2',
}) => {
  const isDark = variant === 'dark';
  const HeadingTag = as;

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-5xl',
        className
      )}
    >
      {/* Eyebrow & Section Index */}
      {(sectionNumber || eyebrow) && (
        <div
          className={cn(
            'flex items-center gap-2 mb-3 text-xs font-mono-tech tracking-widest uppercase text-[#CB1B29]',
            align === 'center' ? 'justify-center' : 'justify-start'
          )}
        >
          {sectionNumber && (
            <span
              className={cn(
                'font-normal',
                isDark ? 'text-[#EBE9D8]/50' : 'text-[#25231F]/50'
              )}
            >
              [{sectionNumber}]
            </span>
          )}
          {sectionNumber && eyebrow && (
            <span className="w-4 h-[1px] bg-[#CB1B29]/40 inline-block" />
          )}
          {eyebrow && <span className="font-semibold">{eyebrow}</span>}
        </div>
      )}

      {/* Main Editorial Heading */}
      <HeadingTag
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display font-normal tracking-tight leading-[1.12]',
          isDark ? 'text-[#EBE9D8]' : 'text-[#25231F]'
        )}
      >
        <span>{title}</span>
        {titleAccent && (
          <span className="block text-[#CB1B29] italic font-editorial mt-1 sm:mt-1.5">
            {titleAccent}
          </span>
        )}
      </HeadingTag>

      {/* Diplomatic subtle underline accent */}
      <div
        className={cn(
          'flex items-center gap-1.5 my-4',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
      >
        <div className="w-12 h-[1.5px] bg-[#CB1B29]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#CB1B29]" />
        <div
          className={cn(
            'w-24 h-[1px]',
            isDark ? 'bg-[#EBE9D8]/20' : 'bg-[#25231F]/15'
          )}
        />
      </div>

      {/* Subtitle / Lead Paragraph */}
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg font-body font-light leading-relaxed max-w-2xl',
            isDark ? 'text-[#EBE9D8]/80' : 'text-[#25231F]/80'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
