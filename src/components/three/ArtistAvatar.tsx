'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { Artist } from '@/types/artist';

interface ArtistAvatarProps {
  artist: Artist;
  position: [number, number, number];
  onClick?: () => void;
  index: number;
}

export default function ArtistAvatar({ artist, position, onClick, index }: ArtistAvatarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Colors per artist for variety
  const colors = ['#00F0FF', '#A855F7', '#F43F8E', '#3B82F6', '#10B981', '#F59E0B'];
  const accentColor = colors[index % colors.length];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle independent floating per card
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.5 + index * 1.5) * 0.15;
    groupRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.05;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group
        ref={groupRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        {/* Card body */}
        <RoundedBox
          args={[1.8, 2.4, 0.08]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#151518"
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* Glow border effect */}
        <RoundedBox
          args={[1.84, 2.44, 0.06]}
          radius={0.1}
          smoothness={4}
        >
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={hovered ? 0.25 : 0.08}
            side={THREE.BackSide}
          />
        </RoundedBox>

        {/* Avatar placeholder circle */}
        <mesh position={[0, 0.4, 0.05]}>
          <circleGeometry args={[0.5, 32]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.3}
            roughness={0.7}
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Inner ring */}
        <mesh position={[0, 0.4, 0.06]}>
          <ringGeometry args={[0.48, 0.52, 32]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={hovered ? 0.8 : 0.4}
          />
        </mesh>

        {/* Artist Name */}
        <Text
          position={[0, -0.35, 0.06]}
          fontSize={0.13}
          font="/fonts/orbitron.woff"
          color={hovered ? accentColor : '#F5F5F7'}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
          maxWidth={1.5}
        >
          {artist.name}
        </Text>

        {/* Genre */}
        <Text
          position={[0, -0.6, 0.06]}
          fontSize={0.07}
          color="#8A8A93"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
        >
          {artist.genre}
        </Text>

        {/* Bottom neon line */}
        <mesh position={[0, -0.9, 0.05]}>
          <planeGeometry args={[1.2, 0.005]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={hovered ? 0.8 : 0.3}
          />
        </mesh>

        {/* Hover glow aura */}
        {hovered && (
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[3, 3.5]} />
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={0.03}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}
