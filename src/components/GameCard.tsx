import { Star } from 'lucide-react';
import { Game } from '../types/game';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export const GameCard = ({ game, onClick }: GameCardProps) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20 cursor-pointer"
    >
      <div className="relative h-48">
        <img 
          src={game.imageUrl} 
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="ml-1 text-gray-300">{game.rating}</span>
          <span className="ml-4 text-purple-400">{game.difficulty}</span>
        </div>
        <p className="text-gray-400 text-sm mb-2">{game.players} players • {game.time}</p>
        <p className="text-purple-300 font-semibold">{game.price}</p>
      </div>
    </div>
  );
};