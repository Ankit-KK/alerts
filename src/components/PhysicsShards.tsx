'use client';

import { useRef, useMemo, useEffect } from 'react';
import { RigidBody, CuboidCollider, CylinderCollider } from '@react-three/rapier';
import * as THREE from 'three';

const SHARD_COUNT = 18;
const COIN_COUNT = 8;

export function PhysicsShards() {
  const shardApis = useRef<any[]>([]);
  const coinApis = useRef<any[]>([]);

  const shards = useMemo(
    () =>
      Array.from({ length: SHARD_COUNT }).map((_, i) => ({
        id: i,
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
      })),
    []
  );

  const coins = useMemo(
    () => Array.from({ length: COIN_COUNT }).map((_, i) => ({ id: i })),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      shardApis.current.forEach((api, i) => {
        if (!api) return;
        const angle = (i / SHARD_COUNT) * Math.PI * 2;
        api.applyImpulse(
          {
            x: Math.cos(angle) * 3 + (Math.random() - 0.5) * 2,
            y: 5 + Math.random() * 4,
            z: Math.sin(angle) * 3 + (Math.random() - 0.5) * 2,
          },
          true
        );
      });
      coinApis.current.forEach((api) => {
        if (!api) return;
        api.applyImpulse(
          {
            x: (Math.random() - 0.5) * 4,
            y: 6 + Math.random() * 4,
            z: (Math.random() - 0.5) * 4,
          },
          true
        );
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <RigidBody type="fixed" position={[0, -2, 0]}>
        <CuboidCollider args={[6, 0.1, 6]} />
      </RigidBody>
      <RigidBody type="fixed" position={[4, 0, 0]}>
        <CuboidCollider args={[0.1, 3, 6]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-4, 0, 0]}>
        <CuboidCollider args={[0.1, 3, 6]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 4]}>
        <CuboidCollider args={[6, 3, 0.1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, -4]}>
        <CuboidCollider args={[6, 3, 0.1]} />
      </RigidBody>

      {shards.map((s, i) => (
        <RigidBody
          key={`shard-${i}`}
          colliders="cuboid"
          mass={0.3}
          position={[0, 0, 0]}
          linearDamping={0.4}
          angularDamping={0.5}
          ref={(api) => { shardApis.current[i] = api; }}
        >
          <mesh>
            <boxGeometry args={[0.2, 0.08, 0.08]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </RigidBody>
      ))}

      {coins.map((_, i) => (
  <RigidBody
    key={`coin-${i}`}
    colliders={false}
    mass={0.2}
    position={[0, 0.5, 0]}
    linearDamping={0.3}
    angularDamping={0.4}
    ref={(api) => { coinApis.current[i] = api; }}
  >
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.25, 0.25, 0.08, 16]} />
      <meshStandardMaterial
        color="#ffd700"
        emissive="#ffaa00"
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={1}
      />
    </mesh>
    <CylinderCollider args={[0.25, 0.08]} />
  </RigidBody>
))}
    </>
  );
}
