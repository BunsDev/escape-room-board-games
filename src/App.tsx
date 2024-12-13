import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { GameCard } from './components/GameCard';
import { GameModal } from './components/GameModal';
import { FilterButton } from './components/FilterButton';
import { FilterModal } from './components/FilterModal';
import { games } from './data/games';
import { Game } from './types/game';
import { FilterOptions } from './types/filter';
import { Search } from 'lucide-react';

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    difficulties: [],
    playerCounts: [],
    priceRange: '',
  });

  const filterGames = (games: Game[]) => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDifficulty = filters.difficulties.length === 0 ||
        filters.difficulties.includes(game.difficulty);

      const matchesPlayers = filters.playerCounts.length === 0 ||
        filters.playerCounts.some(range => {
          const [min, max] = range.split('-').map(Number);
          const [gameMin, gameMax] = game.players.split('-').map(Number);
          return gameMin >= min && gameMax <= max;
        });

      const matchesPrice = !filters.priceRange ||
        (() => {
          const price = parseFloat(game.price.replace('$', ''));
          const [min, max] = filters.priceRange.split('-').map(Number);
          return price >= min && price <= max;
        })();

      return matchesSearch && matchesDifficulty && matchesPlayers && matchesPrice;
    });
  };

  const filteredGames = filterGames(games);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Escape Room Games
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <FilterButton onClick={() => setIsFilterOpen(true)} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Discover the Best Escape Room Board Games</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Immerse yourself in challenging puzzles and thrilling adventures from the comfort of your home.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onClick={setSelectedGame}
            />
          ))}
        </div>
      </main>

      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}

export default App;