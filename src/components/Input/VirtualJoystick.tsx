import React, { useRef, useState, useCallback, useEffect } from 'react';

interface VirtualJoystickProps {
  onMove: (vector: { x: number; z: number }) => void;
  size?: number;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  onMove,
  size = 140
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const [knobPos, setKnobPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);

  const radius = size / 2;
  const maxThumbDistance = radius * 0.75;

  const resetJoystick = useCallback(() => {
    activePointerIdRef.current = null;
    setIsActive(false);
    setKnobPos({ x: 0, y: 0 });
    onMove({ x: 0, z: 0 });
  }, [onMove]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== null) return; // already tracking a finger

    e.preventDefault();
    e.stopPropagation();

    const target = containerRef.current;
    if (!target) return;

    activePointerIdRef.current = e.pointerId;
    target.setPointerCapture(e.pointerId);
    setIsActive(true);

    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);

    const clampedDist = Math.min(distance, maxThumbDistance);
    const angle = Math.atan2(dy, dx);

    const knobX = Math.cos(angle) * clampedDist;
    const knobY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: knobX, y: knobY });

    // Normalized move vector: X is horizontal (-1 to 1), Z is forward/back (-1 to 1)
    const normX = clampedDist > 5 ? knobX / maxThumbDistance : 0;
    const normZ = clampedDist > 5 ? knobY / maxThumbDistance : 0;
    onMove({ x: normX, z: normZ });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;

    e.preventDefault();
    e.stopPropagation();

    const target = containerRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);

    const clampedDist = Math.min(distance, maxThumbDistance);
    const angle = Math.atan2(dy, dx);

    const knobX = Math.cos(angle) * clampedDist;
    const knobY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: knobX, y: knobY });

    // Output normalized vector
    const deadzone = 6;
    if (distance < deadzone) {
      onMove({ x: 0, z: 0 });
    } else {
      const normX = knobX / maxThumbDistance;
      const normZ = knobY / maxThumbDistance;
      onMove({ x: normX, z: normZ });
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current === e.pointerId) {
      try {
        if (containerRef.current?.hasPointerCapture(e.pointerId)) {
          containerRef.current.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore capture release errors
      }
      resetJoystick();
    }
  };

  // Safety cleanup on unmount or window blur
  useEffect(() => {
    const handleWindowBlur = () => resetJoystick();
    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [resetJoystick]);

  return (
    <div
      ref={containerRef}
      id="virtual-joystick-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        position: 'relative',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        background: isActive
          ? 'radial-gradient(circle, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 100%)'
          : 'radial-gradient(circle, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.45) 100%)',
        border: isActive
          ? '2px solid rgba(245, 158, 11, 0.8)'
          : '1.5px solid rgba(56, 189, 248, 0.35)',
        boxShadow: isActive
          ? '0 0 20px rgba(245, 158, 11, 0.3), inset 0 0 15px rgba(15, 23, 42, 0.8)'
          : '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      {/* Precision reticle crosshairs */}
      <div
        style={{
          position: 'absolute',
          width: '80%',
          height: '1px',
          background: 'rgba(56, 189, 248, 0.2)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          height: '80%',
          width: '1px',
          background: 'rgba(56, 189, 248, 0.2)',
          pointerEvents: 'none'
        }}
      />

      {/* Inner guide ring */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: '50%',
          border: '1px dashed rgba(56, 189, 248, 0.25)',
          pointerEvents: 'none'
        }}
      />

      {/* Directional labels */}
      <span
        style={{
          position: 'absolute',
          top: 6,
          fontSize: 9,
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          letterSpacing: '1px',
          fontFamily: 'monospace',
          pointerEvents: 'none'
        }}
      >
        FWD
      </span>
      <span
        style={{
          position: 'absolute',
          bottom: 6,
          fontSize: 9,
          fontWeight: 700,
          color: 'rgba(148, 163, 184, 0.7)',
          letterSpacing: '1px',
          fontFamily: 'monospace',
          pointerEvents: 'none'
        }}
      >
        REV
      </span>

      {/* Draggable Knob */}
      <div
        style={{
          width: size * 0.38,
          height: size * 0.38,
          borderRadius: '50%',
          transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          transition: isActive ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0.8, 0.3, 1)',
          background: isActive
            ? 'radial-gradient(circle at 35% 35%, #fbbf24 0%, #d97706 70%, #92400e 100%)'
            : 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 70%, #0369a1 100%)',
          boxShadow: isActive
            ? '0 0 16px rgba(245, 158, 11, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
            : '0 0 10px rgba(56, 189, 248, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ffffff',
            opacity: 0.85
          }}
        />
      </div>
    </div>
  );
};
