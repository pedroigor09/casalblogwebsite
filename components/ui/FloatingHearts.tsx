'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const heartSymbols = ['♥', '♡', '❤'];

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      const colors = ['text-orange-300/40', 'text-coral-300/40', 'text-pink-300/40'];
      heart.className = `absolute ${colors[Math.floor(Math.random() * colors.length)]} pointer-events-none`;
      heart.style.fontSize = `${Math.random() * 20 + 15}px`;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.bottom = '-50px';

      container.appendChild(heart);

      gsap.to(heart, {
        y: -window.innerHeight - 100,
        x: `${(Math.random() - 0.5) * 200}px`,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: Math.random() * 5 + 5,
        ease: 'none',
        onComplete: () => {
          heart.remove();
        },
      });
    };

    const interval = setInterval(createHeart, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
    />
  );
}
