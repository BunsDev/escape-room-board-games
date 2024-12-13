-- Create publishers table
CREATE TABLE public.publishers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create game_categories table
CREATE TABLE public.game_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create games table
CREATE TABLE public.games (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Expert')),
    min_players INTEGER NOT NULL CHECK (min_players > 0),
    max_players INTEGER NOT NULL CHECK (max_players >= min_players),
    duration_min INTEGER NOT NULL CHECK (duration_min > 0),
    duration_max INTEGER NOT NULL CHECK (duration_max >= duration_min),
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    image_url TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    publisher UUID REFERENCES public.publishers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create junction table for games and categories
CREATE TABLE public.games_categories (
    game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.game_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, category_id)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for games table
CREATE TRIGGER update_games_updated_at
    BEFORE UPDATE ON games
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_games_title ON games(title);
CREATE INDEX idx_games_difficulty ON games(difficulty);
CREATE INDEX idx_games_price ON games(price);
CREATE INDEX idx_games_rating ON games(rating);

-- Insert initial categories
INSERT INTO game_categories (name) VALUES
    ('Mystery'),
    ('Horror'),
    ('Adventure'),
    ('Puzzle'),
    ('Detective'),
    ('Sci-Fi'),
    ('Historical');

-- Create RLS policies
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE publishers ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE games_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (read-only)
CREATE POLICY "Allow anonymous read access" ON games
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access" ON publishers
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access" ON game_categories
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access" ON games_categories
    FOR SELECT TO anon
    USING (true);