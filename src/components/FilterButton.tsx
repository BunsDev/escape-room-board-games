import { Filter } from 'lucide-react';

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton = ({ onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2 hover:bg-gray-600 transition-colors"
    >
      <Filter className="w-4 h-4" />
      <span>Filter</span>
    </button>
  );
};