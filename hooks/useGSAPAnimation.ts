'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGSAPAnimation<T extends HTMLElement>(
  animationFn: (element: T) => gsap.core.Timeline | gsap.core.Tween | void,
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animation = animationFn(elementRef.current);

    return () => {
      if (animation) {
        animation.kill();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}
