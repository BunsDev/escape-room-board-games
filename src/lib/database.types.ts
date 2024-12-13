export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string
          title: string
          description: string
          difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
          min_players: number
          max_players: number
          duration_min: number
          duration_max: number
          rating: number
          image_url: string
          price: number
          publisher: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['games']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['games']['Insert']>
      }
      publishers: {
        Row: {
          id: string
          name: string
          website: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['publishers']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['publishers']['Insert']>
      }
      game_categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['game_categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['game_categories']['Insert']>
      }
      games_categories: {
        Row: {
          game_id: string
          category_id: string
        }
        Insert: Database['public']['Tables']['games_categories']['Row']
        Update: Partial<Database['public']['Tables']['games_categories']['Row']>
      }
    }
  }
}