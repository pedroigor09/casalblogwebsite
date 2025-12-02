'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils/cn';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'fadeUp' | 'reveal' | 'split';
}

export function AnimatedText({ 
  text, 
  className, 
  delay = 0,
  type = 'fadeUp' 
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    if (type === 'split') {
      // Split text into chars for Rockstar-style reveal
      const chars = text.split('');
      element.innerHTML = chars
        .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      gsap.fromTo(
        element.children,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.02,
          delay,
          ease: 'power4.out',
        }
      );
    } else if (type === 'reveal') {
      gsap.set(element, { 
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
      });
      
      gsap.to(element, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        delay,
        ease: 'power4.inOut',
      });
    } else {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay,
          ease: 'power3.out',
        }
      );
    }
  }, [text, delay, type]);

  return (
    <div
      ref={textRef}
      className={cn('overflow-hidden', className)}
    >
      {type !== 'split' && text}
    </div>
  );
}
