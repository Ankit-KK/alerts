'use client';

import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/shaders/holographicRingShader';

export interface HolographicRingHandle {
  mesh: THREE.Mesh | null;
  material: THREE.ShaderMaterial | null;
  resetScale: () => void;
}

const HolographicRing = forwardRef<HolographicRingHandle>((props, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  useImperativeHandle(ref, () => ({
    mesh: meshRef.current,
    material: materialRef.current,
    resetScale: () => {
      if (meshRef.current) meshRef.current.scale.set(0, 0, 0);
    },
  }));

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} scale={[0, 0, 0]}>
      <torusGeometry args={[2.2, 0.15, 32, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color('#00ffff') },
          uColor2: { value: new THREE.Color('#ff00ff') },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
});

HolographicRing.displayName = 'HolographicRing';
export { HolographicRing };
