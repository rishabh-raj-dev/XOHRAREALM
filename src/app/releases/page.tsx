'use client';

import { motion } from 'framer-motion';
import { mockTracks } from '@/data/mockArtists';
import GlowText from '@/components/ui/GlowText';
import NeonDivider from '@/components/ui/NeonDivider';
import GlassCard from '@/components/ui/GlassCard';
import { useAudioStore } from '@/stores/audioStore';
import { formatTime } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/motion/variants';

export default function ReleasesPage() {
  const { play, setQueue } = useAudioStore();

  return (
    <div className="min-h-screen pt-28 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-text-muted font-body">
            catalog
          </span>
          <div className="mt-3">
            <GlowText
              text="ALL RELEASES"
              className="text-2xl md:text-3xl"
              color="purple"
            />
          </div>
          <p className="text-text-secondary mt-4 text-xs max-w-md font-body leading-relaxed">
            browse the full catalog of xohra realm releases.
          </p>
        </motion.div>

        <NeonDivider className="mb-12 max-w-sm" />

        {/* Releases grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {mockTracks.map((track, i) => (
            <motion.div key={track.id} variants={fadeInUp}>
              <GlassCard
                className="p-4 cursor-pointer group"
                onClick={() => {
                  setQueue(mockTracks, i);
                  play(track);
                }}
              >
                {/* Artwork */}
                <div className="aspect-square mb-4 overflow-hidden relative bg-bg-elevated border border-dashed border-border-rough">
                  <img
                    src={track.artwork_url}
                    alt={track.title}
                    className="w-full h-full object-cover saturate-[0.5] group-hover:saturate-[0.8] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 border border-dashed border-accent-rust/50 flex items-center justify-center">
                      <span className="text-accent-rust text-sm">▶</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-body text-xs font-bold tracking-wider truncate mb-1 group-hover:text-accent-rust transition-colors">
                  {track.title.toLowerCase()}
                </h3>
                <p className="text-text-muted text-[10px] truncate font-body">
                  {track.artist_name.toLowerCase()}
                </p>
                <div className="flex items-center justify-between mt-3 text-[9px] text-text-muted font-body">
                  <span>{(track.genre ?? '').toLowerCase()}</span>
                  <span>{formatTime(track.duration)}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
