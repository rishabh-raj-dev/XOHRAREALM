-- ═══════════════════════════════════════════════════════
-- XOHRA REALM Database Schema
-- Initial Migration
-- ═══════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Artists Table ───
CREATE TABLE IF NOT EXISTS artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  genre TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  spotify_url TEXT,
  soundcloud_url TEXT,
  youtube_url TEXT,
  apple_music_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  tiktok_url TEXT,
  website_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Tracks Table ───
CREATE TABLE IF NOT EXISTS tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  album TEXT,
  duration INTEGER, -- in seconds
  audio_url TEXT NOT NULL,
  artwork_url TEXT,
  genre TEXT,
  release_date DATE,
  play_count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Releases Table ───
CREATE TABLE IF NOT EXISTS releases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('single', 'ep', 'album')),
  artwork_url TEXT,
  release_date DATE,
  description TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Release-Track Junction ───
CREATE TABLE IF NOT EXISTS release_tracks (
  release_id UUID REFERENCES releases(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  track_number INTEGER,
  PRIMARY KEY (release_id, track_id)
);

-- ─── Indexes ───
CREATE INDEX idx_artists_slug ON artists(slug);
CREATE INDEX idx_artists_featured ON artists(featured);
CREATE INDEX idx_tracks_artist_id ON tracks(artist_id);
CREATE INDEX idx_releases_artist_id ON releases(artist_id);

-- ─── Row Level Security ───
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE release_tracks ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read artists" ON artists FOR SELECT USING (true);
CREATE POLICY "Public can read tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public can read releases" ON releases FOR SELECT USING (true);
CREATE POLICY "Public can read release_tracks" ON release_tracks FOR SELECT USING (true);

-- ─── Updated At Trigger ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER artists_updated_at
  BEFORE UPDATE ON artists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
