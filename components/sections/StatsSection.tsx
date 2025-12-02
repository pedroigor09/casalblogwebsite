'use client';

import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from 'gsap';
import { StatCounter } from '@/components/ui/StatCounter';
import { COUPLE_STATS } from '@/lib/constants/stats';
import { useTheme } from '@/components/layout/ThemeProvider';

export function StatsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { themeData } = useTheme();

  useScrollAnimation<HTMLElement>((element) => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section className={`relative py-32 px-4 ${themeData.colors.gradient} overflow-hidden transition-all duration-700`}>
      {/* Decorative background with mesh gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-orange-400/30 to-coral-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-linear-to-tr from-pink-400/30 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-orange-200/10 via-pink-200/10 to-purple-200/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 ref={titleRef} className="text-5xl md:text-7xl font-black mb-4 bg-linear-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent relative">
              Dashboard do Amor 📊
              <div className="absolute -inset-1 bg-linear-to-r from-orange-600 via-pink-600 to-purple-600 opacity-20 blur-2xl -z-10" />
            </h2>
          </div>
          <p className="text-xl text-gray-700 font-medium mt-4">
            Estatísticas da nossa relação (as importantes e as engraçadas)
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COUPLE_STATS.map((stat, index) => (
            <StatCounter key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Fun fact based on theme */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-700 italic">
              {themeData.funFact}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
