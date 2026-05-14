'use client';

import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useSearchParams } from 'next/navigation';

export function PostProcessingEffects() {
  const searchParams = useSearchParams();
  const lowPerf = searchParams.get('perf') === 'low';

  return (
    <EffectComposer>
      {!lowPerf && (
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          intensity={0.8}
          radius={0.5}
          mipmapBlur
        />
      )}
      <Noise opacity={0.02} blendFunction={BlendFunction.OVERLAY} />
      <ChromaticAberration offset={[0.001, 0.001]} />
      <Vignette darkness={0.5} offset={0.3} />
      {!lowPerf && (
        <DepthOfField
          focusDistance={0.0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
      )}
    </EffectComposer>
  );
}
