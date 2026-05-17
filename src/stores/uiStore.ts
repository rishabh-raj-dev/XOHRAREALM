'use client';

import { create } from 'zustand';
import { Artist } from '@/types/artist';

interface UIState {
  // Navigation
  activeSection: string;
  isMenuOpen: boolean;

  // Artist
  selectedArtist: Artist | null;

  // Loading
  isLoading: boolean;
  loadingProgress: number;

  // 3D Scene
  cameraTarget: [number, number, number];
  sceneReady: boolean;

  // Actions
  setActiveSection: (section: string) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  selectArtist: (artist: Artist | null) => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setSceneReady: (ready: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'home',
  isMenuOpen: false,
  selectedArtist: null,
  isLoading: true,
  loadingProgress: 0,
  cameraTarget: [0, 0, 5],
  sceneReady: false,

  setActiveSection: (section) => set({ activeSection: section }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  selectArtist: (artist) => set({ selectedArtist: artist }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setSceneReady: (ready) => set({ sceneReady: ready }),
}));
