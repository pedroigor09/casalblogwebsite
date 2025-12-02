'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stat } from '@/types/features';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  stat: Stat;
  index: number;
}

export function StatCounter({ stat, index }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          // Animate the counter
          gsap.to({ value: 0 }, {
            value: stat.value,
            duration: 2.5,
            delay: index * 0.15,
            ease: 'power2.out',
            onUpdate: function() {
              setCount(Math.floor(this.targets()[0].value));
            },
          });

          // Animate the card
          gsap.fromTo(
            counterRef.current,
            {
              opacity: 0,
              y: 50,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'back.out(1.7)',
            }
          );
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, [stat.value, index]);

  // Formatar números grandes (196000 -> 196K)
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toLocaleString();
  };

  const cardContent = (
    <>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-orange-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
      
      {/* Shine effect */}
      <div className="absolute -inset-1 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      
      <div className="relative">
        {/* Icon com efeito 3D */}
        <div className="text-7xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 filter drop-shadow-2xl">
          {stat.icon}
        </div>
        
        {/* Números com gradiente */}
        <div className="text-5xl font-black mb-2 bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
          {stat.instagram ? formatNumber(count) : count.toLocaleString()}
          {stat.suffix && (
            <span className="text-2xl bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent ml-1 font-bold">
              {stat.suffix}
            </span>
          )}
        </div>
        
        {/* Label com efeito */}
        <div className="text-base text-gray-600 font-semibold tracking-wide uppercase">
          {stat.label}
        </div>

        {/* Badge Instagram */}
        {stat.instagram && (
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
            <span>🔥</span> SEGUE LÁ
          </div>
        )}
      </div>
      
      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-orange-400/10 to-pink-400/10 rounded-bl-full" />
    </>
  );

  if (stat.instagram) {
    return (
      <a
        href={stat.instagram}
        target="_blank"
        rel="noopener noreferrer"
        ref={counterRef as React.RefObject<HTMLAnchorElement>}
        className="group relative bg-linear-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 border border-gray-200/50 overflow-hidden backdrop-blur-sm block"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      ref={counterRef as React.RefObject<HTMLDivElement>}
      className="group relative bg-linear-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 border border-gray-200/50 overflow-hidden backdrop-blur-sm"
    >
      {cardContent}
    </div>
  );
}
