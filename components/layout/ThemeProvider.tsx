'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Theme } from '@/types/features';

interface ThemeContextType {
  currentTheme: 'person1' | 'person2';
  toggleTheme: () => void;
  themeData: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEMES: Record<'person1' | 'person2', Theme> = {
  person1: {
    id: 'person1',
    name: 'Versão Dele',
    colors: {
      primary: 'from-orange-500 to-coral-500',
      secondary: 'from-amber-400 to-orange-400',
      accent: 'text-orange-600',
      gradient: 'bg-gradient-to-br from-orange-100 via-coral-100 to-pink-100',
    },
    story: 'Na minha versão, tudo começou quando eu o vi pela primeira vez... foi mágico! ☀️',
    funFact: 'Eu sempre acordo primeiro e faço o café! ☕',
  },
  person2: {
    id: 'person2',
    name: 'Versão Dele',
    colors: {
      primary: 'from-pink-500 to-rose-500',
      secondary: 'from-rose-400 to-pink-400',
      accent: 'text-pink-600',
      gradient: 'bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100',
    },
    story: 'Já na minha versão, lembro que a primeira coisa que notei foi aquele sorriso... 💕',
    funFact: 'Eu sou o mais organizado da relação! 📚',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<'person1' | 'person2'>('person1');

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'person1' ? 'person2' : 'person1'));
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        toggleTheme,
        themeData: THEMES[currentTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
