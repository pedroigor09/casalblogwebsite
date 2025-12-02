export interface Theme {
  id: 'person1' | 'person2';
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  story: string;
  funFact: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
  instagram?: string;
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  date: string;
  image: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  funFact?: string;
}
