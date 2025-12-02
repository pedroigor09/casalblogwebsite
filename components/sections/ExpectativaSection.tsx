'use client';

import { ExpectativaRealidade } from '@/components/ui/ExpectativaRealidade';

const GALERIA_DATA = [
  {
    expectativa: '/img1.jpg',
    realidade: '/img2.jpg',
    caption: '💑 Romance na Praia vs 😴 Realidade do Dia a Dia',
  },
  {
    expectativa: '/img3.jpg',
    realidade: '/img4.jpg',
    caption: '✈️ Viagem dos Sonhos vs 🛏️ Preferimos Dormir',
  },
  {
    expectativa: '/img5.jpg',
    realidade: '/img6.jpg',
    caption: '📸 Foto Perfeita vs 🤪 Nos Bastidores',
  },
];

export function ExpectativaSection() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      {/* Decoração */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 text-9xl">📸</div>
        <div className="absolute bottom-20 left-20 text-9xl">🎭</div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Expectativa vs Realidade 🎭
          </h2>
          <p className="text-xl text-gray-600">
            Passe o mouse e veja a verdade por trás das fotos! 😂
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALERIA_DATA.map((item, index) => (
            <ExpectativaRealidade
              key={index}
              expectativa={item.expectativa}
              realidade={item.realidade}
              caption={item.caption}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 italic">
            Spoiler: A realidade é bem mais engraçada! 🤣
          </p>
        </div>
      </div>
    </section>
  );
}
