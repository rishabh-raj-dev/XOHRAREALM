export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          id: string;
          name: string;
          slug: string;
          bio: string | null;
          genre: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          spotify_url: string | null;
          soundcloud_url: string | null;
          youtube_url: string | null;
          apple_music_url: string | null;
          instagram_url: string | null;
          twitter_url: string | null;
          tiktok_url: string | null;
          website_url: string | null;
          featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          bio?: string | null;
          genre?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          spotify_url?: string | null;
          soundcloud_url?: string | null;
          youtube_url?: string | null;
          apple_music_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          tiktok_url?: string | null;
          website_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          bio?: string | null;
          genre?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          spotify_url?: string | null;
          soundcloud_url?: string | null;
          youtube_url?: string | null;
          apple_music_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          tiktok_url?: string | null;
          website_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
      };
      tracks: {
        Row: {
          id: string;
          title: string;
          artist_id: string;
          album: string | null;
          duration: number | null;
          audio_url: string;
          artwork_url: string | null;
          genre: string | null;
          release_date: string | null;
          play_count: number;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          artist_id: string;
          album?: string | null;
          duration?: number | null;
          audio_url: string;
          artwork_url?: string | null;
          genre?: string | null;
          release_date?: string | null;
          play_count?: number;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          artist_id?: string;
          album?: string | null;
          duration?: number | null;
          audio_url?: string;
          artwork_url?: string | null;
          genre?: string | null;
          release_date?: string | null;
          play_count?: number;
          sort_order?: number;
        };
      };
      releases: {
        Row: {
          id: string;
          title: string;
          artist_id: string;
          type: 'single' | 'ep' | 'album';
          artwork_url: string | null;
          release_date: string | null;
          description: string | null;
          spotify_url: string | null;
          apple_music_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          artist_id: string;
          type: 'single' | 'ep' | 'album';
          artwork_url?: string | null;
          release_date?: string | null;
          description?: string | null;
          spotify_url?: string | null;
          apple_music_url?: string | null;
          created_at?: string;
        };
        Update: {
          title?: string;
          artist_id?: string;
          type?: 'single' | 'ep' | 'album';
          artwork_url?: string | null;
          release_date?: string | null;
          description?: string | null;
          spotify_url?: string | null;
          apple_music_url?: string | null;
        };
      };
    };
  };
}
