'use client';

import { forwardRef } from 'react';
import { Text } from '@react-three/drei';
import { useDonationStore } from '@/store/useDonationStore';
import * as THREE from 'three';

interface TextOverlayProps {
  nameRef?: React.RefObject<THREE.Mesh>;
  amountRef?: React.RefObject<THREE.Mesh>;
  messageRef?: React.RefObject<THREE.Mesh>;
}

const TextOverlay = forwardRef<any, TextOverlayProps>(
  ({ nameRef, amountRef, messageRef }, ref) => {
    const activeAlert = useDonationStore((s) => s.activeAlert);
    if (!activeAlert) return null;

    const { donorName, amount, message, currency } = activeAlert;

    return (
      <group>
        <Text
          ref={nameRef}
          fontSize={0.7}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, 1.5, 0]}
          outlineWidth={0.05}
          outlineColor="#00ffff"
          font="/fonts/Inter-Bold.woff"
        >
          {donorName}
        </Text>
        <Text
          ref={amountRef}
          fontSize={1.2}
          color="#ffea00"
          anchorX="center"
          anchorY="middle"
          position={[0, 0.6, 0]}
          outlineWidth={0.06}
          outlineColor="#ff00ff"
          font="/fonts/Inter-Bold.woff"
        >
          {currency}
          {amount}
        </Text>
        {message && (
          <Text
            ref={messageRef}
            fontSize={0.4}
            color="#aaaaff"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.2, 0]}
            font="/fonts/Inter-Regular.woff"
          >
            {message}
          </Text>
        )}
      </group>
    );
  }
);

TextOverlay.displayName = 'TextOverlay';
export { TextOverlay };
