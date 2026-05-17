'use client';

import { motion } from 'framer-motion';

export default function VHSOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Animated scanlines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(232, 220, 200, 0.1) 2px,
            rgba(232, 220, 200, 0.1) 4px
          )`,
        }}
      />

      {/* Slow-moving scan bar */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(196,146,42,0.07), transparent)',
        }}
        animate={{ top: ['-2px', '100vh'] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* CRT vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.4), inset 0 0 300px rgba(0,0,0,0.2)',
        }}
      />

      {/* Brass gold glow — top right, like the cymbal light */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, rgba(196,146,42,1) 0%, transparent 70%)',
          top: '-5%',
          right: '-10%',
        }}
      />

      {/* Crimson guitar glow — bottom left */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, rgba(166,50,32,1) 0%, transparent 70%)',
          bottom: '5%',
          left: '-10%',
        }}
      />
    </div>
  );
}
