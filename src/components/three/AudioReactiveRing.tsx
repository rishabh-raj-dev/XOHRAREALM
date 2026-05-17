'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AudioReactiveRingProps {
  position?: [number, number, number];
  color?: string;
  frequencyData?: Uint8Array | null;
}

export default function AudioReactiveRing({
  position = [0, 0, 0],
  color = '#00F0FF',
  frequencyData,
}: AudioReactiveRingProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    // Default gentle animation
    let scale = 1 + Math.sin(t * 0.5) * 0.05;
    let opacity = 0.15;

    // Audio reactive
    if (frequencyData && frequencyData.length > 0) {
      const avg = frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length;
      const normalized = avg / 255;
      scale = 1 + normalized * 0.4;
      opacity = 0.1 + normalized * 0.3;
    }

    ref.current.scale.setScalar(scale);
    ref.current.rotation.z = t * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.3;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
