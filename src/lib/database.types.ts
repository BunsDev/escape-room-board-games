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
          price: number
          publisher_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
          min_players: number
          max_players: number
          duration_min: number
          duration_max: number
          rating: number
          price: number
          publisher_id: string
        }
        Update: Partial<Database['public']['Tables']['games']['Insert']>
      }
      game_images: {
        Row: {
          id: string
          game_id: string
          storage_path: string
          is_primary: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          game_id: string
          storage_path: string
          is_primary?: boolean
          display_order?: number
        }
        Update: Partial<Database['public']['Tables']['game_images']['Insert']>
      }
      publishers: {
        Row: {
          id: string
          name: string
          website: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          website?: string | null
        }
        Update: Partial<Database['public']['Tables']['publishers']['Insert']>
      }
      game_categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: Partial<Database['public']['Tables']['game_categories']['Insert']>
      }
      games_categories: {
        Row: {
          game_id: string
          category_id: string
        }
        Insert: {
          game_id: string
          category_id: string
        }
        Update: Partial<Database['public']['Tables']['games_categories']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}