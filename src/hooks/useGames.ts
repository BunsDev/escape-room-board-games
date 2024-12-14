import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Game } from '../types/game';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('games')
          .select(`
            *,
            publishers (name),
            games_categories (
              game_categories (name)
            )
          `)
          .order('title', { ascending: true });

        if (supabaseError) throw supabaseError;
        
        if (data) {
          const gamesWithImageUrls = data.map(game => ({
            ...game,
            publishers: game.publishers || { name: 'Unknown Publisher' },
            games_categories: game.games_categories || [],
            imageUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d'
          }));
          setGames(gamesWithImageUrls);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};
// export const useGames = () => {
//   const [games, setGames] = useState<Game[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const { data, error: supabaseError } = await supabase
//           .from('games')
//           .select(`
//             *,
//             publishers (name),
//             games_categories (
//               game_categories (name)
//             ),
//             game_images (
//               storage_path,
//               is_primary,
//               display_order
//             )
//           `)
//           .order('title', { ascending: true });

//         if (supabaseError) throw supabaseError;
        
//         if (data) {
//           const gamesWithImageUrls = data.map(game => ({
//             ...game,
//             imageUrl: game.game_images?.find(img => img.is_primary)?.storage_path
//               ? `${supabase.storage.from('games').getPublicUrl(
//                   game.game_images.find(img => img.is_primary)?.storage_path || ''
//                 ).data.publicUrl}`
//               : 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d'
//           }));
//           setGames(gamesWithImageUrls);
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch games');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGames();
//   }, []);

//   return { games, loading, error };
// };