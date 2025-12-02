'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function BarraConquistas() {
  const [progress, setProgress] = useState(0);
  const carRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simular progresso (você pode conectar com dados reais)
    const savedProgress = localStorage.getItem('car-progress') || '35';
    const currentProgress = parseInt(savedProgress);
    setProgress(currentProgress);

    // Animar o carro
    if (carRef.current) {
      gsap.to(carRef.current, {
        left: `${currentProgress}%`,
        duration: 2,
        ease: 'power2.out',
      });
    }
  }, []);

  const addProgress = () => {
    const newProgress = Math.min(progress + 5, 100);
    setProgress(newProgress);
    localStorage.setItem('car-progress', newProgress.toString());

    // Animação de moedinhas
    for (let i = 0; i < 5; i++) {
      const coin = document.createElement('div');
      coin.textContent = '🪙';
      coin.className = 'fixed text-4xl pointer-events-none z-[300]';
      coin.style.left = '50%';
      coin.style.top = '50%';
      document.body.appendChild(coin);

      gsap.to(coin, {
        x: Math.random() * 400 - 200,
        y: -500,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 1.5,
        delay: i * 0.1,
        ease: 'power2.out',
        onComplete: () => coin.remove(),
      });
    }

    // Animar o carro
    if (carRef.current) {
      gsap.to(carRef.current, {
        left: `${newProgress}%`,
        duration: 1,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-3xl p-8 shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          🚗 Missão: O Carro dos Sonhos
        </h3>
        <p className="text-gray-600">
          Ajude a gente a conquistar nosso carrinho! Cada clique conta 💪
        </p>
      </div>

      {/* Estrada com progresso */}
      <div className="relative h-32 mb-6">
        {/* Estrada */}
        <div className="absolute bottom-8 left-0 right-0 h-12 bg-gray-400 rounded-full overflow-hidden shadow-inner">
          {/* Linhas da estrada */}
          <div className="absolute inset-0 flex items-center justify-around">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-12 h-1 bg-white" />
            ))}
          </div>

          {/* Barra de progresso */}
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Carrinho animado */}
        <div
          ref={carRef}
          className="absolute bottom-12 text-6xl transform -translate-x-1/2 transition-all duration-1000"
          style={{ left: `${progress}%` }}
        >
          🚙
        </div>

        {/* Meta */}
        <div className="absolute bottom-12 right-0 text-6xl">
          🏁
        </div>
      </div>

      {/* Informações */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-gray-800">{progress}%</span>
        <span className="text-gray-600">Meta: 100%</span>
      </div>

      {/* Botão de apoio */}
      <button
        onClick={addProgress}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
      >
        🪙 Contribuir (+5%) - Clique aqui!
      </button>

      {progress === 100 && (
        <div className="mt-4 p-4 bg-green-100 rounded-xl text-center">
          <p className="text-xl font-bold text-green-700">
            🎉 MISSÃO CUMPRIDA! Obrigado! 🎉
          </p>
        </div>
      )}
    </div>
  );
}
