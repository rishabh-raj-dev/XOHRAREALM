'use client';

import { create } from 'zustand';
import { Track } from '@/types/track';

interface AudioState {
  // Playback
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;

  // Queue
  queue: Track[];
  queueIndex: number;

  // Audio element reference
  audioElement: HTMLAudioElement | null;
  audioContext: AudioContext | null;
  analyserNode: AnalyserNode | null;
  frequencyData: Uint8Array | null;

  // Actions
  setAudioElement: (el: HTMLAudioElement) => void;
  play: (track?: Track) => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (vol: number) => void;
  seek: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  next: () => void;
  previous: () => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  initAnalyser: () => void;
  updateFrequencyData: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  queue: [],
  queueIndex: 0,
  audioElement: null,
  audioContext: null,
  analyserNode: null,
  frequencyData: null,

  setAudioElement: (el) => set({ audioElement: el }),

  play: (track) => {
    const state = get();
    const audio = state.audioElement;
    if (!audio) return;

    if (track && track.id !== state.currentTrack?.id) {
      audio.src = track.audio_url;
      audio.load();
      set({ currentTrack: track, currentTime: 0, duration: 0 });
    }

    audio.volume = state.volume;
    audio.play().catch(() => {});
    set({ isPlaying: true });
  },

  pause: () => {
    const audio = get().audioElement;
    if (audio) {
      audio.pause();
    }
    set({ isPlaying: false });
  },

  toggle: () => {
    const state = get();
    if (state.isPlaying) {
      state.pause();
    } else {
      state.play();
    }
  },

  setVolume: (vol) => {
    const audio = get().audioElement;
    if (audio) audio.volume = vol;
    set({ volume: vol });
  },

  seek: (time) => {
    const audio = get().audioElement;
    if (audio) {
      audio.currentTime = time;
    }
    set({ currentTime: time });
  },

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),

  next: () => {
    const state = get();
    if (state.queue.length === 0) return;
    const nextIndex = (state.queueIndex + 1) % state.queue.length;
    set({ queueIndex: nextIndex });
    state.play(state.queue[nextIndex]);
  },

  previous: () => {
    const state = get();
    if (state.queue.length === 0) return;
    // If more than 3 seconds in, restart current track
    if (state.currentTime > 3) {
      state.seek(0);
      return;
    }
    const prevIndex = state.queueIndex === 0 ? state.queue.length - 1 : state.queueIndex - 1;
    set({ queueIndex: prevIndex });
    state.play(state.queue[prevIndex]);
  },

  setQueue: (tracks, startIndex = 0) => {
    set({ queue: tracks, queueIndex: startIndex });
  },

  initAnalyser: () => {
    const state = get();
    if (state.analyserNode || !state.audioElement) return;

    try {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(state.audioElement);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      analyser.connect(ctx.destination);

      set({
        audioContext: ctx,
        analyserNode: analyser,
        frequencyData: dataArray,
      });
    } catch (e) {
      console.warn('Audio analyser init failed:', e);
    }
  },

  updateFrequencyData: () => {
    const state = get();
    if (state.analyserNode && state.frequencyData) {
      const data = new Uint8Array(state.analyserNode.frequencyBinCount);
      state.analyserNode.getByteFrequencyData(data);
      set({ frequencyData: data });
    }
  },
}));
