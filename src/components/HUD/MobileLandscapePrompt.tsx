import React, { useState, useEffect } from 'react';
import { RotateCcw, Maximize2, X, Smartphone } from 'lucide-react';

export const MobileLandscapePrompt: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect mobile / narrow portrait device
    const checkMobile = () => {
      const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth <= 900;
      const isPortraitNow = window.innerHeight > window.innerWidth;
      
      // True mobile or narrow portrait screen
      setIsMobileDevice(isMobileUA || (isTouch && isNarrow) || (window.innerWidth <= 768));
      setIsPortrait(isPortraitNow);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  const handleRequestLandscape = async () => {
    try {
      const docEl = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };

      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
      }

      // Try orientation lock if supported
      const screenAny = window.screen as Screen & {
        orientation?: {
          lock?: (orientation: string) => Promise<void>;
        };
      };

      if (screenAny.orientation?.lock) {
        await screenAny.orientation.lock('landscape');
      }
    } catch {
      // Browsers may gracefully reject orientation lock without physical rotation
    }
    setIsDismissed(true);
  };

  // Only show if on mobile device in portrait mode and not explicitly dismissed
  if (!isMobileDevice || !isPortrait || isDismissed) {
    return null;
  }

  return (
    <div
      id="mobile-landscape-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(8, 10, 14, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#f8fafc',
        textAlign: 'center',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      {/* Dismiss Button */}
      <button
        onClick={() => setIsDismissed(true)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          color: '#94a3b8',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        aria-label="Close landscape prompt"
      >
        <X size={18} />
      </button>

      {/* Animated Rotating Phone Graphic */}
      <div
        style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px dashed rgba(245, 158, 11, 0.4)',
            animation: 'spinClockwise 8s linear infinite'
          }}
        />
        <div
          style={{
            animation: 'tiltPhone 3s ease-in-out infinite alternate',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Smartphone size={56} color="#f59e0b" strokeWidth={1.8} />
        </div>
      </div>

      {/* Technical Category Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '20px',
          padding: '4px 14px',
          fontSize: '11px',
          fontWeight: 700,
          fontFamily: 'monospace',
          color: '#fbbf24',
          letterSpacing: '1px',
          marginBottom: '14px',
          textTransform: 'uppercase'
        }}
      >
        <RotateCcw size={12} />
        <span>Landscape Console Mode</span>
      </div>

      {/* Main Heading */}
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '22px',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '10px',
          maxWidth: '320px',
          lineHeight: 1.3
        }}
      >
        Rotate for the Full 3D Desktop Experience
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '13px',
          color: '#94a3b8',
          maxWidth: '290px',
          lineHeight: 1.5,
          marginBottom: '28px'
        }}
      >
        Turn your device horizontally to explore with dual virtual thumbsticks, wide field of view, and console controls.
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '280px' }}>
        <button
          id="btn-auto-landscape"
          onClick={handleRequestLandscape}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#090d16',
            border: 'none',
            borderRadius: '12px',
            padding: '13px 20px',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)'
          }}
        >
          <Maximize2 size={16} />
          <span>Switch to Landscape Mode</span>
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          style={{
            background: 'transparent',
            color: '#64748b',
            border: 'none',
            fontSize: '12px',
            fontWeight: 600,
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          Continue in portrait anyway
        </button>
      </div>

      <style>{`
        @keyframes tiltPhone {
          0% { transform: rotate(0deg); }
          30% { transform: rotate(0deg); }
          70% { transform: rotate(-90deg); }
          100% { transform: rotate(-90deg); }
        }
        @keyframes spinClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
