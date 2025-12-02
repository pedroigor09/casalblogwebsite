'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TIMELINE_EVENTS } from '@/lib/constants/content';
import { TimelineEvent } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const itemRef = useScrollAnimation<HTMLDivElement>((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: event.side === 'left' ? -100 : 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const isLeft = event.side === 'left';

  return (
    <div
      ref={itemRef}
      className={`flex items-center gap-8 mb-20 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <div className="inline-block bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
            {event.date}
          </span>
          <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
            {event.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Center dot */}
      <div className="relative flex-shrink-0">
        <div className="w-6 h-6 bg-linear-to-br from-orange-500 to-coral-500 rounded-full border-4 border-white shadow-lg z-10 relative" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useScrollAnimation<HTMLElement>((element) => {
    if (!lineRef.current) return;

    // Animate the center line
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 bg-gradient-to-b from-orange-50 via-peach-50 to-pink-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Nossa Jornada
          </h2>
          <p className="text-xl text-gray-600">
            Cada momento é uma memória especial
          </p>
        </div>

        {/* Center timeline line */}
        <div className="absolute left-1/2 top-32 bottom-0 w-1 bg-gradient-to-b from-orange-300 to-pink-300 transform -translate-x-1/2">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-gradient-to-b from-orange-500 via-coral-500 to-pink-500 origin-top"
          />
        </div>

        {/* Timeline events */}
        <div className="relative">
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
