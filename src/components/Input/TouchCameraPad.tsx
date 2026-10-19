import React, { useRef, useState } from 'react';

interface TouchCameraPadProps {
  onDragDelta: (deltaYaw: number, deltaPitch: number) => void;
  style?: React.CSSProperties;
}

export const TouchCameraPad: React.FC<TouchCameraPadProps> = ({
  onDragDelta,
  style
}) => {
  const activePointerIdRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only capture primary touch/mouse if not already dragging
    if (activePointerIdRef.current !== null) return;

    activePointerIdRef.current = e.pointerId;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore capture fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;

    lastPosRef.current = { x: e.clientX, y: e.clientY };

    // Sensitivity factor for smooth camera orbit
    const sensitivity = 0.0055;
    onDragDelta(dx * sensitivity, dy * sensitivity);
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current === e.pointerId) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
      activePointerIdRef.current = null;
      setIsDragging(false);
    }
  };

  return (
    <div
      id="touch-camera-pad"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '55%',
        height: '100%',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        zIndex: 5,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '24px',
        ...style
      }}
    >
      {/* Subtle indicator hint showing camera drag area */}
      <div
        style={{
          opacity: isDragging ? 0.8 : 0.25,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '4px'
        }}
      >
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#94a3b8',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          {isDragging ? 'Orbiting Cam' : 'Drag to Orbit'}
        </div>
        <div
          style={{
            width: '40px',
            height: '2px',
            background: isDragging ? '#38bdf8' : 'rgba(148, 163, 184, 0.4)'
          }}
        />
      </div>
    </div>
  );
};
