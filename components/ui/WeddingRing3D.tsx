'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface WeddingRingProps {
  position: [number, number, number];
  rotationSpeed?: number;
  color?: string;
}

export function WeddingRing({ position, rotationSpeed = 1, color = '#FFD700' }: WeddingRingProps) {
  const ringRef = useRef<THREE.Group>(null);

  // Criar geometria do anel
  const ringGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.8;

    // Criar o círculo externo
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

    // Criar o buraco interno
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 5,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.01 * rotationSpeed;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ringRef} position={position}>
        {/* Anel principal */}
        <mesh geometry={ringGeometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={color}
            metalness={1}
            roughness={0.15}
            envMapIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}
