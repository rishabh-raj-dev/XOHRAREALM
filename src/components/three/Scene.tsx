'use client';

import { Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ParticleField from './ParticleField';
import ArtistAvatar from './ArtistAvatar';
import CameraRig from './CameraRig';
import GlowOrb from './GlowOrb';
import AudioReactiveRing from './AudioReactiveRing';
import { mockArtists } from '@/data/mockArtists';
import { useAudioStore } from '@/stores/audioStore';
import { useUIStore } from '@/stores/uiStore';
import { useRouter } from 'next/navigation';

function SceneContent() {
  const frequencyData = useAudioStore((s) => s.frequencyData);
  const setSceneReady = useUIStore((s) => s.setSceneReady);
  const router = useRouter();

  // Arrange artists in a curved formation
  const artistPositions: [number, number, number][] = [
    [-3.5, 0.5, -1],
    [-1.8, -0.3, 0.5],
    [-0.2, 0.8, -0.5],
    [1.4, -0.2, 0.3],
    [3, 0.6, -0.8],
    [4.5, -0.1, 0],
  ];

  const handleArtistClick = useCallback(
    (slug: string) => {
      router.push(`/artist/${slug}`);
    },
    [router]
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#00F0FF" />
      <pointLight position={[-10, -5, 5]} intensity={0.2} color="#A855F7" />

      {/* Camera Controller */}
      <CameraRig intensity={0.4} />

      {/* Starfield background */}
      <Stars
        radius={50}
        depth={80}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Ambient particles */}
      <ParticleField count={600} size={0.01} color="#00F0FF" spread={30} />
      <ParticleField count={300} size={0.008} color="#A855F7" spread={25} />

      {/* Decorative glow orbs */}
      <GlowOrb position={[-6, 3, -5]} color="#00F0FF" size={0.5} intensity={0.7} />
      <GlowOrb position={[7, -2, -8]} color="#A855F7" size={0.7} intensity={0.5} />
      <GlowOrb position={[0, 4, -10]} color="#F43F8E" size={0.4} intensity={0.4} />

      {/* Audio reactive ring */}
      <AudioReactiveRing
        position={[0, 0, -3]}
        color="#00F0FF"
        frequencyData={frequencyData}
      />
      <AudioReactiveRing
        position={[0, 0, -5]}
        color="#A855F7"
        frequencyData={frequencyData}
      />

      {/* Floating Artist Avatars */}
      {mockArtists.map((artist, i) => (
        <ArtistAvatar
          key={artist.id}
          artist={artist}
          position={artistPositions[i]}
          index={i}
          onClick={() => handleArtistClick(artist.slug)}
        />
      ))}
    </>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
