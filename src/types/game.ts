export interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  players: string;
  time: string;
  rating: number;
  imageUrl: string;
  price: string;
  publisher: string;
}