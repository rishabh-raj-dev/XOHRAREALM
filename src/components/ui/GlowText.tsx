'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowTextProps {
  text: string;
  className?: string;
  color?: 'cyan' | 'purple' | 'pink';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animate?: boolean;
  stretched?: boolean;
}

export default function GlowText({
  text,
  className,
  color = 'cyan',
  as: Tag = 'h1',
  animate = true,
  stretched = true,
}: GlowTextProps) {
  // Mapped to grunge palette
  const colorStyles = {
    cyan: 'text-accent-amber text-glow-amber',
    purple: 'text-accent-rust',
    pink: 'text-accent-maroon',
  };

  const stretchClass = stretched ? 'text-stretched-center' : '';

  if (!animate) {
    return (
      <Tag
        className={cn(
          'font-display glitch-text',
          stretchClass,
          colorStyles[color],
          className
        )}
        data-text={text}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        'font-display flex flex-wrap justify-center animate-analog-drift',
        stretchClass,
        className
      )}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={cn('inline-block', colorStyles[color])}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? (
            <span className="w-[0.3em] inline-block">&nbsp;</span>
          ) : (
            char
          )}
        </motion.span>
      ))}
    </Tag>
  );
}
