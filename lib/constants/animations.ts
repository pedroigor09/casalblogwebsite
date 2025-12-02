import { AnimationConfig } from '@/types';

export const EASE = {
  smooth: 'power3.out',
  elastic: 'elastic.out(1, 0.3)',
  bounce: 'back.out(1.7)',
  cinematic: 'power4.inOut',
  fast: 'power2.out',
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  cinematic: 2,
} as const;

export const HERO_ANIMATION: AnimationConfig = {
  duration: DURATION.cinematic,
  ease: EASE.cinematic,
  delay: 0.5,
};

export const POLAROID_ANIMATION: AnimationConfig = {
  duration: DURATION.normal,
  ease: EASE.bounce,
};

export const TEXT_REVEAL_ANIMATION: AnimationConfig = {
  duration: DURATION.slow,
  ease: EASE.smooth,
};
