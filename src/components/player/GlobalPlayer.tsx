'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore } from '@/stores/audioStore';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import Equalizer from './Equalizer';

export default function GlobalPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    toggle,
    next,
    previous,
    setAudioElement,
    setCurrentTime,
    setDuration,
  } = useAudioStore();

  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
    }
  }, [setAudioElement]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => next();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setCurrentTime, setDuration, next]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />

      <AnimatePresence>
        {currentTrack && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1714] winamp-border"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Progress bar on top */}
            <ProgressBar className="px-3 pt-2" />

            <div className="px-3 pb-2 pt-1 flex items-center gap-3">
              {/* Track info — LCD display */}
              <div className="flex items-center gap-3 min-w-0 w-1/3 md:w-1/4">
                {/* Artwork */}
                <div className="w-9 h-9 flex-shrink-0 overflow-hidden border border-[#2a2520]">
                  <img
                    src={currentTrack.artwork_url}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover saturate-[0.6]"
                  />
                </div>
                {/* LCD info */}
                <div className="min-w-0 lcd-display px-2 py-1 flex-1 hidden sm:block">
                  <p className="text-[10px] font-bold truncate">
                    {currentTrack.title.toUpperCase()}
                  </p>
                  <p className="text-[8px] truncate opacity-70">
                    {currentTrack.artist_name}
                  </p>
                </div>
              </div>

              {/* Playback controls — retro buttons */}
              <div className="flex items-center justify-center gap-2 flex-1">
                <button
                  onClick={previous}
                  className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-accent-amber transition-colors cursor-pointer border border-[#2a2520] bg-[#14120e] active:bg-[#0d0c0a]"
                  aria-label="Previous track"
                >
                  <span className="text-[10px]">⏮</span>
                </button>

                <button
                  onClick={toggle}
                  className="w-9 h-7 flex items-center justify-center cursor-pointer border border-[#2a2520] bg-[#14120e] active:bg-[#0d0c0a]"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  <span className="text-accent-green text-xs">
                    {isPlaying ? '⏸' : '▶'}
                  </span>
                </button>

                <button
                  onClick={next}
                  className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-accent-amber transition-colors cursor-pointer border border-[#2a2520] bg-[#14120e] active:bg-[#0d0c0a]"
                  aria-label="Next track"
                >
                  <span className="text-[10px]">⏭</span>
                </button>
              </div>

              {/* Right side: Equalizer + Volume */}
              <div className="hidden md:flex items-center gap-3 w-1/4 justify-end">
                <Equalizer barCount={8} />
                <VolumeControl />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
