import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { conferenceConfig } from '../data/config';
import { WorldMap } from '../components/WorldMap';
import { Button } from '../components/Button';
import { scrollToSection } from '../lib/scroll';
import { checkReducedMotion } from '../lib/animations';
import { useNavigation } from '../context/NavigationContext';
import { ArrowDown, Globe2, Shield, Calendar, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heroEmblemMobile = `${import.meta.env.BASE_URL}emblem-mobile.webp`;
const heroEmblemWebp = `${import.meta.env.BASE_URL}emblem.webp`;
const heroEmblemJpg = `${import.meta.env.BASE_URL}emblem.jpg`;

export const Hero: React.FC = () => {
  const { navigateTo } = useNavigation();
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const emblemWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (checkReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Initial page load choreographed reveal sequence
      // Fast, concurrent choreography: Text elements reveal smoothly while Emblem renders immediately for optimal LCP
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        mapWrapperRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 0.35, scale: 1, duration: 0.9, ease: 'power2.out' },
        0
      )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.1
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          0.15
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.25
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.35
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.45
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.55 },
          0.55
        );

      // 2. Parallax scroll depth effect - desktop only (screens >= 1024px)
      // Avoids scroll jank & composite thrashing on mobile devices
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        if (sectionRef.current && emblemWrapperRef.current && leftColRef.current) {
          gsap.to(emblemWrapperRef.current, {
            y: 40,
            scale: 0.98,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          gsap.to(leftColRef.current, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-canvas-subtle overflow-hidden"
    >
      {/* Background Cartographic Diplomatic World Map Layer spanning initial viewport */}
      <div
        ref={mapWrapperRef}
        className="absolute inset-x-0 top-0 h-[100svh] z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30 sm:opacity-35 select-none"
        aria-hidden="true"
        style={{ contain: 'layout size paint' }}
      >
        <div className="w-[150%] sm:w-[130%] md:w-[115%] lg:w-[105%] max-w-7xl h-full flex items-center justify-center">
          <WorldMap className="w-full h-auto" />
        </div>
      </div>

      {/* Decorative Cartographic Astrolabe Rings — Anchored to fixed 100svh frame to prevent font-swap layout shift */}
      <div
        className="absolute inset-x-0 top-0 h-[100svh] pointer-events-none overflow-hidden flex items-center justify-center select-none"
        aria-hidden="true"
        style={{ contain: 'layout size paint' }}
      >
        <div className="w-[750px] sm:w-[950px] h-[750px] sm:h-[950px] rounded-full border border-[#25231F]/5 shrink-0" />
        <div className="absolute w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full border border-[#CB1B29]/8 border-dashed shrink-0" />
      </div>

      {/* Top Editorial Identifier */}
      <div
        ref={badgeRef}
        className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono-tech text-[#25231F]/70 pt-2"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CB1B29] animate-pulse" />
          <span className="uppercase tracking-widest font-semibold text-[#CB1B29]">
            {conferenceConfig.organizer.chapter}
          </span>
          <span className="hidden sm:inline text-[#25231F]/40">•</span>
          <span className="hidden sm:inline uppercase text-[#25231F]/60">
            {conferenceConfig.dates.mode} Edition
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-[#25231F]/60">
          <div className="hidden md:flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-[#CB1B29]" />
            <span className="font-semibold text-[#25231F]/80">INDIA'S LARGEST ONLINE MUN</span>
          </div>
          <span className="font-semibold text-[#25231F] px-2 py-0.5 bg-[#F6F4EB] border border-[#25231F]/15">
            {conferenceConfig.dates.displayDate}
          </span>
        </div>
      </div>

      {/* Center Stage: Balanced Two-Column Composition */}
      <div className="relative z-10 my-auto py-6 sm:py-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN — CONFERENCE INTRODUCTION (7 COLS)
              ========================================================================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 xl:col-span-7 text-left space-y-5 sm:space-y-6 order-2 lg:order-1 will-change-transform"
          >
            {/* National Positioning & Format Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#CB1B29]/10 border border-[#CB1B29]/30 text-xs font-mono-tech tracking-widest uppercase text-[#CB1B29] font-bold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29] animate-pulse" />
                <span>INDIA'S LARGEST ONLINE MUN</span>
              </div>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#25231F]/30" />
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#F6F4EB]/95 border border-[#25231F]/20 backdrop-blur-sm text-[11px] font-mono-tech tracking-wider uppercase text-[#25231F]/85">
                <Sparkles className="w-3.5 h-3.5 text-[#CB1B29]" />
                <span>4th Flagship Edition</span>
              </div>
            </div>

            {/* Large Editorial Heading */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-serif-display font-bold tracking-tight text-[#25231F] leading-none select-none drop-shadow-xs"
            >
              NITAMUN{' '}
              <span className="text-[#CB1B29] font-editorial italic font-normal">
                {conferenceConfig.editionRoman}
              </span>
            </h1>

            {/* Conference Tagline */}
            <div
              ref={taglineRef}
              className="font-serif-display italic text-2xl sm:text-3xl xl:text-4xl text-[#25231F]/90 font-normal tracking-wide"
            >
              "{conferenceConfig.tagline}"
            </div>

            {/* Editorial Lead Paragraph - Official Positioning */}
            <p
              ref={introRef}
              className="text-sm sm:text-base md:text-lg text-[#25231F]/85 font-body font-light leading-relaxed max-w-xl"
            >
              Organised by MUNSOC, National Institute of Technology Agartala. 
              Bringing together students and working professionals to experience diplomacy, debate, 
              and international relations in an authentic virtual parliamentary setting.
            </p>

            {/* Calls to Action */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigateTo('registration')}
                withArrow
                className="shadow-md"
              >
                Registration Details — Early Bird ₹400
              </Button>
              <Button
                variant="editorial"
                size="lg"
                onClick={() => navigateTo('events')}
              >
                View Important Dates & Fees
              </Button>
            </div>

            {/* Subtle Metadata Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[#25231F]/70">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#CB1B29]" />
                <span className="font-semibold text-[#25231F]">{conferenceConfig.dates.displayDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#CB1B29]" />
                <span className="uppercase">{conferenceConfig.dates.mode} Conference</span>
              </div>
              <span>•</span>
              <span>MUNSOC NIT AGARTALA</span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN — OFFICIAL ANIMATED EMBLEM PRESENTATION (5 COLS)
              Moved slightly upward to align parallel with heading & tagline on left
              Hover transparency bug resolved: stays 100% visible on hover
              ========================================================================= */}
          <div
            ref={emblemWrapperRef}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 will-change-transform relative lg:-translate-y-4 xl:-translate-y-8"
          >
            {/* Ambient Radial Maroon & Gold Glow */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#700F2B]/35 via-[#CB1B29]/20 to-[#B8860B]/15 blur-3xl pointer-events-none animate-pulse-glow" />

            {/* Delicate Astrolabe Diplomatic Orbit Lines */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-[#CB1B29]/25 border-dashed pointer-events-none animate-spin-slow" />
            <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-[#CB1B29]/35 pointer-events-none" />

            {/* Main Emblem Circular Container with Gentle Floating Animation on Desktop */}
            <div
              className="official-emblem relative w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[410px] lg:h-[410px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden shadow-2xl shadow-[#25231F]/40 bg-[#700F2B] border-2 border-[#EBE9D8]/50 sm:animate-emblem-float group opacity-100 transition-opacity"
              style={{ opacity: 1 }}
            >
              {/* The Official NITAMUN Emblem Image */}
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={heroEmblemMobile} type="image/webp" />
                <source srcSet={heroEmblemWebp} type="image/webp" />
                <img
                  src={heroEmblemJpg}
                  alt="NITAMUN 4.0 Official Emblem"
                  width={450}
                  height={450}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover scale-[1.06] select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 !opacity-100"
                  style={{ opacity: 1 }}
                />
              </picture>

              {/* Restrained Golden Shimmer Sweep across Phoenix & Laurels */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-100/25 to-transparent animate-golden-shimmer pointer-events-none" />
              </div>
            </div>

            {/* Official Diplomatic Seal Badge Tag */}
            <div className="mt-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F4EB]/95 border border-[#25231F]/15 text-xs font-mono-tech text-[#25231F]/80 tracking-widest uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#CB1B29] animate-pulse shrink-0" />
              <Shield className="w-3.5 h-3.5 text-[#CB1B29] shrink-0" />
              <span className="font-semibold text-[#25231F]">OFFICIAL DIPLOMATIC EMBLEM</span>
              <span className="text-[#25231F]/40">•</span>
              <span className="text-[#CB1B29] font-bold">EDITION IV</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#25231F]/60"
      >
        <div className="hidden sm:block">
          MUNSOC NIT AGARTALA // ONLINE DIPLOMATIC ASSEMBLY
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('#experience')}
          className="group mx-auto sm:mx-0 flex items-center gap-2 text-[#25231F]/75 hover:text-[#CB1B29] transition-colors cursor-pointer"
          aria-label="Scroll to conference experience"
        >
          <span className="uppercase tracking-widest text-[11px] font-medium">
            SCROLL TO TRAVERSE THE ARC
          </span>
          <span className="w-5 h-5 rounded-full border border-[#25231F]/30 flex items-center justify-center group-hover:border-[#CB1B29] group-hover:translate-y-0.5 transition-all">
            <ArrowDown className="w-3 h-3 text-[#CB1B29]" />
          </span>
        </button>

        <div className="hidden sm:block text-right">
          {conferenceConfig.dates.displayDate.toUpperCase()} • ONLINE
        </div>
      </div>
    </section>
  );
};
