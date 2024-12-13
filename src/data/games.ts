import { Game } from '../types/game';

export const games: Game[] = [
  {
    id: '1',
    title: 'Exit: The Abandoned Cabin',
    description: 'During a hiking trip, you seek shelter in an abandoned cabin. But the door locks behind you, and you must solve various puzzles to escape.',
    difficulty: 'Medium',
    players: '1-4',
    time: '60-120 min',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    price: '$14.99',
    publisher: 'Thames & Kosmos'
  },
  {
    id: '2',
    title: 'Unlock!: The House on the Hill',
    description: 'Explore a mysterious haunted house filled with supernatural puzzles and hidden secrets.',
    difficulty: 'Hard',
    players: '1-6',
    time: '45-60 min',
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1513977055326-8ae6272d90a7',
    price: '$29.99',
    publisher: 'Space Cowboys'
  },
  {
    id: '3',
    title: 'Escape Room: The Game',
    description: 'A collection of four unique scenarios with real-time pressure and physical components.',
    difficulty: 'Medium',
    players: '3-5',
    time: '60 min',
    rating: 4.0,
    imageUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d',
    price: '$39.99',
    publisher: 'Spin Master Games'
  }
];