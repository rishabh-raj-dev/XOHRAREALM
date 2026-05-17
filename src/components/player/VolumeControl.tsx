'use client';

import { useAudioStore } from '@/stores/audioStore';

interface VolumeControlProps {
  className?: string;
}

export default function VolumeControl({ className }: VolumeControlProps) {
  const { volume, setVolume } = useAudioStore();

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <button
        onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
        className="text-[10px] cursor-pointer text-text-muted hover:text-accent-amber transition-colors font-body"
        aria-label={volume === 0 ? 'Unmute' : 'Mute'}
      >
        {volume === 0 ? 'MUTE' : 'VOL'}
      </button>
      <div className="relative w-16">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-1 cursor-pointer"
          aria-label="Volume"
        />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-accent-amber/50 pointer-events-none"
          style={{ width: `${volume * 100}%` }}
        />
      </div>
    </div>
  );
}
