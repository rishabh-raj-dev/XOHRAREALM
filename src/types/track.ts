export interface Track {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  album?: string;
  duration: number; // in seconds
  audio_url: string;
  artwork_url: string;
  genre?: string;
  release_date?: string;
  play_count: number;
  sort_order: number;
  created_at: string;
}
