'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ExpectativaRealidadeProps {
  expectativa: string;
  realidade: string;
  caption: string;
  className?: string;
}

export function ExpectativaRealidade({
  expectativa,
  realidade,
  caption,
  className,
}: ExpectativaRealidadeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem Expectativa */}
      <div
        className={cn(
          'relative w-full h-96 transition-opacity duration-500',
          isHovered ? 'opacity-0' : 'opacity-100'
        )}
      >
        <Image
          src={expectativa}
          alt="Expectativa"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          ✨ Expectativa
        </div>
      </div>

      {/* Imagem Realidade */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Image
          src={realidade}
          alt="Realidade"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          😅 Realidade
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <p className="text-white font-bold text-xl">{caption}</p>
        <p className="text-white/80 text-sm mt-1">
          {isHovered ? '← A verdade!' : '← Passe o mouse!'}
        </p>
      </div>

      {/* Indicador de hover */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className={cn(
            'text-6xl transition-all duration-300',
            isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-70'
          )}
        >
          👆
        </div>
      </div>
    </div>
  );
}
