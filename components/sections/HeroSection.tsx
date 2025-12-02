'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { HERO_CONTENT } from '@/lib/constants/content';
import { getVideoPath, getImagePath } from '@/lib/utils/paths';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !overlayRef.current || !polaroidRef.current) return;

    const tl = gsap.timeline();

    // Cinematic reveal - estilo Rockstar Games
    tl.fromTo(
      overlayRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power4.inOut',
      }
    )
    .to(overlayRef.current, {
      scaleX: 0,
      transformOrigin: 'right',
      duration: 1.5,
      ease: 'power4.inOut',
    })
    .fromTo(
      polaroidRef.current,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: -5,
        opacity: 1,
        duration: 1.5,
        ease: 'back.out(1.7)',
      },
      '-=0.8'
    );

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (polaroidRef.current) {
        gsap.to(polaroidRef.current, {
          y: scrollY * 0.5,
          rotation: -5 + scrollY * 0.02,
          duration: 0.1,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={getVideoPath('video1.mp4')} type="video/mp4" />
      </video>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-linear-to-r from-orange-500 to-pink-500 z-50 origin-left"
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-orange-300/30 text-4xl animate-float"
            style={{
              left: `${(i * 7 + 5) % 95}%`,
              animationDelay: `${(i * 0.5) % 5}s`,
              animationDuration: `${10 + (i % 10)}s`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-12">
          <AnimatedText
            text={HERO_CONTENT.title}
            type="split"
            delay={3}
            className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-[0_0_30px_rgba(255,107,0,0.9)] [text-shadow:_0_0_40px_rgb(255_107_0_/_80%),_0_0_80px_rgb(255_107_0_/_40%)]"
          />
          <AnimatedText
            text={HERO_CONTENT.subtitle}
            type="fadeUp"
            delay={4}
            className="text-2xl md:text-4xl text-white font-bold drop-shadow-[0_0_20px_rgba(255,154,0,0.8)]"
          />
          <AnimatedText
            text={HERO_CONTENT.date}
            type="fadeUp"
            delay={4.5}
            className="text-xl md:text-2xl text-white font-semibold mt-4 drop-shadow-[0_0_15px_rgba(255,184,0,0.7)]"
          />
        </div>

        {/* Polaroid central */}
        <div
          ref={polaroidRef}
          className="inline-block bg-white p-4 pb-12 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 bg-linear-to-br from-orange-200 via-coral-200 to-pink-200 relative overflow-hidden">
            <Image
              src={getImagePath('img1.jpg')}
              alt="Foto principal do casal"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-center mt-4 font-handwriting text-gray-700">
            Para sempre ♥
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll" />
        </div>
      </div>
    </section>
  );
}
