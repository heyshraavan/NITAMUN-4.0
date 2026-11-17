import React, { useEffect, useRef } from 'react';
import { principalExecutives, additionalSecretariatMembers } from '../data/secretariat';
import { ExecutiveCard } from './ExecutiveCard';
import { SecretariatMemberCard } from './SecretariatMemberCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { checkReducedMotion } from '../lib/animations';

gsap.registerPlugin(ScrollTrigger);

export const ExecutiveLeadership: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(
        '.executive-card-item',
        {
          y: 24,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="executive-secretariat"
      className="my-24 sm:my-28"
      aria-label="Executive Secretariat Leadership"
    >
      {/* 1. Section Header (Matching Editorial Aesthetic) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6 pb-6 border-b border-[#25231F]/15">
        <div className="max-w-3xl">
          <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block mb-2">
            // LEADERSHIP &amp; DIPLOMATIC OVERSIGHT
          </span>
          <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25231F] tracking-tight">
            The Executive Secretariat
          </h3>
          <p className="text-sm sm:text-base text-[#25231F]/80 font-body leading-relaxed mt-3">
            The leadership steering NITAMUN 4.0, bringing together vision, coordination and diplomatic purpose.
          </p>
        </div>

        {/* Administrative Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#F6F4EB] border border-[#25231F]/15 rounded-xs text-xs font-mono-tech text-[#25231F]/70">
          <span className="w-2 h-2 rounded-full bg-[#CB1B29]" />
          <span className="font-bold">SECRETARIAT BOARD</span>
          <span>// 4 PRINCIPALS</span>
        </div>
      </div>

      {/* 2. Tier 1: Principal Executives Showcase (Single row of 4 columns on desktop >= lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
        {principalExecutives.map((executive) => (
          <ExecutiveCard key={executive.id} executive={executive} />
        ))}
      </div>

      {/* 3. Tier 2: Additional Secretariat Members (Data-driven expansion container) */}
      {additionalSecretariatMembers.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#25231F]/15">
          <div className="mb-8">
            <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block mb-1">
              // OPERATIONS &amp; COORDINATION CORPS
            </span>
            <h4 className="font-serif-display text-2xl font-bold text-[#25231F]">
              Secretariat Departmental Leads
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {additionalSecretariatMembers.map((member) => (
              <SecretariatMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
