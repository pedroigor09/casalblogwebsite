'use client';

import { useState } from 'react';

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
    video: '/video2.mp4',
    explicacao: 'Quando um dos dois não quer fazer nada e inventa mil desculpas!',
  },
  {
    frase: 'Vamos Economizar',
    emoji: '💰',
    video: '/video3.mp4',
    explicacao: 'A frase mais falada antes de gastar tudo mesmo assim!',
  },
  {
    frase: 'Depois da DR',
    emoji: '😴',
    video: '/video4.mp4',
    explicacao: 'Aquela paz depois da tempestade... ou não!',
  },
  {
    frase: 'Dia de Preguiça',
    emoji: '🛏️',
    video: '/video5.mp4',
    explicacao: 'O nosso programa favorito: absolutamente nada!',
  },
];

export function DicionarioSection() {
  const [selectedItem, setSelectedItem] = useState<DicionarioItem | null>(null);

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

        {/* Cards clicáveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DICIONARIO.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-orange-200 hover:border-orange-400"
            >
              <div className="text-6xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.frase}
              </h3>
              <p className="text-sm text-gray-600">Clique para ver o vídeo!</p>
            </button>
          ))}
        </div>

        {/* Modal de vídeo */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-3xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full text-3xl hover:bg-red-600 transition-colors shadow-lg"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>

              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-5xl">{selectedItem.emoji}</span>
                  {selectedItem.frase}
                </h3>
                <p className="text-gray-600 mt-2">{selectedItem.explicacao}</p>
              </div>

              <video
                src={selectedItem.video}
                controls
                autoPlay
                className="w-full rounded-2xl shadow-2xl"
              />
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
