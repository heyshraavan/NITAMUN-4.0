import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile / touch or reduced-motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsEnabled(true);

    let rafId: number | null = null;
    let mouseX = -100;
    let mouseY = -100;
    let isHovered = false;

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = null;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
      if (cursorRef.current && cursorRef.current.style.opacity !== '1') {
        cursorRef.current.style.opacity = '1';
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const onInteractiveOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hovered = Boolean(
        target &&
        typeof target.closest === 'function' &&
        target.closest('a, button, [role="button"], input, textarea, select, .interactive-cursor')
      );

      if (hovered !== isHovered) {
        isHovered = hovered;
        if (ringRef.current && dotRef.current) {
          if (isHovered) {
            ringRef.current.className =
              '-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#CB1B29] transition-all duration-200 ease-out w-10 h-10 bg-[#CB1B29]/10 scale-110';
            dotRef.current.className =
              'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CB1B29] transition-transform duration-150 w-2 h-2 scale-75';
          } else {
            ringRef.current.className =
              '-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#CB1B29] transition-all duration-200 ease-out w-6 h-6 border-[#CB1B29]/40 opacity-70';
            dotRef.current.className =
              'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CB1B29] transition-transform duration-150 w-1.5 h-1.5';
          }
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onInteractiveOver, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onInteractiveOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform opacity-0 transition-opacity duration-300"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      {/* Outer subtle ring */}
      <div
        ref={ringRef}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#CB1B29] transition-all duration-200 ease-out w-6 h-6 border-[#CB1B29]/40 opacity-70"
      />
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CB1B29] transition-transform duration-150 w-1.5 h-1.5"
      />
    </div>
  );
};
