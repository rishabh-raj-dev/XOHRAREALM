'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'strong' | 'neon-cyan' | 'neon-purple';
  hoverEffect?: boolean;
  tapeCorner?: boolean;
  children: React.ReactNode;
}

export default function GlassCard({
  variant = 'default',
  hoverEffect = true,
  tapeCorner = false,
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-none overflow-hidden transition-all duration-300 grunge-panel',
        hoverEffect && 'grunge-panel-hover',
        tapeCorner && 'tape-corner',
        className
      )}
      whileHover={hoverEffect ? { scale: 1.01, rotate: 0.3 } : undefined}
      transition={{ type: 'tween', duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
