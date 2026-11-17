import React, { useEffect, useRef } from 'react';
import { principalExecutives, secretariatMembers } from '../data/secretariat';
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
      // Helper: check if element is already within viewport on initial mount / reload
      const isAlreadyVisible = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };

      const execTrigger = document.getElementById('executive-tier-grid');
      const secTrigger = document.getElementById('secretariat-tier-grid');

      // 1. Reveal Executive cards
      if (execTrigger && isAlreadyVisible(execTrigger)) {
        gsap.set('.executive-card-item', { opacity: 1, y: 0, clearProps: 'all' });
      } else {
        gsap.fromTo(
          '.executive-card-item',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
            clearProps: 'all',
            onComplete: () => {
              gsap.set('.executive-card-item', { clearProps: 'all' });
            },
            scrollTrigger: {
              trigger: '#executive-tier-grid',
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 2. Reveal Secretariat cards
      if (secTrigger && isAlreadyVisible(secTrigger)) {
        gsap.set('.secretariat-card-item', { opacity: 1, y: 0, clearProps: 'all' });
      } else {
        gsap.fromTo(
          '.secretariat-card-item',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: 'power2.out',
            clearProps: 'all',
            onComplete: () => {
              gsap.set('.secretariat-card-item', { clearProps: 'all' });
            },
            scrollTrigger: {
              trigger: '#secretariat-tier-grid',
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="executive-secretariat"
      className="my-24 sm:my-28 scroll-mt-28 sm:scroll-mt-32 pt-2"
      aria-label="Executive Leadership and Secretariat"
    >
      {/* ========================================================
          TIER ONE — THE EXECUTIVES
          Senior Leadership: Four large prominent cards in 1 row
          ======================================================== */}
      <div>
        {/* Tier 1 Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6 pb-6 border-b border-[#25231F]/15">
          <div className="max-w-3xl">
            <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block mb-2">
              // PRINCIPAL DIPLOMATIC OVERSIGHT
            </span>
            <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25231F] tracking-tight">
              The Executives
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

        {/* Tier 1 Grid: 4 columns on desktop */}
        <div
          id="executive-tier-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch"
        >
          {principalExecutives.map((executive) => (
            <ExecutiveCard key={executive.id} executive={executive} />
          ))}
        </div>
      </div>

      {/* ========================================================
          SUBTLE TIER TRANSITION / RESTRAINED DIVIDER
          ======================================================== */}
      <div className="relative my-14 sm:my-18 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#25231F]/15" />
        </div>
        <div className="relative px-4 bg-[#EBE9D8] text-[10px] font-mono-tech uppercase text-[#25231F]/50 tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29]" />
          <span>NITAMUN 4.0 LEADERSHIP CONTINUUM</span>
        </div>
      </div>

      {/* ========================================================
          TIER TWO — THE SECRETARIAT
          Under Secretary Generals (USGs) and Core Members.
          Significantly smaller, compact profile cards.
          Strict desktop requirement: Exactly six cards in ONE row (6 cols).
          ======================================================== */}
      <div>
        {/* Tier 2 Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-6 pb-5 border-b border-[#25231F]/15">
          <div className="max-w-3xl">
            <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block mb-2">
              // ORGANISING TEAM &amp; DEPARTMENTAL LEADS
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25231F] tracking-tight">
              The Secretariat
            </h3>
            <p className="text-xs sm:text-sm text-[#25231F]/80 font-body leading-relaxed mt-2">
              The team working behind the scenes to bring every aspect of NITAMUN 4.0 together.
            </p>
          </div>

          {/* Departmental Count Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#F6F4EB] border border-[#25231F]/15 rounded-xs text-xs font-mono-tech text-[#25231F]/70">
            <span className="w-2 h-2 rounded-full bg-[#CB1B29]" />
            <span className="font-bold">SECRETARIAT CORPS</span>
            <span>// {secretariatMembers.length} APPOINTMENTS</span>
          </div>
        </div>

        {/* Tier 2 Grid: Exactly 6 columns in ONE horizontal row on desktop (>= lg), 3 cols on tablet (md), 2 cols on mobile/small */}
        <div
          id="secretariat-tier-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 xl:gap-4 items-stretch"
        >
          {secretariatMembers.map((member) => (
            <SecretariatMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};
