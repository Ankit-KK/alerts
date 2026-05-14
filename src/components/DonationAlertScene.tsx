'use client';

import { useRef, Suspense } from 'react';
import { Float, Trail } from '@react-three/drei';
import { HolographicRing, HolographicRingHandle } from './HolographicRing';
import { PhysicsShards } from './PhysicsShards';
import { TextOverlay } from './TextOverlay';
import { useDonationTimeline } from '@/hooks/useDonationTimeline';
import { useDonationStore } from '@/store/useDonationStore';
import * as THREE from 'three';

export function DonationAlertScene() {
  const ringRef = useRef<HolographicRingHandle>(null);
  const nameRef = useRef<THREE.Mesh>(null);
  const amountRef = useRef<THREE.Mesh>(null);
  const messageRef = useRef<THREE.Mesh>(null);
  const activeAlert = useDonationStore((s) => s.activeAlert);

  const explodePhysics = () => {
    // PhysicsShards auto-explodes on mount because we key it with alert.id.
  };

  useDonationTimeline({
    ringRef,
    nameRef,
    amountRef,
    messageRef,
    explodePhysics,
  });

  return (
    <>
      <HolographicRing ref={ringRef} />
      <group>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Trail width={0.4} length={4} color="#ff00ff" attenuation={(t) => t * t}>
            <mesh visible={false} />
          </Trail>
        </Float>
        <Suspense fallback={null}>
          <TextOverlay
            nameRef={nameRef}
            amountRef={amountRef}
            messageRef={messageRef}
          />
        </Suspense>
      </group>
      {activeAlert && <PhysicsShards key={activeAlert.id} />}
    </>
  );
}
