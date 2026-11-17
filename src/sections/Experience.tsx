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
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (checkReducedMotion()) return;

    // Only apply horizontal pin on desktop (screens >= 1024px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!trackRef.current || !sectionRef.current) return;

      const getScrollDistance = () => {
        if (!trackRef.current) return 2500;
        return Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      };

      const pinTween = gsap.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
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
        return <Search className="w-5 h-5 text-[#CB1B29]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#CB1B29]" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#CB1B29]" />;
      case 'Handshake':
        return <Handshake className="w-5 h-5 text-[#CB1B29]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#CB1B29]" />;
      default:
        return <Search className="w-5 h-5 text-[#CB1B29]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#25231F] text-[#EBE9D8] pt-24 pb-32 sm:pt-28 sm:pb-36 lg:pt-28 lg:pb-28 lg:h-screen lg:min-h-[700px] flex flex-col justify-start overflow-hidden border-b border-[#EBE9D8]/15"
    >
      {/* Background Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#EBE9D8 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4 lg:mb-6 shrink-0">
        <SectionHeading
          sectionNumber="03"
          eyebrow="THE DIPLOMATIC JOURNEY"
          title="The Anatomy of Model Diplomacy"
          titleAccent="An Editorial Arc"
          subtitle="From solitary archival research to high-stakes multilateral consensus: trace the transformative arc of a NITAMUN delegate."
          variant="dark"
          className="!mb-0 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:lg:text-4xl [&_p]:text-xs [&_p]:sm:text-sm [&_p]:!mt-2 [&>div.my-4]:!my-2"
        />

        {/* Scroll narrative tip on desktop */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono-tech text-[#CB1B29] tracking-wider uppercase mt-2">
          <span>// SCROLL DOWN TO TRAVERSE THE DIPLOMATIC CHRONOLOGY</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>

      {/* Horizontal Pinned Track Wrapper */}
      <div className="relative w-full overflow-hidden shrink-0">
        <div
          ref={trackRef}
          className="chronology-track flex flex-col lg:flex-row gap-6 lg:gap-8 will-change-transform"
        >
          {experienceStages.map((stage) => (
            <div
              key={stage.step}
              className="w-full max-w-2xl mx-auto lg:max-w-none lg:w-[540px] xl:w-[580px] h-auto lg:h-[385px] shrink-0 bg-[#2D2A26] border border-[#EBE9D8]/20 p-6 sm:p-7 relative flex flex-col justify-between group hover:border-[#CB1B29] transition-colors rounded-xs shadow-xl"
            >
              {/* Huge Stage Number Watermark */}
              <div className="absolute top-2 right-4 font-serif-display text-7xl sm:text-8xl font-bold text-[#EBE9D8]/5 select-none pointer-events-none group-hover:text-[#CB1B29]/10 transition-colors">
                {stage.step}
              </div>

              <div>
                {/* Header: Stage Step & Icon */}
                <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#EBE9D8]/10">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xs border border-[#EBE9D8]/20 flex items-center justify-center bg-[#25231F] shrink-0">
                      {getStageIcon(stage.iconName)}
                    </span>
                    <div>
                      <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#CB1B29] block font-semibold">
                        STAGE {stage.step} OF 05
                      </span>
                      <span className="text-[11px] font-mono-tech text-[#EBE9D8]/60 uppercase">
                        {stage.subtitle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-tech text-[#EBE9D8]/40 tracking-wider">
                    NITAMUN PROTOCOL
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-serif-display text-2xl lg:text-3xl font-bold text-[#EBE9D8] leading-tight mb-2.5">
                  {stage.title}
                </h3>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm text-[#EBE9D8]/80 font-body leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Sovereign Quote */}
                <div className="p-3 bg-[#25231F] border-l-2 border-[#CB1B29] text-xs font-serif-display italic text-[#EBE9D8]/90 mb-4">
                  "{stage.quote}"
                </div>
              </div>

              {/* Bottom Diplomatic Focus */}
              <div className="pt-3 border-t border-[#EBE9D8]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono-tech">
                <div className="text-[#EBE9D8]/70 text-[11px]">
                  <span className="text-[#CB1B29] font-bold">FOCUS:</span> {stage.diplomaticFocus}
                </div>
                <div className="text-[#EBE9D8]/40 uppercase tracking-widest text-[10px]">
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
