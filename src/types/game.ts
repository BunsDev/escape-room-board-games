import type { Database } from '../lib/database.types';

export type GameImage = Database['public']['Tables']['game_images']['Row'];

export type Game = Database['public']['Tables']['games']['Row'] & {
  publishers: string[];
  games_categories?: string[];
  game_images?: GameImage[];
  imageUrl?: string;
};

export const formatGameData = (game: Game) => ({
  ...game,
  players: `${game.min_players}-${game.max_players}`,
  time: `${game.duration_min}-${game.duration_max} min`,
  categories: game.games_categories || [],
  price: `$${game.price.toFixed(2)}`
});