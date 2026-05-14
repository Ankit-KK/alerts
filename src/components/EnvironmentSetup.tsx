'use client';

import { Sparkles } from '@react-three/drei';

export function EnvironmentSetup() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 3, 4]} intensity={1.2} color="#ff00aa" />
      <pointLight position={[-2, 1, -2]} intensity={0.8} color="#00ffff" />
      <Sparkles count={40} scale={6} size={2} speed={0.3} opacity={0.5} color="#ffffff" />
    </>
  );
}
