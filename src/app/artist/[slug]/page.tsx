'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { mockArtists, mockTracks } from '@/data/mockArtists';
import TrackList from '@/components/artist/TrackList';
import SocialLinks from '@/components/artist/SocialLinks';
import NeonDivider from '@/components/ui/NeonDivider';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { useAudioStore } from '@/stores/audioStore';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
} from '@/lib/motion/variants';

export default function ArtistProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const artist = mockArtists.find((a) => a.slug === slug);
  const { play, setQueue } = useAudioStore();

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-2xl text-accent-amber mb-4">404</h1>
          <p className="text-text-secondary font-body text-xs">artist not found</p>
        </div>
      </div>
    );
  }

  const artistTracks = mockTracks.filter((t) => t.artist_id === artist.id);
  const accentColors = ['#D4A853', '#C97B4B', '#8B3A3A', '#6B7B3A', '#D4A853', '#C97B4B'];
  const accentColor = accentColors[mockArtists.indexOf(artist) % accentColors.length];

  const handlePlayAll = () => {
    if (artistTracks.length > 0) {
      setQueue(artistTracks, 0);
      play(artistTracks[0]);
    }
  };

  return (
    <div className="min-h-screen pb-32 relative bg-bg-primary overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-8 left-6 md:left-12 z-50">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-text-muted hover:text-accent-amber transition-colors group"
        >
          <span className="font-micro text-[10px] transform group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-body text-[10px] tracking-[0.2em] uppercase">Roster</span>
        </button>
      </div>

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full opacity-[0.06] blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
            top: '-10%',
            right: '-10%',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
            backgroundSize: '100% 4px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 lg:px-24 pt-32 md:pt-48">
        {/* Artist Header */}
        <motion.div
          className="flex flex-col md:flex-row items-start gap-12 md:gap-20 mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Avatar — Archive style */}
          <motion.div variants={fadeInUp} className="relative shrink-0">
            {/* Soft backdrop glow behind image */}
            <div 
              className="absolute -inset-4 rounded-full blur-2xl opacity-20 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            />
            
            <div
              className="w-48 h-64 md:w-56 md:h-72 overflow-hidden relative border border-border-rough/30 bg-bg-secondary/60 backdrop-blur-sm"
              style={{ borderRadius: '4px' }}
            >
              <img
                src={artist.avatar_url}
                alt={artist.name}
                className="w-full h-full object-cover mix-blend-luminosity"
                style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
              />
              <div className="absolute inset-0 shadow-[inset_0_4px_24px_rgba(0,0,0,0.9)] pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            </div>
            
            {/* Micro timestamp tag */}
            <div className="absolute -bottom-3 right-4 px-3 py-1.5 bg-bg-secondary/80 backdrop-blur-md border border-border-rough/40 rounded-sm flex items-center gap-2 shadow-xl">
              <span className="w-1 h-1 rounded-full bg-accent-rust animate-pulse" />
              <span className="text-[6px] font-micro tracking-[0.2em] text-text-muted uppercase">
                REC // {String(mockArtists.indexOf(artist) + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div variants={fadeInUp} className="flex-1 pt-4">
            <span
              className="inline-block text-[10px] tracking-[0.25em] uppercase font-body mb-4 text-text-muted/80"
            >
              {artist.genre.toLowerCase()}
            </span>
            <h1
              className="font-display text-4xl md:text-5xl font-bold tracking-wider mb-6 leading-none"
              style={{ 
                color: accentColor,
                textShadow: `0 0 30px ${accentColor}40`
              }}
            >
              {artist.name}
            </h1>
            <p className="text-text-secondary text-sm max-w-lg leading-relaxed font-body mb-8">
              {artist.bio}
            </p>

            {/* artistTracks.length > 0 && (
              <motion.div variants={fadeInUp}>
                <button 
                  onClick={handlePlayAll}
                  className="group flex items-center gap-3 px-6 py-3 border border-border-rough/40 bg-bg-secondary/40 backdrop-blur-sm hover:bg-bg-elevated transition-all duration-300"
                >
                  <span className="text-[10px]" style={{ color: accentColor }}>▶</span>
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-text-primary group-hover:text-accent-amber transition-colors">
                    play all ({artistTracks.length})
                  </span>
                </button>
              </motion.div>
            ) */}
          </motion.div>
        </motion.div>

        <div className="h-px w-full max-w-xs mx-auto mb-16 bg-gradient-to-r from-transparent via-border-rough to-transparent" />

        {/* Tracks Section (Commented out for now) */}
        {/* artistTracks.length > 0 && (
          <motion.div
            className="mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-sm tracking-[0.15em] mb-6 flex items-center gap-3 opacity-90">
              <span style={{ color: accentColor }} className="text-[10px]">❖</span>
              archives // recordings
            </h2>
            <div className="bg-bg-secondary/40 backdrop-blur-md border border-border-rough/20 p-2 md:p-4">
              <TrackList tracks={artistTracks} accentColor={accentColor} />
            </div>
          </motion.div>
        ) */}

        {/* Streaming & Social Links */}
        <motion.div
          className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h2 className="font-display text-sm tracking-[0.15em] mb-6 flex items-center gap-3 opacity-90">
              <span style={{ color: accentColor }} className="text-[10px]">❖</span>
              streaming
            </h2>
            <SocialLinks
              spotify_url={artist.spotify_url}
              soundcloud_url={artist.soundcloud_url}
              youtube_url={artist.youtube_url}
              apple_music_url={artist.apple_music_url}
            />
          </div>

          <div>
            <h2 className="font-display text-sm tracking-[0.15em] mb-6 flex items-center gap-3 opacity-90">
              <span style={{ color: accentColor }} className="text-[10px]">❖</span>
              network
            </h2>
            <SocialLinks
              instagram_url={artist.instagram_url}
              twitter_url={artist.twitter_url}
              tiktok_url={artist.tiktok_url}
              website_url={artist.website_url}
            />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: 'tracks', value: String(artistTracks.length).padStart(2, '0') },
            {
              label: 'plays',
              value: artistTracks
                .reduce((a, t) => a + t.play_count, 0)
                .toLocaleString(),
            },
            { label: 'genre', value: artist.genre.split('/')[0].trim().toLowerCase() },
            { label: 'status', value: 'active' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <div className="p-5 text-center border border-border-rough/20 bg-bg-secondary/40 backdrop-blur-sm group hover:border-border-rough/40 transition-colors">
                <p
                  className="font-display text-lg mb-2 group-hover:scale-105 transition-transform"
                  style={{ color: accentColor }}
                >
                  {stat.value}
                </p>
                <div className="h-px w-6 mx-auto bg-border-rough mb-2" />
                <p className="text-text-muted text-[9px] tracking-[0.2em] uppercase font-body">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
