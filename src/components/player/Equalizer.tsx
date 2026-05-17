'use client';

import { motion } from 'framer-motion';
import { useAudioStore } from '@/stores/audioStore';

interface EqualizerProps {
  barCount?: number;
  className?: string;
}

export default function Equalizer({ barCount = 8, className }: EqualizerProps) {
  const { isPlaying, frequencyData } = useAudioStore();

  return (
    <div className={`flex items-end gap-[2px] h-6 ${className || ''}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        let height = 3;
        if (frequencyData && frequencyData.length > 0 && isPlaying) {
          const dataIndex = Math.floor((i / barCount) * frequencyData.length);
          height = Math.max(3, (frequencyData[dataIndex] / 255) * 24);
        }

        return (
          <motion.div
            key={i}
            className="w-[3px]"
            style={{ background: '#C4922A' }}
            animate={
              isPlaying && !frequencyData
                ? {
                    height: ['3px', `${6 + Math.random() * 18}px`, '3px'],
                  }
                : { height: `${height}px` }
            }
            transition={
              isPlaying && !frequencyData
                ? {
                    duration: 0.3 + Math.random() * 0.3,
                    repeat: Infinity,
                    delay: i * 0.04,
                    ease: 'easeInOut',
                  }
                : { duration: 0.1 }
            }
          />
        );
      })}
    </div>
  );
}
