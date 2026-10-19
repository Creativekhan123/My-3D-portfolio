import React, { useState, useEffect } from 'react';
import { PROFILE } from '../data/profile';
import { Terminal, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toTimeString().split(' ')[0] + ' UTC' + (now.getTimezoneOffset() <= 0 ? '+' : '-') + Math.abs(Math.floor(now.getTimezoneOffset() / 60)));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-medium)',
        background: 'rgba(8, 10, 14, 0.95)',
        padding: '3rem 0 2rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Top Telemetry Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-amber)'
              }}
            >
              <Terminal size={16} />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--tech-slate-100)'
                }}
              >
                {PROFILE.name} &bull; {PROFILE.callsign}
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--tech-slate-400)'
                }}
              >
                UNREAL ENGINE 5 &bull; EMBEDDED ROBOTICS &bull; DIGITAL TWIN LABS
              </div>
            </div>
          </div>

          {/* Telemetry Stats & Clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div className="badge">
              <span className="badge-dot" style={{ background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
              <span>SYS TIME: {timestamp || 'SYNCHRONIZING...'}</span>
            </div>

            <button
              onClick={onScrollToTop}
              className="btn-mono"
              style={{ padding: '0.35rem 0.75rem' }}
              aria-label="Return to top of page"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Editorial Legal & System Statement */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--tech-slate-500)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} {PROFILE.name}. Engineered with React Three Fiber, WebGL &amp; TypeScript.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>NO ARBITRARY METRICS</span>
            <span>&bull;</span>
            <span>VERIFIED BENCH TELEMETRY</span>
            <span>&bull;</span>
            <span>CHAOS PHYSICS COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
