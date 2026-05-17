'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonDividerProps {
  color?: 'cyan' | 'purple' | 'gradient';
  className?: string;
}

export default function NeonDivider({ color = 'cyan', className }: NeonDividerProps) {
  return (
    <div className={cn('relative flex w-full items-center gap-3', className)}>
      <div className="flex-1 border-t border-dashed border-border-rough" />
      <span className="text-text-muted text-[8px] font-body tracking-[0.3em] uppercase">
        ✦
      </span>
      <div className="flex-1 border-t border-dashed border-border-rough" />
    </div>
  );
}
