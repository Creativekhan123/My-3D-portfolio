import React from 'react';
import { ArrowDown, Cpu, Sparkles, Code2, Layers } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { LabCanvas } from './LabScene/LabCanvas';

interface HeroProps {
  onExploreWork: () => void;
  onAboutMe: () => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onAboutMe, onSelectCategory }) => {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
        paddingBottom: '3rem',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Narrative & Calls to Action */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              zIndex: 3
            }}
          >
            {/* Top Status & Role Annotation */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', alignItems: 'center' }}>
              <span className="badge badge-amber">
                <span className="badge-dot" />
                <span>{PROFILE.callsign}</span>
              </span>
              <span className="badge">
                <span>SIMULATION & EMBEDDED SYSTEMS</span>
              </span>
            </div>

            {/* Core Headline */}
            <h1
              style={{
                lineHeight: 1.08,
                letterSpacing: '-0.035em'
              }}
            >
              I Build Worlds. <br />
              <span style={{ color: 'var(--accent-amber)', textShadow: '0 0 32px rgba(245, 158, 11, 0.25)' }}>
                I Engineer Systems.
              </span>
            </h1>

            {/* Supporting Editorial Description */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                lineHeight: 1.7,
                color: 'var(--tech-slate-300)',
                maxWidth: '620px'
              }}
            >
              {PROFILE.tagline}
            </p>

            {/* Action CTA Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                paddingTop: '0.5rem'
              }}
            >
              <button
                onClick={onExploreWork}
                className="btn-primary"
                id="hero-explore-btn"
              >
                <span>Explore My Work</span>
                <ArrowDown size={16} />
              </button>

              <button
                onClick={onAboutMe}
                className="btn-secondary"
                id="hero-about-btn"
              >
                <span>About Me & Capabilities</span>
              </button>
            </div>

            {/* Quick Domain Matrix Badges */}
            <div
              style={{
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: '0.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem'
              }}
            >
              <button
                onClick={() => onSelectCategory('unreal-games')}
                style={{
                  textAlign: 'left',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(18, 22, 31, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  transition: 'border-color var(--transition-fast)'
                }}
                className="hero-domain-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)' }}>
                  <Code2 size={13} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>01 // GAMES</span>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)', fontWeight: 600 }}>
                  UE5 C++ Core
                </span>
              </button>

              <button
                onClick={() => onSelectCategory('maze-robotics')}
                style={{
                  textAlign: 'left',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(18, 22, 31, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  transition: 'border-color var(--transition-fast)'
                }}
                className="hero-domain-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--tech-cyan)' }}>
                  <Cpu size={13} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>02 // ROBOTICS</span>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)', fontWeight: 600 }}>
                  Micromouse & PID
                </span>
              </button>

              <button
                onClick={() => onSelectCategory('robotics-hardware')}
                style={{
                  textAlign: 'left',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(18, 22, 31, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  transition: 'border-color var(--transition-fast)'
                }}
                className="hero-domain-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--tech-slate-300)' }}>
                  <Layers size={13} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>03 // HARDWARE</span>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)', fontWeight: 600 }}>
                  6-DOF Kinematics
                </span>
              </button>

              <button
                onClick={() => onSelectCategory('digital-twins')}
                style={{
                  textAlign: 'left',
                  padding: '0.625rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(18, 22, 31, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  transition: 'border-color var(--transition-fast)'
                }}
                className="hero-domain-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)' }}>
                  <Sparkles size={13} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>04 // DIGITAL TWIN</span>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)', fontWeight: 600 }}>
                  UE5 × ROS2 HIL
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Simulation Laboratory Canvas Viewport */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              background: 'radial-gradient(ellipse at center, rgba(18, 24, 34, 0.7) 0%, rgba(8, 10, 14, 0.95) 100%)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              height: '520px',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="hero-canvas-frame"
          >
            {/* Viewport Header Bar */}
            <div
              style={{
                height: '38px',
                padding: '0 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'rgba(11, 14, 20, 0.85)',
                backdropFilter: 'blur(8px)',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#F59E0B',
                    boxShadow: '0 0 6px #F59E0B'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--tech-slate-300)',
                    letterSpacing: '0.08em'
                  }}
                >
                  SIMULATION LAB // ROS2.SIM_VIEW
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--tech-slate-500)'
                }}
              >
                COORD: [X:+1.24 Y:+0.88 Z:+0.42]
              </span>
            </div>

            {/* Canvas Area */}
            <div style={{ flex: 1, position: 'relative' }}>
              <LabCanvas onSelectHotspot={onSelectCategory} />
            </div>

            {/* Corner Precision Reticle Crosshairs */}
            <div
              style={{
                position: 'absolute',
                top: '44px',
                left: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'var(--tech-slate-600)',
                pointerEvents: 'none'
              }}
            >
              +
            </div>
            <div
              style={{
                position: 'absolute',
                top: '44px',
                right: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'var(--tech-slate-600)',
                pointerEvents: 'none'
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 980px) {
          .hero-grid {
            grid-template-columns: 1.15fr 1fr !important;
          }
        }
        .hero-domain-card:hover {
          border-color: var(--accent-amber) !important;
          background: rgba(24, 30, 42, 0.8) !important;
        }
      `}</style>
    </section>
  );
};
