import React, { useEffect, useRef, useState } from 'react';

interface LabFallbackProps {
  onSelectHotspot?: (hotspotId: string) => void;
  reason?: 'no-webgl' | 'reduced-motion' | 'error';
}

export const LabFallback: React.FC<LabFallbackProps> = ({ onSelectHotspot, reason = 'reduced-motion' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Background Grid
      const gridSize = 32;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Origin / Base Coordinate
      const baseX = w * 0.5 + (mousePos.x * 20);
      const baseY = h * 0.75;

      // Base Turntable
      ctx.fillStyle = '#161F2E';
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(baseX, baseY, 70, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Kinematic Link 1 (Shoulder)
      const shoulderAngle = -Math.PI / 2 + Math.sin(time * 0.8) * 0.15 + (mousePos.y * 0.2);
      const link1Length = 110;
      const elbowX = baseX + Math.cos(shoulderAngle) * link1Length;
      const elbowY = (baseY - 20) + Math.sin(shoulderAngle) * link1Length;

      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY - 20);
      ctx.lineTo(elbowX, elbowY);
      ctx.stroke();

      // Shoulder Joint
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(baseX, baseY - 20, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Kinematic Link 2 (Elbow to Wrist)
      const elbowAngle = shoulderAngle + 0.9 + Math.cos(time * 0.6) * 0.2 - (mousePos.x * 0.2);
      const link2Length = 95;
      const wristX = elbowX + Math.cos(elbowAngle) * link2Length;
      const wristY = elbowY + Math.sin(elbowAngle) * link2Length;

      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(elbowX, elbowY);
      ctx.lineTo(wristX, wristY);
      ctx.stroke();

      // Elbow Joint
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(elbowX, elbowY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // End Effector & Laser Beam
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(wristX, wristY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Laser Line
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(wristX, wristY);
      ctx.lineTo(wristX + 15, baseY + 10);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target Spot
      ctx.strokeStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(wristX + 15, baseY + 10, 8, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0
        }}
      />

      {/* Overlay Telemetry Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.5rem'
        }}
      >
        <span className="badge badge-cyan">
          <span className="badge-dot" />
          <span>{reason === 'reduced-motion' ? 'STATIC SCHEMATIC (REDUCED MOTION)' : '2D KINEMATICS ENGINE'}</span>
        </span>
        <button
          className="badge badge-amber"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectHotspot?.('unreal-games')}
        >
          View System Projects &rarr;
        </button>
      </div>
    </div>
  );
};
