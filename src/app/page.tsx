'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useSearchParams } from 'next/navigation';
import { Perf } from 'r3f-perf';
import { DonationAlertScene } from '@/components/DonationAlertScene';
import { EnvironmentSetup } from '@/components/EnvironmentSetup';
import { PostProcessingEffects } from '@/components/PostProcessingEffects';
import { useFakeWebSocket } from '@/hooks/useFakeWebSocket';

function HomeInner() {
  useFakeWebSocket();
  const searchParams = useSearchParams();
  const showPerf = searchParams.get('debug') === '1';
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        camera={{ position: [0, 2, 7], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.8, 0]}>
            <EnvironmentSetup />
            <DonationAlertScene />
          </Physics>
          <PostProcessingEffects />
          {process.env.NODE_ENV === 'development' && showPerf && <Perf position="top-left" />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeInner />
    </Suspense>
  );
}
