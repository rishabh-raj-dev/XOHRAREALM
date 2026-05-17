'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface GlowOrbProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  intensity?: number;
}

export default function GlowOrb({
  position,
  color = '#00F0FF',
  size = 0.3,
  intensity = 1,
}: GlowOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.scale.setScalar(
      size + Math.sin(t * 1.5) * 0.05 * intensity
    );
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15 * intensity}
        />
      </mesh>
      {/* Glow aura */}
      <mesh position={position}>
        <sphereGeometry args={[size * 3, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.03 * intensity}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}
