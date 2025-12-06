'use client';

import { useState, useRef, useEffect } from 'react';
import { getVideoPath } from '@/lib/utils/paths';
import { gsap } from 'gsap';

interface DicionarioItem {
  frase: string;
  emoji: string;
  video: string;
  explicacao: string;
}

const DICIONARIO: DicionarioItem[] = [
  {
    frase: 'Cheio de Frescura',
    emoji: '🙄',
    video: getVideoPath('video2.mp4'),
    explicacao: 'Quando um dos dois não quer fazer nada e inventa mil desculpas!',
  },
  {
    frase: 'Vamos Economizar',
    emoji: '💰',
    video: getVideoPath('video3.mp4'),
    explicacao: 'A frase mais falada antes de gastar tudo mesmo assim!',
  },
  {
    frase: 'Depois da DR',
    emoji: '😴',
    video: getVideoPath('video4.mp4'),
    explicacao: 'Aquela paz depois da tempestade... ou não!',
  },
  {
    frase: 'Dia de Preguiça',
    emoji: '🛏️',
    video: getVideoPath('video5.mp4'),
    explicacao: 'O nosso programa favorito: absolutamente nada!',
  },
];

export function DicionarioSection() {
  const [selectedItem, setSelectedItem] = useState<DicionarioItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Play video quando hover
    if (hoveredIndex !== null && videoRefs.current[hoveredIndex]) {
      videoRefs.current[hoveredIndex]?.play();
    }
  }, [hoveredIndex]);

  const handleCardClick = (item: DicionarioItem) => {
    setSelectedItem(item);
  };

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-amber-50 to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Dicionário do Casal 📖
          </h2>
          <p className="text-xl text-gray-600">
            Nossas frases e piadas internas que só a gente entende! 😂
          </p>
        </div>

        {/* Marquee de frases */}
        <div className="overflow-hidden mb-12 bg-white/50 backdrop-blur-sm py-4 rounded-2xl">
          <div className="animate-marquee whitespace-nowrap flex gap-8 text-2xl font-bold text-gray-700">
            {[...DICIONARIO, ...DICIONARIO].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <span>{item.emoji}</span>
                <span>{item.frase}</span>
                <span className="text-orange-400">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Cards cinematográficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DICIONARIO.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(item)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Vídeo de fundo */}
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={item.video}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/70 transition-all duration-500" />
              
              {/* Brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-orange-500/30 group-hover:via-pink-500/20 group-hover:to-purple-500/30 transition-all duration-700" />
              
              {/* Glassmorphism card */}
              <div className="relative backdrop-blur-sm bg-white/10 p-8 h-80 flex flex-col justify-end border-2 border-white/20 group-hover:border-orange-400/50 transition-all duration-500">
                {/* Emoji animado */}
                <div className="text-7xl mb-4 transform group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500">
                  {item.emoji}
                </div>
                
                {/* Texto */}
                <h3 className="text-2xl font-black text-white mb-2 drop-shadow-lg">
                  {item.frase}
                </h3>
                
                <p className="text-sm text-white/80 font-medium mb-4">
                  {item.explicacao}
                </p>
                
                {/* Botão play */}
                <div className="flex items-center gap-2 text-orange-300 font-bold group-hover:text-orange-200 transition-colors">
                  <svg 
                    className="w-6 h-6 animate-pulse" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span className="text-sm">Clique para ver o vídeo!</span>
                </div>
              </div>
              
              {/* Efeito de borda animada */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl border-2 border-orange-400 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal de vídeo cinematográfico */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[300] flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Brilho decorativo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              
              {/* Container do modal */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border-2 border-orange-500/30">
                {/* Botão fechar */}
                <button
                  className="absolute -top-5 -right-5 w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full text-3xl font-bold hover:scale-110 transition-transform shadow-2xl z-10"
                  onClick={() => setSelectedItem(null)}
                >
                  ×
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-4xl font-black text-white flex items-center gap-4 mb-3">
                    <span className="text-6xl animate-bounce">{selectedItem.emoji}</span>
                    <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      {selectedItem.frase}
                    </span>
                  </h3>
                  <p className="text-gray-300 text-lg ml-20">{selectedItem.explicacao}</p>
                </div>

                {/* Player de vídeo */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500/20">
                  <video
                    src={selectedItem.video}
                    controls
                    autoPlay
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS para marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
