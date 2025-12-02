'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimation<T extends HTMLElement>(
  animationFn: (element: T) => gsap.core.Timeline | gsap.core.Tween | void,
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      if (elementRef.current) {
        animationFn(elementRef.current);
      }
    }, elementRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}
