export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  genre: string;
  avatar_url: string;
  banner_url: string;
  spotify_url?: string;
  soundcloud_url?: string;
  youtube_url?: string;
  apple_music_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  tiktok_url?: string;
  website_url?: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
