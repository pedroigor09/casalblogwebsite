import { TimelineEvent, PolaroidImage } from '@/types';

export const COUPLE_NAMES = {
  person1: 'Jefferson', 
  person2: 'Bruno',
};

export const HERO_CONTENT = {
  title: 'Nossa História',
  subtitle: 'Uma jornada de amor e aventuras',
  date: 'Desde [Data Especial]',
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    date: 'Janeiro 2024',
    title: 'Primeiro Encontro',
    description: 'O dia em que tudo começou...',
    side: 'left',
  },
  {
    id: '2',
    date: 'Março 2024',
    title: 'Primeira Viagem',
    description: 'Aventuras inesquecíveis juntos',
    side: 'right',
  },
  {
    id: '3',
    date: 'Junho 2024',
    title: 'Momentos Especiais',
    description: 'Cada dia uma nova história',
    side: 'left',
  },
];

export const GALLERY_IMAGES: PolaroidImage[] = [
  {
    id: '7',
    src: '/img7.jpg',
    alt: 'Momento especial',
    caption: 'Nosso amor ❤️',
    rotation: -5,
  },
  {
    id: '8',
    src: '/img8.jpg',
    alt: 'Momento especial',
    caption: 'Aventuras juntos ✈️',
    rotation: 3,
  },
  {
    id: '9',
    src: '/img9.jpg',
    alt: 'Momento especial',
    caption: 'Sempre felizes 😊',
    rotation: -2,
  },
  {
    id: '10',
    src: '/img10.jpg',
    alt: 'Momento especial',
    caption: 'Amor verdadeiro 💕',
    rotation: 4,
  },
  {
    id: '11',
    src: '/img11.jpg',
    alt: 'Momento especial',
    caption: 'Momentos únicos ✨',
    rotation: -3,
  },
  {
    id: '12',
    src: '/img12.jpg',
    alt: 'Momento especial',
    caption: 'Para sempre 🌟',
    rotation: 2,
  },
  {
    id: '13',
    src: '/img13.jpg',
    alt: 'Momento especial',
    caption: 'Juntos sempre 💑',
    rotation: -4,
  },
  {
    id: '14',
    src: '/img14.jpg',
    alt: 'Momento especial',
    caption: 'Felicidade completa 🌈',
    rotation: 5,
  },
  {
    id: '15',
    src: '/img15.jpg',
    alt: 'Momento especial',
    caption: 'Nosso paraíso 🏝️',
    rotation: -1,
  },
];
