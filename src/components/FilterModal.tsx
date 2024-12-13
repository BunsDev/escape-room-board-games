import { X } from 'lucide-react';
import { FilterOptions } from '../types/filter';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterModal = ({ isOpen, onClose, filters, onFilterChange }: FilterModalProps) => {
  if (!isOpen) return null;

  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
  const playerRanges = ['1-2', '1-4', '3-5', '1-6'];
  const priceRanges = [
    { label: 'Under $15', value: '0-15' },
    { label: '$15 - $30', value: '15-30' },
    { label: '$30+', value: '30-999' }
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string | string[]) => {
    onFilterChange({
      ...filters,
      [key]: Array.isArray(filters[key]) 
        ? filters[key].includes(value as never)
          ? (filters[key] as string[]).filter(v => v !== value)
          : [...filters[key], value]
        : value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md animate-in">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Filter Games</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => handleFilterChange('difficulties', difficulty)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.difficulties.includes(difficulty)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Players</h3>
            <div className="flex flex-wrap gap-2">
              {playerRanges.map(range => (
                <button
                  key={range}
                  onClick={() => handleFilterChange('playerCounts', range)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.playerCounts.includes(range)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {range} players
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange('priceRange', value)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.priceRange === value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={() => onFilterChange({ difficulties: [], playerCounts: [], priceRange: '' })}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};