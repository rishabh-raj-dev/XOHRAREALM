'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

interface WaveformProps {
  audioUrl?: string;
  isPlaying?: boolean;
  className?: string;
}

export default function Waveform({ audioUrl, isPlaying, className }: WaveformProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  const initWavesurfer = useCallback(async () => {
    if (!containerRef.current || !audioUrl) return;

    // Dynamic import to avoid SSR issues
    const WaveSurfer = (await import('wavesurfer.js')).default;

    // Destroy previous instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: 'rgba(0, 240, 255, 0.3)',
      progressColor: 'rgba(0, 240, 255, 0.7)',
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 32,
      normalize: true,
      interact: false,
      fillParent: true,
    });

    ws.load(audioUrl);
    ws.on('ready', () => setLoaded(true));

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audioUrl]);

  useEffect(() => {
    initWavesurfer();
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [initWavesurfer]);

  return (
    <div className={`relative ${className || ''}`}>
      <div
        ref={containerRef}
        className="w-full opacity-60"
        style={{ minHeight: '32px' }}
      />
      {!loaded && audioUrl && (
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-4 bg-bg-elevated rounded animate-pulse" />
        </div>
      )}
    </div>
  );
}
