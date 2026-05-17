'use client';

import { useAudioStore } from '@/stores/audioStore';
import { formatTime } from '@/lib/utils';

interface ProgressBarProps {
  className?: string;
}

export default function ProgressBar({ className }: ProgressBarProps) {
  const { currentTime, duration, seek } = useAudioStore();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <span className="text-[9px] text-accent-green tabular-nums w-8 text-right font-body"
        style={{ textShadow: '0 0 4px rgba(58,187,94,0.4)' }}
      >
        {formatTime(currentTime)}
      </span>

      <div
        className="flex-1 h-[3px] bg-[#1a1714] cursor-pointer group relative border border-[#2a2520]"
        onClick={handleSeek}
      >
        {/* Progress fill */}
        <div
          className="absolute inset-y-0 left-0 bg-accent-amber transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-3 bg-accent-amber opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progress}% - 4px)` }}
        />
      </div>

      <span className="text-[9px] text-accent-green tabular-nums w-8 font-body"
        style={{ textShadow: '0 0 4px rgba(58,187,94,0.4)' }}
      >
        {formatTime(duration)}
      </span>
    </div>
  );
}
