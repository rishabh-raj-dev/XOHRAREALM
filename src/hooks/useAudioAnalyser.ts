'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useAudioAnalyser(audioElement: HTMLAudioElement | null) {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(new Uint8Array(0));
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);

  const init = useCallback(() => {
    if (!audioElement || contextRef.current) return;

    try {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(audioElement);
      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.8;

      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);

      contextRef.current = ctx;
      sourceRef.current = source;
      setAnalyser(analyserNode);
    } catch (e) {
      console.warn('Failed to init audio analyser:', e);
    }
  }, [audioElement]);

  const update = useCallback(() => {
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    setFrequencyData(data);
    rafRef.current = requestAnimationFrame(update);
  }, [analyser]);

  useEffect(() => {
    if (analyser) {
      rafRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [analyser, update]);

  return { analyser, frequencyData, init };
}
