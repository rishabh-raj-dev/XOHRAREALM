'use client';

import { motion } from 'framer-motion';
import GlowText from '@/components/ui/GlowText';
import NeonDivider from '@/components/ui/NeonDivider';
import GlassCard from '@/components/ui/GlassCard';
import { fadeInUp, staggerContainer } from '@/lib/motion/variants';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-text-muted font-body">
            our story
          </span>
          <div className="mt-3">
            <GlowText
              text="ABOUT XOHRA REALM"
              className="text-xl md:text-2xl"
              color="cyan"
            />
          </div>
        </motion.div>

        <NeonDivider className="mb-12 max-w-sm" />

        {/* Content */}
        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8" hoverEffect={false}>
              <h2 className="font-display text-xs md:text-sm mb-6 text-accent-amber tracking-wider">
                the vision
              </h2>
              <p className="text-text-secondary text-xs leading-relaxed mb-4 font-body">
                xohra realm was born from a single idea: that music should be felt,
                not just heard. we are an underground collective dedicated to discovering and
                nurturing artists who push beyond the boundaries of the expected.
              </p>
              <p className="text-text-secondary text-xs leading-relaxed font-body">
                our roster spans the full spectrum of electronic music — from deep, introspective
                ambient works to explosive sonic experiments. what unites our artists is a shared
                commitment to raw expression and artistic honesty.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <GlassCard className="p-8" hoverEffect={false}>
              <h2 className="font-display text-xs md:text-sm mb-6 text-accent-rust tracking-wider">
                philosophy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'raw',
                    desc: 'we champion unfiltered expression over polished perfection.',
                    symbol: '◈',
                  },
                  {
                    title: 'authentic',
                    desc: 'every release is a genuine artifact of the artist\'s inner world.',
                    symbol: '◇',
                  },
                  {
                    title: 'underground',
                    desc: 'we exist outside the mainstream. that\'s where the real art lives.',
                    symbol: '△',
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="text-lg mb-2 text-text-muted">{item.symbol}</div>
                    <h3 className="font-body text-xs font-bold tracking-wider text-accent-amber mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-[11px] leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            variants={staggerContainer}
          >
            {[
              { value: '6+', label: 'artists' },
              { value: '20+', label: 'releases' },
              { value: '100K+', label: 'listeners' },
              { value: '2024', label: 'founded' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <GlassCard className="p-5 text-center" hoverEffect={false}>
                  <p className="font-display text-sm md:text-base text-accent-amber mb-1">
                    {stat.value}
                  </p>
                  <p className="text-text-muted text-[8px] tracking-[0.2em] uppercase font-body">
                    {stat.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
