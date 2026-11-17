import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let scrollLockCount = 0;
let savedScrollY = 0;

export function lockBackgroundScroll() {
  scrollLockCount++;
  if (scrollLockCount === 1) {
    if (lenisInstance) {
      lenisInstance.stop();
    }
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      savedScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }
  }
}

export function unlockBackgroundScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, savedScrollY);
    }
    if (lenisInstance) {
      lenisInstance.start();
    }
  }
}

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  lenisInstance = lenis;
  if (typeof window !== 'undefined') {
    (window as any).__lenis = lenis;
  }

  // Synchronize Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function scrollToSection(target: string | HTMLElement, offset: number = -60) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
}
