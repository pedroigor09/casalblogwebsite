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
      {/* Efeito de profundidade 3D */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-pink-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      {/* Shine effect diagonal */}
      <div className="absolute -inset-1 bg-linear-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-3xl" />
      
      {/* Brilho de fundo pulsante */}
      <div className="absolute -inset-2 bg-linear-to-r from-orange-400/20 via-pink-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Icon 3D com sombra */}
        <div className="relative mb-6">
          {/* Sombra do ícone */}
          <div className="absolute inset-0 text-7xl blur-2xl opacity-30 scale-110 group-hover:scale-125 transition-transform duration-500">
            {stat.icon}
          </div>
          {/* Ícone principal */}
          <div className="relative text-7xl transform group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500 filter drop-shadow-2xl">
            {stat.icon}
          </div>
        </div>
        
        {/* Container dos números com efeito 3D */}
        <div className="relative">
          {/* Sombra dos números */}
          <div className="absolute inset-0 text-6xl font-black blur-md opacity-20 transform translate-y-1">
            {stat.instagram ? formatNumber(count) : count.toLocaleString()}
          </div>
          
          {/* Números principais */}
          <div className="relative text-6xl font-black mb-3 transform group-hover:scale-110 transition-transform duration-500">
            <span className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              {stat.instagram ? formatNumber(count) : count.toLocaleString()}
            </span>
            {stat.suffix && (
              <span className="text-3xl bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent ml-2 font-black animate-pulse">
                {stat.suffix}
              </span>
            )}
          </div>
        </div>
        
        {/* Label com efeito glassmorphism */}
        <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg">
          <div className="text-sm text-gray-700 font-bold tracking-wider uppercase">
            {stat.label}
          </div>
        </div>

        {/* Badge Instagram redesenhado */}
        {stat.instagram && (
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white bg-linear-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full shadow-lg group-hover:shadow-pink-500/50 transition-shadow duration-300">
            <span className="animate-pulse">🔥</span> 
            <span>SEGUE LÁ</span>
          </div>
        )}
      </div>
      
      {/* Decoração de canto com gradiente animado */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-400/20 via-pink-400/20 to-purple-400/20 rounded-bl-[100px] group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-orange-400/10 via-pink-400/10 to-purple-400/10 rounded-tr-[80px] group-hover:scale-110 transition-transform duration-500" />
      
      {/* Borda luminosa */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-linear-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-border animate-pulse" style={{
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }} />
      </div>
    </>
  );

  if (stat.instagram) {
    return (
      <a
        href={stat.instagram}
        target="_blank"
        rel="noopener noreferrer"
        ref={counterRef as React.RefObject<HTMLAnchorElement>}
        className="group relative bg-linear-to-br from-white via-gray-50 to-white rounded-3xl p-10 shadow-2xl hover:shadow-[0_30px_80px_-15px_rgba(251,146,60,0.4)] transition-all duration-700 hover:scale-110 hover:-rotate-2 border-2 border-gray-100/50 overflow-hidden backdrop-blur-sm block transform-gpu perspective-1000"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      ref={counterRef as React.RefObject<HTMLDivElement>}
      className="group relative bg-linear-to-br from-white via-gray-50 to-white rounded-3xl p-10 shadow-2xl hover:shadow-[0_30px_80px_-15px_rgba(251,146,60,0.4)] transition-all duration-700 hover:scale-110 hover:-rotate-2 border-2 border-gray-100/50 overflow-hidden backdrop-blur-sm transform-gpu perspective-1000"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {cardContent}
    </div>
  );
}
