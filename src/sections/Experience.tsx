import React, { useEffect, useRef } from 'react';
import { experienceStages } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { checkReducedMotion } from '../lib/animations';
import { Search, UserCheck, Mic, Handshake, FileCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (checkReducedMotion()) return;

    // Only apply horizontal pin on desktop (screens >= 1024px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!trackRef.current || !triggerRef.current) return;

      const getScrollDistance = () => {
        if (!trackRef.current) return 3000;
        return Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 96);
      };

      const pinTween = gsap.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        pinTween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-6 h-6 text-[#CB1B29]" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#CB1B29]" />;
      case 'Mic':
        return <Mic className="w-6 h-6 text-[#CB1B29]" />;
      case 'Handshake':
        return <Handshake className="w-6 h-6 text-[#CB1B29]" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-[#CB1B29]" />;
      default:
        return <Search className="w-6 h-6 text-[#CB1B29]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#25231F] text-[#EBE9D8] py-24 sm:py-32 overflow-hidden border-b border-[#EBE9D8]/15"
    >
      {/* Background Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#EBE9D8 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <SectionHeading
          sectionNumber="03"
          eyebrow="THE DIPLOMATIC JOURNEY"
          title="The Anatomy of Model Diplomacy"
          titleAccent="An Editorial Arc"
          subtitle="From solitary archival research to high-stakes multilateral consensus: trace the transformative arc of a NITAMUN delegate."
          variant="dark"
        />

        {/* Scroll narrative tip on desktop */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29] tracking-wider uppercase">
          <span>// SCROLL DOWN TO TRAVERSE THE DIPLOMATIC CHRONOLOGY</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>

      {/* Horizontal Pinned Track Wrapper */}
      <div ref={triggerRef} className="relative w-full">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-4 sm:px-6 lg:px-12 will-change-transform"
        >
          {experienceStages.map((stage) => (
            <div
              key={stage.step}
              className="w-full lg:w-[750px] shrink-0 bg-[#2D2A26] border border-[#EBE9D8]/20 p-8 sm:p-12 relative flex flex-col justify-between group hover:border-[#CB1B29] transition-colors"
            >
              {/* Huge Stage Number Watermark */}
              <div className="absolute top-4 right-6 font-serif-display text-7xl sm:text-9xl font-bold text-[#EBE9D8]/5 select-none pointer-events-none group-hover:text-[#CB1B29]/10 transition-colors">
                {stage.step}
              </div>

              <div>
                {/* Header: Stage Step & Icon */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EBE9D8]/10">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xs border border-[#EBE9D8]/20 flex items-center justify-center bg-[#25231F]">
                      {getStageIcon(stage.iconName)}
                    </span>
                    <div>
                      <span className="text-xs font-mono-tech uppercase tracking-widest text-[#CB1B29] block">
                        STAGE {stage.step} OF 05
                      </span>
                      <span className="text-xs font-mono-tech text-[#EBE9D8]/60 uppercase">
                        {stage.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono-tech text-[#EBE9D8]/40">
                    NITAMUN PROTOCOL
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EBE9D8] leading-tight mb-4">
                  {stage.title}
                </h3>

                {/* Narrative Description */}
                <p className="text-base sm:text-lg text-[#EBE9D8]/80 font-body leading-relaxed mb-8">
                  {stage.description}
                </p>

                {/* Sovereign Quote */}
                <div className="p-4 bg-[#25231F] border-l-2 border-[#CB1B29] text-sm font-serif-display italic text-[#EBE9D8]/90 mb-6">
                  "{stage.quote}"
                </div>
              </div>

              {/* Bottom Diplomatic Focus */}
              <div className="pt-6 border-t border-[#EBE9D8]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-tech">
                <div className="text-[#EBE9D8]/60">
                  <span className="text-[#CB1B29] font-bold">FOCUS:</span> {stage.diplomaticFocus}
                </div>
                <div className="text-[#EBE9D8]/40 uppercase tracking-widest">
                  PHASE {stage.step}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
