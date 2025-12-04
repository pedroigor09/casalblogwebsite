'use client';

import { useRef, useState, useEffect } from 'react';
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
  isUnlocked,
  isCompleted,
  onClick 
}: { 
  event: TimelineEvent; 
  index: number;
  position: { x: number; y: number };
  isActive: boolean;
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) {
  const pointRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isUnlocked && pointRef.current) {
      // Animação de nascimento da bolinha
      gsap.fromTo(
        pointRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -180,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        }
      );
    }
  }, [isUnlocked]);

  if (!isUnlocked) return null;

  return (
    <>
      {/* Ponto clicável */}
      <div
        ref={pointRef}
        className={`absolute z-10 ${isCompleted ? '' : 'cursor-pointer'} group`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={isCompleted ? undefined : onClick}
      >
        {/* Pulso de onda - só se não foi completado */}
        {!isCompleted && (
          <div className="absolute inset-0 animate-ping">
            <div className="w-16 h-16 bg-orange-400 rounded-full opacity-30" />
          </div>
        )}
        
        {/* Círculo externo */}
        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
          isCompleted
            ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl' 
            : isActive 
            ? 'bg-gradient-to-br from-orange-500 to-pink-500 scale-125 shadow-2xl' 
            : 'bg-gradient-to-br from-orange-400 to-coral-400 group-hover:scale-110 shadow-lg animate-bounce'
        }`}>
          {/* Círculo interno */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {isCompleted ? (
              <span className="text-green-500 font-bold text-xl">✓</span>
            ) : (
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                isActive ? 'bg-pink-500' : 'bg-orange-400 group-hover:bg-orange-500'
              }`} />
            )}
          </div>
        </div>

        {/* Label com data */}
        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-sm font-bold text-orange-600 bg-white px-4 py-2 rounded-full shadow-lg">
            {event.date}
          </span>
        </div>
      </div>

      {/* Card do evento (aparece quando clicado) */}
      {isActive && (
        <div
          className="absolute z-20 animate-in fade-in zoom-in duration-700"
          style={{
            left: position.x > 50 ? `${position.x - 35}%` : `${position.x + 15}%`,
            top: `${position.y - 100}px`,
          }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md border-4 border-orange-200 relative backdrop-blur-sm">
            {/* Brilho decorativo */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full blur-2xl opacity-50" />
            
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">
              {event.date}
            </span>
            <h3 className="text-3xl font-black text-gray-900 mt-3 mb-4">
              {event.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {event.description}
            </p>
            
            {/* Botão de continuar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-500 via-coral-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
            >
              {index < TIMELINE_EVENTS.length - 1 ? 'Continuar a história ➜' : 'Finalizar ✨'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null);
  const [unlockedCount, setUnlockedCount] = useState(1); // Começa com 1 desbloqueado
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(new Set());
  const [hasStarted, setHasStarted] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ top: 0, bottom: 0 });

  // Atualizar parallax no scroll
  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset({
        top: window.scrollY * 0.3,
        bottom: window.scrollY * -0.2,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular posições em curva (sinuosa)
  const calculatePositions = () => {
    const positions: { x: number; y: number }[] = [];
    const totalEvents = TIMELINE_EVENTS.length;
    const verticalSpacing = 300;
    
    TIMELINE_EVENTS.forEach((_, index) => {
      const progress = index / (totalEvents - 1);
      const yPos = index * verticalSpacing;
      
      // Criar curva sinuosa mais dramática
      const amplitude = 35;
      const frequency = 1.5;
      const xPos = 50 + amplitude * Math.sin(progress * Math.PI * frequency);
      
      positions.push({ x: xPos, y: yPos });
    });
    
    return positions;
  };

  const positions = calculatePositions();
  const totalHeight = (TIMELINE_EVENTS.length - 1) * 300;

  // Trigger ao entrar na seção
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasStarted]);

  const handlePointClick = (index: number) => {
    if (completedIndices.has(index)) return;

    if (activeEventIndex === index) {
      // Está fechando o card e avançando
      setActiveEventIndex(null);
      setCompletedIndices(prev => new Set([...prev, index]));
      
      // Desbloquear próximo após uma pausa dramática
      setTimeout(() => {
        if (index < TIMELINE_EVENTS.length - 1) {
          // Animar a linha até o próximo ponto
          animateLineToNext(index, () => {
            setUnlockedCount(prev => prev + 1);
          });
        }
      }, 300);
    } else {
      // Está abrindo o card
      setActiveEventIndex(index);
    }
  };

  const animateLineToNext = (fromIndex: number, onComplete: () => void) => {
    if (!svgRef.current) return;

    const from = positions[fromIndex];
    const to = positions[fromIndex + 1];
    
    // Converter porcentagem para pixels
    const svgWidth = svgRef.current.clientWidth;
    const fromX = (from.x / 100) * svgWidth;
    const toX = (to.x / 100) * svgWidth;
    
    // Criar elemento de linha temporário para animação
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const midY = (from.y + to.y) / 2;
    const pathData = `M ${fromX} ${from.y} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${to.y}`;
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'url(#lineGradient)');
    path.setAttribute('stroke-width', '6');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('filter', 'drop-shadow(0 0 12px rgba(251, 146, 60, 0.6))');
    
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    
    svgRef.current.appendChild(path);

    // Animar o desenho da linha
    gsap.to(path.style, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 bg-gradient-to-b from-orange-50 via-peach-50 to-pink-50 overflow-hidden"
    >
      {/* Background decoration com parallax */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-300 rounded-full blur-3xl"
          style={{
            transform: `translateY(${parallaxOffset.top}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral-300 rounded-full blur-3xl"
          style={{
            transform: `translateY(${parallaxOffset.bottom}px)`
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-32">
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
            Nossa Jornada
          </h2>
          <p className="text-2xl text-gray-600 mb-4">
            Cada momento é uma memória especial
          </p>
          {unlockedCount === 1 && (
            <p className="text-lg text-orange-600 font-semibold animate-pulse">
              ✨ Clique na bolinha para começar a história ✨
            </p>
          )}
        </div>

        {/* Container da timeline */}
        <div className="relative" style={{ height: `${totalHeight + 400}px` }}>
          {/* SVG com linhas animadas */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FF8B6A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.9" />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Pontos da timeline */}
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelinePoint
              key={event.id}
              event={event}
              index={index}
              position={positions[index]}
              isActive={activeEventIndex === index}
              isUnlocked={index < unlockedCount}
              isCompleted={completedIndices.has(index)}
              onClick={() => handlePointClick(index)}
            />
          ))}
        </div>

        {/* Mensagem de conclusão */}
        {completedIndices.size === TIMELINE_EVENTS.length && (
          <div className="text-center mt-20 animate-in fade-in zoom-in duration-1000">
            <div className="bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 rounded-3xl p-12 shadow-2xl border-4 border-orange-300">
              <h3 className="text-4xl font-black text-gray-900 mb-4">
                🎉 História Completa! 🎉
              </h3>
              <p className="text-xl text-gray-700">
                Obrigado por acompanhar nossa jornada até aqui! 💕
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
