import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Fade up animation helper for elements
export const createFadeUp = (
  element: HTMLElement | string,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    trigger?: HTMLElement | string;
    start?: string;
  }
) => {
  if (checkReducedMotion()) return;

  const y = options?.y ?? 40;
  const duration = options?.duration ?? 0.9;
  const delay = options?.delay ?? 0;
  const trigger = options?.trigger ?? element;
  const start = options?.start ?? 'top 85%';

  gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
};

// Staggered reveal for child elements
export const createStaggerReveal = (
  parent: HTMLElement | string,
  childrenSelector: string,
  staggerDelay: number = 0.12,
  start: string = 'top 82%'
) => {
  if (checkReducedMotion()) return;

  const container = typeof parent === 'string' ? document.querySelector(parent) : parent;
  if (!container) return;

  const children = container.querySelectorAll(childrenSelector);
  if (!children.length) return;

  gsap.fromTo(
    children,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    }
  );
};

// Counter animation helper
export const animateCounter = (
  element: HTMLElement,
  targetNumber: number,
  prefix: string = '',
  suffix: string = '',
  duration: number = 2
) => {
  if (checkReducedMotion()) {
    element.textContent = `${prefix}${targetNumber}${suffix}`;
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetNumber,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 88%',
      once: true,
    },
    onUpdate: () => {
      const current = Math.floor(obj.val);
      const formatted = current < 10 && targetNumber >= 10 ? `0${current}` : `${current}`;
      element.textContent = `${prefix}${formatted}${suffix}`;
    },
  });
};
