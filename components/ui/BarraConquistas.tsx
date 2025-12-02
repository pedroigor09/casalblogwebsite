'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

const WeddingScene3D = dynamic(
  () => import('./WeddingScene3D').then((mod) => mod.WeddingScene3D),
  { ssr: false }
);

export function BarraConquistas() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hasContributed, setHasContributed] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Carregar progresso salvo
    const savedProgress = localStorage.getItem('wedding-progress') || '25';
    const currentProgress = parseInt(savedProgress);
    setProgress(currentProgress);
    
    // Verificar se já contribuiu
    const hasContributed = localStorage.getItem('wedding-contributed') === 'true';
    setHasContributed(hasContributed);
  }, []);

  const addProgress = () => {
    if (hasContributed) return;
    
    const newProgress = Math.min(progress + 5, 100);
    setProgress(newProgress);
    localStorage.setItem('wedding-progress', newProgress.toString());
    localStorage.setItem('wedding-contributed', 'true');
    setHasContributed(true);

    // Animação de corações e sparkles
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.textContent = ['💍', '💖', '✨', '🌟'][Math.floor(Math.random() * 4)];
      heart.className = 'fixed text-4xl pointer-events-none z-[300]';
      heart.style.left = '50%';
      heart.style.top = '50%';
      document.body.appendChild(heart);

      gsap.to(heart, {
        x: Math.random() * 600 - 300,
        y: -600 - Math.random() * 200,
        rotation: Math.random() * 720,
        scale: Math.random() + 0.5,
        opacity: 0,
        duration: 2,
        delay: i * 0.1,
        ease: 'power2.out',
        onComplete: () => heart.remove(),
      });
    }

    // Efeito de confetti quando completar
    if (newProgress === 100) {
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#FF69B4', '#FF1493'],
        });
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-8 shadow-2xl border border-pink-200">
      <div className="text-center mb-6">
        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
          💍 Missão: O Grande Dia
        </h3>
        <p className="text-gray-700 text-lg font-medium">
          Cada clique nos aproxima do nosso dia especial! ✨
        </p>
      </div>

      {/* Cena 3D */}
      {mounted && <WeddingScene3D progress={progress} />}

      {/* Barra de progresso elegante */}
      <div className="mt-8 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {progress}%
          </span>
          <span className="text-gray-600 font-semibold">Meta: 100%</span>
        </div>
        
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Brilho animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
          </div>
          
          {/* Ícones de progresso */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            {[0, 25, 50, 75, 100].map((milestone) => (
              <div
                key={milestone}
                className={`text-xl transition-all duration-500 ${
                  progress >= milestone ? 'scale-125 filter drop-shadow-lg' : 'opacity-30'
                }`}
              >
                {milestone === 100 ? '💑' : '💍'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botão de apoio cinematográfico */}
      <button
        onClick={addProgress}
        disabled={progress >= 100 || hasContributed}
        className={`w-full py-5 font-bold text-lg rounded-xl transition-all duration-300 shadow-xl relative overflow-hidden group ${
          progress >= 100
            ? 'bg-green-500 cursor-not-allowed'
            : hasContributed
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:scale-105 hover:shadow-2xl'
        }`}
      >
        <span className="relative z-10 text-white flex items-center justify-center gap-2">
          {progress >= 100 ? (
            <>
              <span>🎉</span>
              <span>MISSÃO CUMPRIDA!</span>
              <span>🎉</span>
            </>
          ) : hasContributed ? (
            <>
              <span>💝</span>
              <span>Obrigado pela sua contribuição!</span>
              <span>💝</span>
            </>
          ) : (
            <>
              <span>💖</span>
              <span>Contribuir (+5%)</span>
              <span>✨</span>
            </>
          )}
        </span>
        {progress < 100 && !hasContributed && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:animate-shimmer" />
        )}
      </button>

      {progress === 100 && (
        <div className="mt-6 p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-2xl text-center border-2 border-pink-300 animate-pulse-slow">
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            💝 Obrigado por fazer parte da nossa história! 💝
          </p>
        </div>
      )}
    </div>
  );
}
