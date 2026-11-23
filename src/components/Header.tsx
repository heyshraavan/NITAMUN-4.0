import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigation } from '../context/NavigationContext';
import { conferenceConfig, NavDestinationId } from '../data/config';
import { lockBackgroundScroll, unlockBackgroundScroll } from '../lib/scroll';
import { prefetchRoute } from '../lib/prefetch';
import { Button } from './Button';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import officialEmblem from '../assets/emblem-sm.jpg';
import officialEmblemWebp from '../assets/emblem-sm.webp';

export const Header: React.FC = () => {
  const { currentDestination, navigateTo } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 25);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scrolling and support Escape key when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    lockBackgroundScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockBackgroundScroll();
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on desktop resize to prevent scroll-lock desync
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (id: NavDestinationId) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#EBE9D8]/95 backdrop-blur-md border-b border-[#25231F]/15 py-2.5 sm:py-3 shadow-xs'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* 1. Left Brand: Official Logo + Wordmark (Clickable, links to Home) */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer select-none"
            aria-label="NITAMUN 4.0 Home"
          >
            {/* Official Oval Emblem Frame */}
            <div className="official-emblem relative w-12 h-9 sm:w-13 sm:h-9.5 md:w-14 md:h-10 rounded-[50%] overflow-hidden border border-[#CB1B29]/40 shadow-xs group-hover:border-[#CB1B29] transition-all shrink-0 bg-[#66091c] p-0.5 flex items-center justify-center">
              <picture className="w-full h-full block">
                <source srcSet={officialEmblemWebp} type="image/webp" />
                <img
                  src={officialEmblem}
                  alt="NITAMUN 4.0 Official Emblem"
                  width={48}
                  height={44}
                  loading="eager"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 !opacity-100"
                />
              </picture>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#25231F] leading-none">
                  {conferenceConfig.name}
                </span>
                <span className="text-[11px] font-mono-tech font-semibold px-1.5 py-0.5 rounded-xs bg-[#CB1B29] text-[#EBE9D8] leading-none">
                  {conferenceConfig.editionRoman}
                </span>
              </div>
              <span className="text-[10px] font-mono-tech tracking-wider text-[#25231F]/65 uppercase leading-tight mt-0.5">
                {conferenceConfig.organizer.name} • {conferenceConfig.organizer.shortInstitute}
              </span>
            </div>
          </button>

          {/* 2. Primary Desktop Navigation Links: All 6 Destinations */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F6F4EB]/90 backdrop-blur-sm border border-[#25231F]/15 px-3.5 py-1.5 rounded-full shadow-2xs">
            {conferenceConfig.destinations.map((dest) => {
              const isActive = currentDestination === dest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => handleNavClick(dest.id)}
                  onMouseEnter={() => prefetchRoute(dest.id)}
                  onTouchStart={() => prefetchRoute(dest.id)}
                  className={`relative px-3.5 py-1 text-xs font-heading font-medium tracking-wider uppercase transition-all rounded-full cursor-pointer select-none ${
                    isActive
                      ? 'text-[#EBE9D8] bg-[#CB1B29] font-semibold shadow-xs'
                      : 'text-[#25231F]/80 hover:text-[#CB1B29] hover:bg-[#25231F]/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {dest.label}
                  {dest.badge && !isActive && (
                    <span className="ml-1 text-[9px] font-mono-tech px-1 py-0.2 rounded-xs bg-[#CB1B29]/15 text-[#CB1B29]">
                      {dest.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Right Action: Direct Registration CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              variant={currentDestination === 'registration' ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => handleNavClick('registration')}
              onMouseEnter={() => prefetchRoute('registration')}
              onTouchStart={() => prefetchRoute('registration')}
              withArrow
              className="hidden sm:inline-flex"
            >
              {currentDestination === 'registration' ? 'Active Portal' : 'Register Now'}
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xs border border-[#25231F]/20 text-[#25231F] hover:text-[#CB1B29] hover:border-[#CB1B29] bg-[#F6F4EB] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 4. Responsive Mobile Navigation Drawer - rendered via portal to prevent backdrop-blur clipping */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="lg:hidden fixed inset-0 bg-[#EBE9D8] z-[60] flex flex-col overflow-hidden animate-in fade-in duration-200 h-screen h-[100dvh]"
        >
          {/* Mobile Menu Top Bar — FIXED (flex-shrink-0) */}
          <div className="flex-shrink-0 flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-[#25231F]/15 bg-[#F6F4EB]">
            <div className="flex items-center gap-3">
              <div className="official-emblem w-11 h-8 rounded-[50%] overflow-hidden border border-[#CB1B29] bg-[#66091c] p-0.5 shrink-0 flex items-center justify-center">
                <picture className="w-full h-full block">
                  <source srcSet={officialEmblemWebp} type="image/webp" />
                  <img
                    src={officialEmblem}
                    alt="NITAMUN 4.0 Emblem"
                    width={40}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </picture>
              </div>
              <div>
                <span className="font-serif-display text-xl font-bold tracking-tight text-[#25231F]">
                  {conferenceConfig.name} {conferenceConfig.editionRoman}
                </span>
                <span className="block text-[10px] font-mono-tech text-[#CB1B29] uppercase">
                  {conferenceConfig.organizer.chapter}
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xs border border-[#25231F]/20 text-[#25231F] hover:text-[#CB1B29] hover:border-[#CB1B29] bg-[#EBE9D8] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Destinations Index — SCROLLABLE (flex-1 min-h-0) with native touch scrolling */}
          <div
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-4 overscroll-contain"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
          >
            <div className="text-[11px] font-mono-tech tracking-widest text-[#CB1B29] uppercase">
              // Navigation Index
            </div>

            <nav className="flex flex-col space-y-2.5">
              {conferenceConfig.destinations.map((dest, index) => {
                const isActive = currentDestination === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => handleNavClick(dest.id)}
                    onMouseEnter={() => prefetchRoute(dest.id)}
                    onTouchStart={() => prefetchRoute(dest.id)}
                    className={`flex items-center justify-between text-left py-3 px-3.5 rounded-xs border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#25231F] text-[#EBE9D8] border-[#25231F]'
                        : 'bg-[#F6F4EB] text-[#25231F] border-[#25231F]/10 hover:border-[#CB1B29]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono-tech text-xs ${isActive ? 'text-[#CB1B29]' : 'text-[#25231F]/40'}`}>
                        0{index + 1}
                      </span>
                      <span className="font-serif-display text-xl sm:text-2xl font-medium">
                        {dest.label}
                      </span>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-[#CB1B29]' : 'text-[#25231F]/30'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Info & Action — FIXED (flex-shrink-0) */}
          <div
            className="flex-shrink-0 p-5 sm:p-6 pt-4 border-t border-[#25231F]/15 bg-[#F6F4EB] space-y-3"
            style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <div className="text-xs font-mono-tech text-[#25231F]/70">
              {conferenceConfig.organizer.chapter} • {conferenceConfig.organizer.shortInstitute}
              <div className="text-[11px] mt-0.5 text-[#CB1B29] font-bold">
                {conferenceConfig.dates.displayDate} • {conferenceConfig.dates.mode}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => handleNavClick('registration')}
              className="w-full text-center"
              withArrow
            >
              View Registration Details
            </Button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
