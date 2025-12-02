import { MapLocation, QuizQuestion } from '@/types/features';

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: '1',
    name: 'Salvador, Bahia',
    coordinates: [-38.5014, -12.9714],
    date: 'Janeiro 2024',
    image: '/images/salvador.jpg',
    description: 'Onde tudo começou! Primeira praia juntos ☀️',
  },
  {
    id: '2',
    name: 'Rio de Janeiro',
    coordinates: [-43.1729, -22.9068],
    date: 'Março 2024',
    image: '/images/rio.jpg',
    description: 'Cristo Redentor e muito amor! 🗿',
  },
  {
    id: '3',
    name: 'São Paulo',
    coordinates: [-46.6333, -23.5505],
    date: 'Maio 2024',
    image: '/images/sp.jpg',
    description: 'Final de semana gastronômico inesquecível 🍕',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'Quem acorda primeiro todo dia?',
    options: ['Ele', 'Ele', 'Sempre empatados', 'Depende do dia'],
    correctAnswer: 0,
    funFact: 'E sempre faz o café também! ☕',
  },
  {
    id: '2',
    question: 'Quem controla o controle remoto?',
    options: ['Ele', 'Ele', 'Cada um tem o seu', 'Nenhum, só Netflix'],
    correctAnswer: 1,
    funFact: 'Mas ambos amam séries de suspense! 📺',
  },
  {
    id: '3',
    question: 'Quem cozinha melhor?',
    options: ['Ele é chef', 'Ele domina', 'Empatados', 'Nenhum, só delivery'],
    correctAnswer: 2,
    funFact: 'Mas juntos fazem combinações incríveis! 👨‍🍳',
  },
  {
    id: '4',
    question: 'Quem escolhe os destinos de viagem?',
    options: ['Ele planeja tudo', 'Ele é o aventureiro', 'Decidem juntos', 'Sorteio'],
    correctAnswer: 2,
    funFact: 'A melhor parte é viajar juntos! ✈️',
  },
];
