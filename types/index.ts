export interface PolaroidImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  side?: 'left' | 'right';
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

export interface ScrollTriggerConfig {
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}
