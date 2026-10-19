import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { RoboticArmScene } from './RoboticArmScene';
import { LabFallback } from './LabFallback';
import { isWebGLAvailable, prefersReducedMotion } from './WebGLCheck';

interface LabCanvasProps {
  onSelectHotspot?: (hotspotId: string) => void;
  activeHotspot?: string | null;
}

export const LabCanvas: React.FC<LabCanvasProps> = ({ onSelectHotspot, activeHotspot }) => {
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const webglSupported = isWebGLAvailable();
    const motionPreference = prefersReducedMotion();

    setReducedMotion(motionPreference);
    setCanRender3D(webglSupported && !motionPreference);
  }, []);

  if (canRender3D === null) {
    // Initial mount check - lightweight unobtrusive skeleton
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '440px',
          background: 'radial-gradient(circle at 50% 50%, #111622 0%, #080A0E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span className="badge">
          <span className="badge-dot" />
          <span>CALIBRATING SENSORS...</span>
        </span>
      </div>
    );
  }

  if (hasError || !canRender3D) {
    return (
      <LabFallback
        onSelectHotspot={onSelectHotspot}
        reason={reducedMotion ? 'reduced-motion' : 'no-webgl'}
      />
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '460px',
        touchAction: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 1.4, 5.0], fov: 42 }}
        dpr={[1, 1.75]} // Capped for power efficiency & crispness
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true
        }}
        onError={() => setHasError(true)}
      >
        {/* Cinematic Staged Lighting */}
        <ambientLight color="#0F172A" intensity={0.8} />

        {/* Primary Warm Amber Rim Light */}
        <directionalLight
          position={[4.5, 5, 2.5]}
          color="#F59E0B"
          intensity={2.8}
          castShadow={false}
        />

        {/* Cool Blue-Gray Key Fill Light */}
        <directionalLight
          position={[-4, 3.5, 2]}
          color="#38BDF8"
          intensity={1.2}
        />

        {/* Top-Down Soft Specular Light */}
        <pointLight
          position={[0, 4, 1]}
          color="#FFFFFF"
          intensity={1.0}
          distance={10}
        />

        <Suspense fallback={null}>
          <RoboticArmScene
            onSelectHotspot={onSelectHotspot}
            activeHotspot={activeHotspot}
          />
        </Suspense>
      </Canvas>

      {/* Lab Telemetry HUD Overlay Bottom Corner */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.35rem'
        }}
      >
        <span className="badge badge-amber" style={{ pointerEvents: 'auto' }}>
          <span className="badge-dot" />
          <span>SIMULATION LAB // INTERACTIVE 3D</span>
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--tech-slate-500)',
            letterSpacing: '0.04em'
          }}
        >
          DRAG TO INSPECT // HOVER NODES FOR SPECS
        </span>
      </div>
    </div>
  );
};
