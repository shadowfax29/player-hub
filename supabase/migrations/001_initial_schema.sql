-- PlayHub Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. LISTINGS TABLE
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('ps5', 'pc', 'vr', 'console', 'arcade', 'streaming', 'racing')),
  location TEXT NOT NULL,
  address TEXT,
  price_per_hour NUMERIC(10,2) NOT NULL DEFAULT 0,
  rating NUMERIC(3,1) DEFAULT 0,
  image TEXT,
  photos TEXT[] DEFAULT '{}',
  featured_games TEXT[] DEFAULT '{}',
  badge TEXT,
  hardware TEXT,
  console_model TEXT,
  tv_size TEXT,
  internet_speed TEXT,
  available_days TEXT[] DEFAULT '{MON,TUE,WED,THU,FRI,SAT,SUN}',
  open_time TEXT DEFAULT '10:00',
  close_time TEXT DEFAULT '22:00',
  min_booking_hours INT DEFAULT 1,
  max_booking_hours INT DEFAULT 8,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'maintenance')),
  id_type TEXT,
  id_document_url TEXT,
  address_proof_url TEXT,
  tax_id TEXT,
  bank_account TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  hours INT NOT NULL DEFAULT 1,
  total_price NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. PROFILES TABLE (hosts and guests)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'guest' CHECK (role IN ('host', 'guest')),
  id_type TEXT,
  id_document_url TEXT,
  selfie_url TEXT,
  address_proof_url TEXT,
  tax_id TEXT,
  bank_account TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings(location);
CREATE INDEX IF NOT EXISTS idx_listings_host ON listings(host_id);
CREATE INDEX IF NOT EXISTS idx_bookings_guest ON bookings(guest_id);
CREATE INDEX IF NOT EXISTS idx_bookings_host ON bookings(host_id);
CREATE INDEX IF NOT EXISTS idx_bookings_listing ON bookings(listing_id);
CREATE INDEX IF NOT EXISTS idx_reviews_listing ON reviews(listing_id);

-- ROW LEVEL SECURITY
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Listings: public read, host write
CREATE POLICY "listings_select_public" ON listings FOR SELECT USING (true);
CREATE POLICY "listings_insert_auth" ON listings FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "listings_update_host" ON listings FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "listings_delete_host" ON listings FOR DELETE USING (auth.uid() = host_id);

-- Bookings: guest and host can read, guest can insert
CREATE POLICY "bookings_select_own" ON bookings FOR SELECT USING (auth.uid() = guest_id OR auth.uid() = host_id);
CREATE POLICY "bookings_insert_guest" ON bookings FOR INSERT WITH CHECK (auth.uid() = guest_id);
CREATE POLICY "bookings_update_own" ON bookings FOR UPDATE USING (auth.uid() = guest_id OR auth.uid() = host_id);

-- Reviews: public read, author write
CREATE POLICY "reviews_select_public" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_auth" ON reviews FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "reviews_delete_own" ON reviews FOR DELETE USING (auth.uid() = author_id);

-- Profiles: own read/write
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- SEED: Insert mock listings (assign to first host user or use a placeholder)
-- These will appear in the marketplace
INSERT INTO listings (title, description, category, location, address, price_per_hour, rating, image, featured_games, badge, hardware, tv_size, internet_speed, status) VALUES
  ('PS5 Elite Gaming Room', 'Premium PlayStation 5 gaming room with 4K OLED display and surround sound.', 'ps5', 'Shibuya, Tokyo', '1-2-3 Shibuya, Tokyo 150-0002', 12, 4.9, 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80', ARRAY['Spider-Man 2', 'FC 24', 'God of War Ragnarök', 'Horizon Forbidden West', 'Demon Souls', 'Returnal', 'Ratchet & Clank'], NULL, 'PlayStation 5 Pro', '55"', '1 Gbps', 'active'),
  ('Cyber Nexus Pro PC', 'High-end gaming PC lounge with RTX 4090 and ultrawide monitors.', 'pc', 'Gangnam, Seoul', '45 Gangnam-daero, Seoul', 15, 4.8, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80', ARRAY['Valorant', 'League of Legends', 'CS2', 'Dota 2', 'Apex Legends', 'Overwatch 2', 'Fortnite', 'PUBG', 'Minecraft', 'GTA V', 'Elden Ring', 'Baldurs Gate 3', 'Cyberpunk 2077', 'Starfield', 'Diablo IV', 'WoW'], NULL, 'Custom PC RTX 4090', '32" Ultrawide', '2 Gbps', 'active'),
  ('Neon VR Arena', 'Full-body VR arena with wireless headsets and haptic feedback suits.', 'vr', 'Berlin, Mitte', 'Friedrichstraße 100, 10117', 25, 5.0, 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80', ARRAY['Half-Life: Alyx', 'Beat Saber', 'Superhot VR'], NULL, 'Meta Quest 3 + Haptic Suit', 'N/A — VR', '1 Gbps', 'active'),
  ('The Vault Retro Lounge', 'Vintage arcade cabinets and retro console collection.', 'arcade', 'Brooklyn, NY', '123 Atlantic Ave, Brooklyn 11201', 8, 4.7, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80', ARRAY['Pac-Man', 'Street Fighter II', 'Donkey Kong', 'Galaga', 'Centipede', 'Frogger', 'Space Invaders', 'Tetris', 'Pong', 'Q*bert', 'Street Fighter II', 'Mortal Kombat', 'Sonic the Hedgehog', 'Super Mario Bros', 'Contra', 'Double Dragon', 'Ghosts n Goblins', 'Out Run', 'After Burner', 'Pole Position', 'Dig Dug', 'Pengo', 'Paperboy', 'Marble Madness', 'California Games'], 'TOP RATED', 'Arcade Cabinets', 'CRT', '100 Mbps', 'active'),
  ('Velocity Sim Racing', 'Full sim-racing rig with motion platform and triples.', 'console', 'London, Soho', '42 Wardour St, London W1D 6NF', 20, 4.9, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', ARRAY['iRacing', 'F1 23', 'Assetto Corsa'], NULL, 'Fanatec DD1 + Motion Platform', '3x 32" Monitors', '500 Mbps', 'active'),
  ('Zenith Streamer Pod', 'Professional streaming setup with green screen and lighting.', 'streaming', 'San Francisco, CA', '88 Market St, San Francisco 94105', 18, 4.6, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80', ARRAY['Fortnite', 'Warzone', 'Twitch Tools'], NULL, 'Streaming PC + Green Screen', '27" Monitor', '1 Gbps', 'active')
ON CONFLICT DO NOTHING;

-- SEED: Insert mock reviews
INSERT INTO reviews (listing_id, author_name, rating, comment) VALUES
  ((SELECT id FROM listings WHERE title = 'PS5 Elite Gaming Room' LIMIT 1), 'Alex Johnson', 5, 'Absolutely mental setup! The OLED screen response time is incredible. Perfect for our local FIFA tournament.'),
  ((SELECT id FROM listings WHERE title = 'PS5 Elite Gaming Room' LIMIT 1), 'Sarah Lee', 5, 'Great vibe and the snacks selection was top notch. Had some minor lag on one game but Marcus fixed it instantly. Will be back!'),
  ((SELECT id FROM listings WHERE title = 'Cyber Nexus Pro PC' LIMIT 1), 'Kim Minjun', 5, 'Best PC setup in Seoul. The ultrawide monitors are insane for competitive gaming.'),
  ((SELECT id FROM listings WHERE title = 'Neon VR Arena' LIMIT 1), 'Hans Mueller', 5, 'The full-body haptic suit makes this the most immersive VR experience I have ever had.'),
  ((SELECT id FROM listings WHERE title = 'The Vault Retro Arcade' LIMIT 1), 'Mike Chen', 5, 'Amazing retro collection. Spent 3 hours playing Street Fighter II. Pure nostalgia.')
ON CONFLICT DO NOTHING;
