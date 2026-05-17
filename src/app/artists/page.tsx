'use client';

import { motion } from 'framer-motion';
import { mockArtists } from '@/data/mockArtists';
import ArtistCard from '@/components/artist/ArtistCard';
import GlowText from '@/components/ui/GlowText';
import NeonDivider from '@/components/ui/NeonDivider';
import { staggerContainer, fadeInUp } from '@/lib/motion/variants';

export default function ArtistsPage() {
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
            the collective
          </span>
          <div className="mt-3">
            <GlowText
              text="ALL ARTISTS"
              className="text-2xl md:text-3xl"
              color="cyan"
            />
          </div>
          <p className="text-text-secondary mt-4 text-xs max-w-md font-body leading-relaxed">
            every artist under the xohra realm banner.
            united by raw sound and analog soul.
          </p>
        </motion.div>

        <NeonDivider className="mb-12 max-w-sm" />

        {/* Artist Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {mockArtists.map((artist, i) => (
            <motion.div key={artist.id} variants={fadeInUp}>
              <ArtistCard artist={artist} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
