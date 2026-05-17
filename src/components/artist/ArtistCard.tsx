'use client';

import { motion } from 'framer-motion';
import { Artist } from '@/types/artist';
import Link from 'next/link';

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <Link href={`/artist/${artist.slug}`} className="block group relative">
      {/* ── Ambient Radial Glow (Behind Card) ── */}
      <motion.div
        className="absolute -inset-4 bg-accent-amber/0 rounded-lg blur-2xl pointer-events-none transition-colors duration-700"
        whileHover={{ backgroundColor: 'rgba(196,146,42,0.04)' }}
      />

      <motion.div
        className="relative flex items-center gap-5 p-4 bg-bg-secondary/60 backdrop-blur-sm border border-border-rough/20 h-full overflow-hidden transition-all duration-700 group-hover:border-accent-amber/20"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
        whileHover={{ x: 4 }}
      >
        {/* ── Analog Light Bleed Overlay ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cream/0 via-transparent to-transparent group-hover:from-accent-amber/5 transition-colors duration-700 pointer-events-none" />

        {/* ── Scanline Texture ── */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Avatar (Cinematic Icon) */}
        <div className="relative w-[72px] h-[72px] shrink-0 rounded-full overflow-hidden border border-dashed border-border-rough/40 bg-bg-elevated/50 group-hover:border-accent-amber/30 transition-colors duration-700">
          <motion.img
            src={artist.avatar_url}
            alt={artist.name}
            className="w-full h-full object-cover mix-blend-luminosity"
            style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
            whileHover={{ 
              filter: 'grayscale(30%) contrast(1.2) brightness(0.9)', 
              scale: 1.05 
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Faint inner shadow & film grain overlay */}
          <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Artist Info */}
        <div className="flex-1 min-w-0 py-1 relative z-10">
          {/* Micro Timestamp / ID */}
          <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="w-1 h-1 rounded-full bg-accent-rust animate-pulse" />
            <span className="font-micro text-[5px] text-accent-rust/60 uppercase tracking-[0.2em]">
              REC // {artist.id.slice(0, 6)}
            </span>
          </div>

          {/* Cinematic Title */}
          <h3 className="font-display text-[16px] md:text-[18px] font-bold tracking-[0.12em] uppercase text-text-primary/90 group-hover:text-accent-amber group-hover:text-glow-amber transition-all duration-500 leading-tight">
            {artist.name}
          </h3>
          
          <p className="text-text-muted/70 text-[10px] tracking-[0.25em] font-body mt-2 uppercase group-hover:text-text-secondary transition-colors duration-500">
            {artist.genre}
          </p>

          {/* Faint Waveform line (pure CSS) */}
          <div className="h-px w-12 mt-3 bg-gradient-to-r from-border-rough to-transparent group-hover:from-accent-amber/40 transition-colors duration-700" />
        </div>

        {/* Right side: Metadata & Interaction */}
        <div className="flex flex-col items-end justify-between h-[72px] shrink-0 border-l border-dashed border-border-rough/20 pl-5 relative z-10">
          <span className="text-[8px] text-text-muted/50 font-body tracking-[0.2em] uppercase">
            no.{String(index + 1).padStart(2, '0')}
          </span>

          {/* Analog Flicker Interaction */}
          <motion.div
            className="flex items-center gap-2 text-text-muted group-hover:text-accent-amber transition-colors duration-500"
            initial={{ opacity: 0.5 }}
            whileHover={{ 
              opacity: [1, 0.6, 1, 0.8, 1],
              x: 4
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-micro text-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              VIEW
            </span>
            <span className="text-[10px] font-body">→</span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
