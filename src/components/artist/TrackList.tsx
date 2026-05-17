'use client';

import { motion } from 'framer-motion';
import { Track } from '@/types/track';
import { useAudioStore } from '@/stores/audioStore';
import { formatTime } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/motion/variants';

interface TrackListProps {
  tracks: Track[];
  accentColor?: string;
}

export default function TrackList({ tracks, accentColor = '#D4A853' }: TrackListProps) {
  const { currentTrack, isPlaying, play, pause, setQueue } = useAudioStore();

  const handlePlay = (track: Track, index: number) => {
    if (currentTrack?.id === track.id) {
      isPlaying ? pause() : play();
    } else {
      setQueue(tracks, index);
      play(track);
    }
  };

  return (
    <motion.div
      className="space-y-1"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Cinematic header */}
      <div className="flex items-center gap-4 px-3 py-2 border-b border-border-rough/20 text-[8px] text-text-muted font-body tracking-[0.2em] uppercase mb-2">
        <span className="w-6 opacity-50">#</span>
        <span className="flex-1 opacity-50">title</span>
        <span className="w-16 text-right hidden sm:block opacity-50">plays</span>
        <span className="w-12 text-right opacity-50">time</span>
      </div>

      {tracks.map((track, i) => {
        const isActive = currentTrack?.id === track.id;

        return (
          <motion.div
            key={track.id}
            variants={fadeInUp}
            className={`group relative flex items-center gap-4 px-3 py-3 cursor-pointer transition-all duration-300 border border-transparent ${
              isActive
                ? 'bg-accent-amber/5 border-border-rough/20'
                : 'hover:bg-bg-elevated hover:border-border-rough/10'
            }`}
            onClick={() => handlePlay(track, i)}
          >
            {/* Active Indicator Line */}
            {isActive && (
              <motion.div 
                layoutId="active-track-indicator"
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ backgroundColor: accentColor }}
              />
            )}

            {/* Track number / play cursor */}
            <div className="w-6 text-center font-body flex items-center justify-center">
              {isActive && isPlaying ? (
                <div className="flex items-end gap-[2px] h-3">
                  <motion.div className="w-[2px] bg-accent-rust" animate={{ height: [4, 12, 6, 10, 4] }} transition={{ duration: 0.8, repeat: Infinity }} />
                  <motion.div className="w-[2px] bg-accent-rust" animate={{ height: [8, 4, 10, 6, 8] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-[2px] bg-accent-rust" animate={{ height: [6, 10, 4, 12, 6] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                </div>
              ) : isActive ? (
                <span className="text-accent-rust text-[10px]">■</span>
              ) : (
                <span className="text-text-muted text-[10px] group-hover:hidden transition-opacity">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              {!isActive && (
                <span
                  className="text-[10px] hidden group-hover:block drop-shadow-md"
                  style={{ color: accentColor }}
                >
                  ▶
                </span>
              )}
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs md:text-sm font-display tracking-wider truncate transition-all duration-300 ${
                  isActive ? 'text-glow-amber' : 'text-text-primary group-hover:text-text-secondary'
                }`}
                style={isActive ? { color: accentColor } : undefined}
              >
                {track.title}
              </p>
              {track.album && (
                <p className="text-[9px] text-text-muted truncate font-body uppercase tracking-[0.1em] mt-1">
                  {track.album}
                </p>
              )}
            </div>

            {/* Play count */}
            <span className="text-[9px] text-text-muted/60 hidden sm:block w-16 text-right font-body tracking-wider group-hover:text-text-muted transition-colors">
              {track.play_count.toLocaleString()}
            </span>

            {/* Duration */}
            <span className="text-[10px] text-text-secondary tabular-nums w-12 text-right font-body group-hover:text-accent-amber transition-colors">
              {formatTime(track.duration)}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
