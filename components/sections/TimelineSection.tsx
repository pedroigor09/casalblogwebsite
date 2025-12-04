'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TIMELINE_EVENTS } from '@/lib/constants/content';
import { TimelineEvent } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function TimelinePoint({ 
  event, 
  index, 
  position,
  isActive,
  onClick 
}: { 
  event: TimelineEvent; 
  index: number;
  position: { x: number; y: number };
  isActive: boolean;
  onClick: () => void;
}) {
  const pointRef = useRef<HTMLDivElement>(null);

  useScrollAnimation<HTMLDivElement>((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <>
      {/* Ponto clicável */}
      <div
        ref={pointRef}
        className="absolute cursor-pointer group"
        style={{
          left: `${position.x}%`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={onClick}
      >
        {/* Pulso de onda */}
        <div className={`absolute inset-0 ${isActive ? 'animate-ping' : ''}`}>
          <div className="w-12 h-12 bg-orange-400 rounded-full opacity-20" />
        </div>
        
        {/* Círculo externo */}
        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-br from-orange-500 to-pink-500 scale-125 shadow-2xl' 
            : 'bg-gradient-to-br from-orange-400 to-coral-400 group-hover:scale-110 shadow-lg'
        }`}>
          {/* Círculo interno */}
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isActive ? 'bg-pink-500' : 'bg-orange-400 group-hover:bg-orange-500'
            }`} />
          </div>
        </div>

        {/* Label com data */}
        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-bold text-orange-600 bg-white px-3 py-1 rounded-full shadow-md">
            {event.date}
          </span>
        </div>
      </div>

      {/* Card do evento (aparece quando clicado) */}
      {isActive && (
        <div
          className="absolute z-20 animate-in fade-in zoom-in duration-500"
          style={{
            left: position.x > 50 ? `${position.x - 30}%` : `${position.x + 10}%`,
            top: `${position.y - 80}px`,
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-4 border-orange-200 relative">
            {/* Botão fechar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform"
            >
              ✕
            </button>

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
      )}
    </>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  // Calcular posições em curva (sinuosa)
  const calculatePositions = () => {
    const positions: { x: number; y: number }[] = [];
    const totalEvents = TIMELINE_EVENTS.length;
    const verticalSpacing = 250; // Espaçamento vertical entre pontos
    
    TIMELINE_EVENTS.forEach((_, index) => {
      const progress = index / (totalEvents - 1);
      const yPos = index * verticalSpacing;
      
      // Criar curva sinuosa (oscila entre 20% e 80%)
      const amplitude = 30; // Amplitude da onda
      const frequency = 2; // Frequência da onda
      const xPos = 50 + amplitude * Math.sin(progress * Math.PI * frequency);
      
      positions.push({ x: xPos, y: yPos });
    });
    
    return positions;
  };

  const positions = calculatePositions();
  const totalHeight = (TIMELINE_EVENTS.length - 1) * 250;

  // Criar caminho SVG para a linha curva
  const createCurvePath = () => {
    if (positions.length < 2) return '';
    
    let path = `M ${positions[0].x} ${positions[0].y}`;
    
    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1];
      const curr = positions[i];
      const midY = (prev.y + curr.y) / 2;
      
      // Usar curva Bézier cúbica para suavizar
      path += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  useScrollAnimation<HTMLElement>((element) => {
    if (!svgRef.current) return;

    const pathElement = svgRef.current.querySelector('.timeline-path');
    if (!pathElement) return;

    const pathLength = (pathElement as SVGPathElement).getTotalLength();

    // Animar o desenho da linha
    gsap.fromTo(
      pathElement,
      { 
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength 
      },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 1,
        },
      }
    );
  }, []);

  const handlePointClick = (eventId: string) => {
    setActiveEventId(activeEventId === eventId ? null : eventId);
  };

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

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Nossa Jornada
          </h2>
          <p className="text-xl text-gray-600">
            Cada momento é uma memória especial
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ✨ Clique nas bolinhas para descobrir mais ✨
          </p>
        </div>

        {/* Container da timeline */}
        <div className="relative" style={{ height: `${totalHeight + 200}px` }}>
          {/* SVG com linha curva */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="50%" stopColor="#FF8B6A" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              className="timeline-path"
              d={createCurvePath()}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.4))' }}
            />
          </svg>

          {/* Pontos da timeline */}
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelinePoint
              key={event.id}
              event={event}
              index={index}
              position={positions[index]}
              isActive={activeEventId === event.id}
              onClick={() => handlePointClick(event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
