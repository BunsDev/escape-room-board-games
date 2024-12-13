import { X } from 'lucide-react';
import { Game } from '../types/game';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

export const GameModal = ({ game, onClose }: GameModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full animate-in slide-in-from-bottom duration-300">
        <div className="relative h-64">
          <img 
            src={game.imageUrl} 
            alt={game.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-900/50 rounded-full hover:bg-gray-900"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{game.title}</h2>
          <p className="text-gray-300 mb-4">{game.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Difficulty</p>
              <p className="text-purple-400 font-semibold">{game.difficulty}</p>
            </div>
            <div>
              <p className="text-gray-400">Players</p>
              <p className="text-white">{game.players}</p>
            </div>
            <div>
              <p className="text-gray-400">Duration</p>
              <p className="text-white">{game.time}</p>
            </div>
            <div>
              <p className="text-gray-400">Publisher</p>
              <p className="text-white">{game.publisher}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <span className="text-2xl font-bold text-purple-400">{game.price}</span>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Find Retailers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};