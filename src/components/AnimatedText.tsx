import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { checkReducedMotion } from '../lib/animations';

gsap.registerPlugin(ScrollTrigger);

export interface AnimatedTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: 'words' | 'fade' | 'chars';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  type = 'words',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || checkReducedMotion()) return;

    const el = containerRef.current;

    if (type === 'words') {
      const words = el.querySelectorAll('.word-span');
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 20,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }
  }, [text, delay, duration, stagger, type]);

  if (type === 'words') {
    const words = text.split(' ');
    return (
      <Component ref={containerRef} className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="word-span inline-block mr-[0.28em] will-change-transform"
          >
            {word}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={containerRef} className={className}>
      {text}
    </Component>
  );
};
