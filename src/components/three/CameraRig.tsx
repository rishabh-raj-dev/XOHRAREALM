'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

interface CameraRigProps {
  intensity?: number;
}

export default function CameraRig({ intensity = 0.3 }: CameraRigProps) {
  const { camera } = useThree();
  const mouse = useMousePosition();
  const targetRef = useRef(new THREE.Vector3(0, 0, 5));

  useFrame(() => {
    // Smooth camera follow based on mouse position
    const targetX = mouse.normalizedX * intensity;
    const targetY = mouse.normalizedY * intensity * 0.5;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    // Always look at center
    camera.lookAt(targetRef.current);
  });

  return null;
}
