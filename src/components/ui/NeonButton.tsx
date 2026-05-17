'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'cyan' | 'purple' | 'pink' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function NeonButton({
  variant = 'cyan',
  size = 'md',
  children,
  className,
  ...props
}: NeonButtonProps) {
  const sizeStyles = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
  };

  // Mapped to grunge palette but keeps original variant names for compatibility
  const variantStyles = {
    cyan: 'bg-accent-amber/10 text-accent-amber border border-dashed border-accent-amber/30 hover:bg-accent-amber/20 hover:border-accent-amber/50',
    purple: 'bg-accent-rust/10 text-accent-rust border border-dashed border-accent-rust/30 hover:bg-accent-rust/20 hover:border-accent-rust/50',
    pink: 'bg-accent-maroon/10 text-accent-maroon border border-dashed border-accent-maroon/30 hover:bg-accent-maroon/20 hover:border-accent-maroon/50',
    outline: 'bg-transparent text-text-primary border border-dashed border-border-rough hover:bg-bg-card hover:border-border-rough-hover',
  };

  return (
    <motion.button
      className={cn(
        'font-body font-bold tracking-[0.15em] uppercase cursor-pointer transition-all duration-300',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'tween', duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
