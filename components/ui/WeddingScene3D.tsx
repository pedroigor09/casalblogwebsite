'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Sparkles } from '@react-three/drei';
import { WeddingRing } from './WeddingRing3D';
import * as THREE from 'three';

function Particles({ progress }: { progress: number }) {
  const count = 1000;
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.05, 1, 0.5); // Cores quentes (laranja/dourado)
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Calcular posição dos anéis baseado no progresso
  const ringDistance = 2;
  const angle = (progress / 100) * Math.PI * 2;

  return (
    <group ref={groupRef}>
      {/* Anéis */}
      <WeddingRing position={[-ringDistance, 0, 0]} rotationSpeed={1} color="#FFD700" />
      <WeddingRing position={[ringDistance, 0, 0]} rotationSpeed={-1} color="#FFA500" />

      {/* Partículas */}
      <Particles progress={progress} />

      {/* Sparkles ao redor */}
      <Sparkles
        count={100}
        scale={10}
        size={3}
        speed={0.4}
        opacity={0.6}
        color="#FFD700"
      />

      {/* Luzes */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFD700" />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#FFA500" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
    </group>
  );
}

export function WeddingScene3D({ progress }: { progress: number }) {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene progress={progress} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="sunset" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
