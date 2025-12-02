'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/layout/ThemeProvider';

export function ThemeToggle() {
  const { currentTheme, toggleTheme, themeData } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }
    toggleTheme();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="fixed top-6 right-6 z-[200] bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-gray-200 hover:scale-105"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{currentTheme === 'person1' ? '☀️' : '💖'}</span>
        <span className="font-bold text-gray-800">{themeData.name}</span>
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      </div>
    </button>
  );
}
