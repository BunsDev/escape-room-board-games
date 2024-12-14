import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
  </div>
);