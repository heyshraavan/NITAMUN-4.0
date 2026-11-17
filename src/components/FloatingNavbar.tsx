import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigation } from '../context/NavigationContext';
import { conferenceConfig, NavDestinationId } from '../data/config';
import { lockBackgroundScroll, unlockBackgroundScroll } from '../lib/scroll';
import { prefetchRoute } from '../lib/prefetch';
import { Home, Info, Calendar, Users, Ticket, Mail, X, ChevronUp, ArrowUpRight } from 'lucide-react';

export const FloatingNavbar: React.FC = () => {
  const { currentDestination, navigateTo } = useNavigation();
  const [isDockHovered, setIsDockHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const getDestinationIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Home':
        return <Home className={className} />;
      case 'Info':
        return <Info className={className} />;
      case 'Calendar':
        return <Calendar className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Ticket':
        return <Ticket className={className} />;
      case 'Mail':
        return <Mail className={className} />;
      default:
        return <Home className={className} />;
    }
  };

  const handleSelect = (id: NavDestinationId) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  const activeDest = conferenceConfig.destinations.find((d) => d.id === currentDestination) || conferenceConfig.destinations[0];

  return (
    <>
      {/* =========================================================================
          1. DESKTOP FLOATING NAVIGATION (Screens >= md)
          - Default: Compact dark charcoal pill (#25231F) with ICONS ONLY and 
            crimson circular active indicator (#CB1B29). No text labels visible by default.
          - On cursor hover: Expands smoothly to reveal destination names beside icons.
          - On mouse leave: Collapses back to icons-only compact state.
          ========================================================================= */}
      <nav
        aria-label="Floating Primary Navigation"
        onMouseEnter={() => setIsDockHovered(true)}
        onMouseLeave={() => setIsDockHovered(false)}
        style={{
          transform: 'translate3d(-50%, 0, 0)',
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        }}
        className="hidden md:flex fixed left-1/2 z-40 items-center gap-1.5 p-2 bg-[#25231F] text-[#EBE9D8] rounded-full border border-[#EBE9D8]/20 shadow-2xl shadow-black/60 backdrop-blur-xl select-none will-change-transform transition-[background-color,border-color,box-shadow] duration-300 ease-out"
      >
        {conferenceConfig.destinations.map((dest, idx) => {
          const isActive = currentDestination === dest.id;

          return (
            <button
              key={dest.id}
              onClick={() => handleSelect(dest.id)}
              onMouseEnter={() => prefetchRoute(dest.id)}
              onTouchStart={() => prefetchRoute(dest.id)}
              aria-label={`${dest.label} — Destination 0${idx + 1}`}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative flex items-center justify-center rounded-full text-xs font-heading font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB1B29] ${
                isDockHovered ? 'px-3.5 py-2' : 'w-10 h-10 p-2'
              } ${
                isActive
                  ? 'bg-[#CB1B29] text-[#EBE9D8] shadow-sm font-semibold'
                  : 'text-[#EBE9D8]/80 hover:text-[#EBE9D8] hover:bg-[#EBE9D8]/10'
              }`}
            >
              {/* Icon Container with subtle scale on hover */}
              <span className="relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                {getDestinationIcon(dest.iconName, 'w-4 h-4')}

                {/* Crimson circular active indicator dot in compact mode */}
                {isActive && !isDockHovered && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EBE9D8] animate-pulse" />
                )}
              </span>

              {/* Destination Name: Smoothly expands on hover */}
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                  isDockHovered
                    ? 'max-w-32 opacity-100 pl-2'
                    : 'max-w-0 opacity-0 pl-0'
                }`}
              >
                {dest.shortLabel}
              </span>

              {/* Tooltip on individual icon hover when collapsed */}
              {!isDockHovered && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-[#1B1917] text-[#EBE9D8] text-[10px] font-mono-tech uppercase tracking-widest px-2.5 py-1 rounded-xs border border-[#EBE9D8]/20 shadow-xl whitespace-nowrap flex items-center gap-1.5">
                    <span className="text-[#CB1B29] font-bold">0{idx + 1}</span>
                    <span>{dest.label}</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* =========================================================================
          2. MOBILE COMPACT FLOATING BAR (Screens < md)
          - Touch-friendly compact bar, not dependent on hover.
          - Positioned so it does not obstruct content or footer.
          ========================================================================= */}
      <div
        style={{
          transform: 'translate3d(-50%, 0, 0)',
          bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        }}
        className="md:hidden fixed left-1/2 z-40 w-[92%] max-w-sm will-change-transform"
      >
        <div className="flex items-center justify-between p-2 pl-3.5 bg-[#25231F] text-[#EBE9D8] rounded-full border border-[#EBE9D8]/20 shadow-2xl shadow-black/60 backdrop-blur-md">
          {/* Current Active Destination with Crimson circular indicator */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2.5 text-xs font-heading font-medium uppercase tracking-wider text-[#EBE9D8] cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-[#CB1B29] flex items-center justify-center text-[#EBE9D8] shadow-xs">
              {getDestinationIcon(activeDest.iconName, 'w-3.5 h-3.5')}
            </span>
            <div className="text-left leading-tight">
              <span className="text-[9px] font-mono-tech text-[#CB1B29] block">DESTINATION</span>
              <span className="font-semibold text-xs">{activeDest.label}</span>
            </div>
          </button>

          {/* Menu expander pill */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open Navigation Drawer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D3934] hover:bg-[#CB1B29] text-[#EBE9D8] text-xs font-mono-tech transition-colors cursor-pointer"
          >
            <span>DESTINATIONS</span>
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. MOBILE NAVIGATION DRAWER
          ========================================================================= */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 z-[60] bg-[#25231F]/80 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-200 overscroll-contain"
        >
          <div
            className="w-full bg-[#EBE9D8] text-[#25231F] rounded-t-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto overscroll-contain border-t-2 border-[#CB1B29]"
            style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#25231F]/15 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-[#25231F]">
                  {conferenceConfig.name} {conferenceConfig.editionRoman}
                </span>
                <span className="text-[10px] font-mono-tech bg-[#CB1B29] text-[#EBE9D8] px-1.5 py-0.5 rounded-xs font-semibold">
                  NAVIGATION
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full border border-[#25231F]/20 flex items-center justify-center text-[#25231F] hover:text-[#CB1B29] hover:border-[#CB1B29] transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Destination List (01 to 06) */}
            <div className="space-y-2 mb-6">
              {conferenceConfig.destinations.map((dest, idx) => {
                const isActive = currentDestination === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => handleSelect(dest.id)}
                    onMouseEnter={() => prefetchRoute(dest.id)}
                    onTouchStart={() => prefetchRoute(dest.id)}
                    className={`w-full p-3.5 rounded-xs border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#25231F] text-[#EBE9D8] border-[#25231F]'
                        : 'bg-[#F6F4EB] text-[#25231F] border-[#25231F]/15 hover:border-[#CB1B29]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-8 h-8 rounded-xs flex items-center justify-center ${
                          isActive ? 'bg-[#CB1B29] text-[#EBE9D8]' : 'bg-[#EBE9D8] text-[#25231F]'
                        }`}
                      >
                        {getDestinationIcon(dest.iconName, 'w-4 h-4')}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono-tech ${isActive ? 'text-[#CB1B29]' : 'text-[#25231F]/50'}`}>
                            0{idx + 1}
                          </span>
                          <span className="font-serif-display text-xl font-bold">
                            {dest.label}
                          </span>
                        </div>
                        <p className={`text-xs ${isActive ? 'text-[#EBE9D8]/70' : 'text-[#25231F]/60'}`}>
                          {dest.description}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-[#CB1B29]' : 'text-[#25231F]/40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Link to Registration */}
            <div className="pt-4 border-t border-[#25231F]/15 flex items-center justify-between text-xs font-mono-tech text-[#25231F]/60">
              <span>{conferenceConfig.organizer.shortInstitute}</span>
              <button
                onClick={() => handleSelect('registration')}
                className="font-bold text-[#CB1B29] uppercase tracking-wider hover:underline cursor-pointer"
              >
                Go to Registration →
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
