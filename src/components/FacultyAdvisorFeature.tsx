import React from 'react';
import drGyanabatiWebp from '../assets/secretariat/dr-gyanabati-khuraijam.webp';
import drGyanabatiJpg from '../assets/secretariat/dr-gyanabati-khuraijam.jpg';
import { aboutUsContent } from '../data/content';

export const FacultyAdvisorFeature: React.FC = () => {
  const { facultyAdvisor } = aboutUsContent;

  return (
    <article
      className="faculty-advisor-feature relative bg-[#F6F4EB] border border-[#25231F]/15 border-t-2 sm:border-t-4 border-t-[#CB1B29] p-5 sm:p-6 pb-4 sm:pb-5 rounded-xs overflow-hidden transition-all duration-300 shadow-xs"
      aria-labelledby="faculty-advisor-name"
    >
      {/* Subtle botanical line art watermark in corner — graceful, hairline, strictly secondary */}
      <svg
        aria-hidden="true"
        className="absolute -top-3 -right-3 w-28 h-28 text-[#CB1B29] opacity-[0.08] pointer-events-none transform rotate-12"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 95 C50 65, 65 40, 85 25" />
        <path d="M50 95 C50 65, 35 40, 15 25" />
        <path d="M50 80 C60 70, 72 68, 78 58 C70 56, 58 64, 50 80" />
        <path d="M50 80 C40 70, 28 68, 22 58 C30 56, 42 64, 50 80" />
        <path d="M55 60 C68 52, 76 46, 82 34 C72 35, 62 45, 55 60" />
        <path d="M45 60 C32 52, 24 46, 18 34 C28 35, 38 45, 45 60" />
        <path d="M53 40 C65 30, 70 22, 75 10 C66 14, 58 24, 53 40" />
        <path d="M47 40 C35 30, 30 22, 25 10 C34 14, 42 24, 47 40" />
        <path d="M50 25 C50 15, 50 8, 50 5" />
      </svg>

      {/* 1. Header Eyebrow Label (Clean, left-aligned) */}
      <div className="flex items-center gap-2 border-b border-[#25231F]/10 pb-2.5 mb-3.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29]" aria-hidden="true" />
        <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest">
          {facultyAdvisor.label}
        </span>
      </div>

      {/* 2. Compact Asymmetric Layout: Portrait & Academic Credentials */}
      <div className="flex flex-row gap-4 sm:gap-5 items-start">
        {/* Rectangular Portrait Frame with subtle dusty-crimson hairline accent */}
        <div className="w-24 sm:w-28 md:w-30 shrink-0">
          <div className="p-1 bg-[#EBE9D8] border border-[#CB1B29]/25 shadow-2xs">
            <picture className="w-full aspect-[4/5] block overflow-hidden bg-[#25231F]/5">
              <source srcSet={drGyanabatiWebp} type="image/webp" />
              <img
                src={drGyanabatiJpg}
                alt="Dr. Gyanabati Khuraijam — Faculty Advisor, MUNSOC NIT Agartala"
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>
        </div>

        {/* Academic Credentials */}
        <div className="flex-1 min-w-0">
          <h3
            id="faculty-advisor-name"
            className="font-serif-display text-xl sm:text-2xl font-bold text-[#25231F] leading-tight mb-1 tracking-tight"
          >
            {facultyAdvisor.name}
          </h3>

          <div className="text-xs sm:text-sm font-semibold text-[#CB1B29] font-body tracking-wide mb-1">
            {facultyAdvisor.designation}
          </div>

          <div className="text-xs text-[#25231F]/80 font-body leading-snug">
            {facultyAdvisor.department}
          </div>
        </div>
      </div>

      {/* 3. Formal Acknowledgement Paragraph */}
      <div className="pt-3 mt-3 border-t border-[#25231F]/10">
        <blockquote className="text-xs sm:text-[13px] font-body text-[#25231F]/85 leading-relaxed italic border-l-2 border-[#CB1B29]/40 pl-3 py-0.5">
          &ldquo;{facultyAdvisor.acknowledgement}&rdquo;
        </blockquote>
      </div>

      {/* 4. Areas of Academic Interest */}
      <div className="pt-2.5 mt-2.5 border-t border-[#25231F]/10">
        <span className="text-[10px] font-mono-tech uppercase text-[#25231F]/50 tracking-wider font-bold block mb-1">
          ACADEMIC INTERESTS
        </span>
        <p className="text-[11px] sm:text-xs text-[#25231F]/75 font-body leading-relaxed">
          {facultyAdvisor.academicInterests.join(' · ')}
        </p>
      </div>

      {/* 5. Footer with Discreet LinkedIn Link (Ends naturally with no trailing void) */}
      <div className="pt-2.5 mt-2.5 border-t border-[#25231F]/10 flex items-center justify-end">
        <a
          href={facultyAdvisor.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${facultyAdvisor.name}'s profile on LinkedIn`}
          className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#25231F]/80 hover:text-[#CB1B29] py-1.5 px-3 bg-[#EBE9D8] hover:bg-[#E2DFC9] border border-[#25231F]/20 hover:border-[#CB1B29]/60 transition-all rounded-xs shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB1B29]"
        >
          <svg
            className="w-3.5 h-3.5 fill-current text-[#25231F]/70 group-hover:text-[#CB1B29] transition-colors shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74V10.13H5.07v8.37h2.78z" />
          </svg>
          <span>LinkedIn Profile</span>
        </a>
      </div>
    </article>
  );
};
