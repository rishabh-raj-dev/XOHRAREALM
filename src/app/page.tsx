'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { mockArtists, mockTracks } from '@/data/mockArtists';
import ArtistCard from '@/components/artist/ArtistCard';
import NeonButton from '@/components/ui/NeonButton';
import NeonDivider from '@/components/ui/NeonDivider';
import GlowText from '@/components/ui/GlowText';
import GlassCard from '@/components/ui/GlassCard';
import { useAudioStore } from '@/stores/audioStore';
import { formatTime } from '@/lib/utils';
import {
  staggerContainer,
  fadeInUp,
  revealOnScroll,
} from '@/lib/motion/variants';

export default function Home() {
  const { play, setQueue } = useAudioStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms for hero image
  const heroX = useTransform(mouseX, [0, 1], [-8, 8]);
  const heroY = useTransform(mouseY, [0, 1], [-5, 5]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  const handlePlayLatest = () => {
    setQueue(mockTracks, 0);
    play(mockTracks[0]);
  };

  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════
          HERO SECTION — Immersive grunge landing
          ═══════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden vhs-scanlines crt-vignette">
        {/* Hero background image with parallax */}
        <motion.div
          className="absolute inset-[-20px] z-0"
          style={{ x: heroX, y: heroY }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/xohrarealm.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(0.8) contrast(1.1) brightness(0.85)',
            }}
          />
        </motion.div>

        {/* Dark overlay layers - reduced opacity to show more image */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-bg-primary/10 to-bg-primary z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/30 via-transparent to-bg-primary/30 z-[1]" />

        {/* Floating decorative text elements */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {/* Top-left coordinates */}
          <motion.div
            className="absolute top-24 left-6 md:left-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <p className="font-body text-[9px] tracking-[0.2em] text-text-muted">
              28.6139° N, 77.2090° E
            </p>
          </motion.div>

          {/* Top-right status */}
          <motion.div
            className="absolute top-24 right-6 md:right-12 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <p className="font-body text-[9px] tracking-[0.2em] text-accent-amber animate-vhs-flicker">
              ● now streaming
            </p>
            <p className="font-body text-[9px] tracking-[0.2em] text-text-muted mt-1">
              est. 2024
            </p>
          </motion.div>

          {/* Bottom-left tag */}
          <motion.div
            className="absolute bottom-32 left-6 md:left-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <p className="font-body text-[9px] tracking-[0.3em] text-text-muted uppercase">
              vol.01 // underground frequencies
            </p>
          </motion.div>

          {/* Floating dashed box */}
          <motion.div
            className="absolute top-1/3 right-[10%] hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 3.5, duration: 1 }}
          >
            <div className="w-32 h-20 border border-dashed border-accent-amber/20 animate-drift" />
          </motion.div>
        </div>

        {/* ── Atmospheric depth layers (behind title only) ── */}

        {/* Radial dark fog — soft dark bloom centered on title area */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(15,13,11,0.65) 0%, rgba(15,13,11,0.25) 45%, transparent 75%)',
          }}
        />

        {/* Analog bloom — warm amber glow radiating from center */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none mix-blend-soft-light"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 50% 48%, rgba(196,146,42,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Cinematic vignette — deeper than CRT, focused on corners */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(15,13,11,0.7) 100%)',
          }}
        />

        {/* Horizontal scan interference — analog display feel */}
        <motion.div
          className="absolute inset-0 z-[4] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(196,146,42,0.08) 3px, rgba(196,146,42,0.08) 4px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center px-6 max-w-3xl mx-auto">

          {/* Backdrop blur zone — only behind the text cluster */}
          <div
            className="absolute inset-0 -inset-x-12 -inset-y-8 pointer-events-none"
            style={{
              backdropFilter: 'blur(3px) saturate(0.9)',
              WebkitBackdropFilter: 'blur(3px) saturate(0.9)',
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 75%)',
            }}
          />

          {/* Floating dust particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-[2px] h-[2px] rounded-full bg-accent-cream/20"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${15 + (i * 11) % 70}%`,
                }}
                animate={{
                  y: [0, -30 - (i * 5), 0],
                  x: [0, (i % 2 === 0 ? 15 : -10), 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 6 + i * 0.8,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Label tag */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="inline-block px-4 py-2 text-[9px] tracking-[0.3em] uppercase text-text-muted border border-dashed border-border-rough font-body">
              independent music collective
            </span>
          </motion.div>

          {/* ── Main title — stacked cinematic composition ── */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Chromatic aberration — red channel */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              aria-hidden="true"
              style={{
                transform: 'translate(-1.5px, 0.5px)',
                opacity: 0.12,
                filter: 'blur(0.5px)',
              }}
            >
              <div className="flex flex-col items-center leading-[0.85]">
                <span className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-[0.06em] text-accent-rust text-stretched-center">
                  XOHRA
                </span>
                <span className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-[0.06em] text-accent-rust text-stretched-center">
                  REALM
                </span>
              </div>
            </div>

            {/* Chromatic aberration — amber channel */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              aria-hidden="true"
              style={{
                transform: 'translate(1px, -0.5px)',
                opacity: 0.08,
                filter: 'blur(0.3px)',
              }}
            >
              <div className="flex flex-col items-center leading-[0.85]">
                <span className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-[0.06em] text-accent-amber text-stretched-center">
                  XOHRA
                </span>
                <span className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-[0.06em] text-accent-amber text-stretched-center">
                  REALM
                </span>
              </div>
            </div>

            {/* Primary title — the real layer */}
            <div className="relative animate-breathe">
              <div className="flex flex-col items-center leading-[0.85]">
                <motion.span
                  className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-[0.06em] text-accent-amber text-glow-amber text-stretched-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  XOHRA
                </motion.span>
                <motion.span
                  className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-extrabold tracking-[0.06em] text-accent-amber text-glow-amber text-stretched-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  REALM
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Thin decorative line */}
          <motion.div
            className="relative w-24 h-px mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(196,146,42,0.5), transparent)',
            }}
          />

          {/* Subtitle */}
          <motion.p
            className="relative text-text-secondary text-[11px] md:text-[13px] max-w-sm mx-auto text-center mb-10 leading-relaxed font-body tracking-[0.08em] animate-analog-drift"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            style={{
              textShadow: '0 0 20px rgba(15,13,11,0.8), 0 0 40px rgba(15,13,11,0.5)',
            }}
          >
            raw sound. analog soul.<br />
            where noise becomes meaning.
          </motion.p>

          {/* ── CTA — retro media-player controls ── */}
          <motion.div
            className="relative flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {/* Play button — primary action */}
            <motion.button
              className="flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-accent-amber cursor-pointer group"
              onClick={handlePlayLatest}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <span className="flex items-center justify-center w-8 h-8 border border-dashed border-accent-amber/40 group-hover:border-accent-amber/70 transition-colors">
                <span className="text-[8px]">▶</span>
              </span>
              <span className="group-hover:text-accent-cream transition-colors">listen now</span>
            </motion.button>

            {/* Divider */}
            <span className="text-border-rough text-[8px]">│</span>

            {/* Explore button — secondary */}
            <motion.button
              className="font-body text-[10px] tracking-[0.25em] uppercase text-text-muted hover:text-text-secondary cursor-pointer transition-colors group"
              onClick={() => {
                document.getElementById('artists')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <span>explore artists</span>
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[8px] font-body tracking-[0.3em] text-text-muted uppercase">
              scroll
            </span>
            <div className="w-px h-6 bg-border-rough" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED ARTISTS SECTION
          ═══════════════════════════════════════════ */}
      <section id="artists" className="relative py-24 md:py-32 px-6">
        <div className="w-full">
          {/* Section header — centered */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[9px] tracking-[0.4em] uppercase text-text-muted font-body mb-4" >
              the roster
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-wider text-text-primary mb-4">
              our <span className="text-accent-amber">artists</span>
            </h2>
            {/* <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed font-body" >
              the voices shaping the underground.
              every artist here is a world of their own.
            </p> */}
          </motion.div>

          <NeonDivider className="mb-14 max-w-xs mx-auto" />

          {/* Artist grid */}
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ padding: '0 2rem' }}>
            {mockArtists.map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LATEST RELEASES SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="w-full">
          <motion.div
            className="mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-text-muted font-body">
              fresh drops
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-wider text-text-primary mt-3 mb-4">
              latest <span className="text-accent-rust">releases</span>
            </h2>
            <p className="text-text-secondary text-xs max-w-md leading-relaxed font-body">
              new sound from the collective.
            </p>
          </motion.div>

          <NeonDivider className="mb-12 max-w-sm" />

          {/* Track cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mockTracks.slice(0, 4).map((track, i) => (
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
                      className="w-full h-full object-cover saturate-[0.7] group-hover:saturate-100 transition-all duration-500"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 border border-dashed border-accent-amber/50 flex items-center justify-center">
                        <span className="text-accent-amber text-sm">▶</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-body text-xs font-bold tracking-wider truncate mb-1 group-hover:text-accent-amber transition-colors">
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
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={revealOnScroll}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-6 tracking-wider">
            enter the <span className="text-accent-amber">realm</span>
          </h2>
          <p className="text-text-secondary text-xs mb-10 max-w-md leading-relaxed font-body">
            join the underground. get notified about new releases,
            exclusive content, and events.
          </p>

          {/* Email signup */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-bg-card border border-dashed border-border-rough text-text-primary text-xs font-body placeholder:text-text-muted focus:outline-none focus:border-accent-amber/40 transition-colors"
            />
            <NeonButton variant="cyan" size="md">
              subscribe
            </NeonButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
