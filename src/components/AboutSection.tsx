import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { SKILL_DISCIPLINES } from '../data/skills';
import { Terminal, ShieldCheck, ChevronRight, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeDisciplineId, setActiveDisciplineId] = useState(SKILL_DISCIPLINES[0].id);

  const currentDiscipline = SKILL_DISCIPLINES.find((d) => d.id === activeDisciplineId) || SKILL_DISCIPLINES[0];

  return (
    <section id="about" style={{ padding: '5.5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pretitle">
            <span className="badge-dot" />
            <span>DEVELOPER PROFILE // ENGINEERING ETHOS</span>
          </div>
          <h2 className="section-title">Systems Architecture & Capabilities</h2>
          <p className="section-description">
            {PROFILE.shortBio}
          </p>
        </div>

        {/* 3 Ethos Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {PROFILE.ethos.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-amber)',
                    letterSpacing: '0.08em'
                  }}
                >
                  PRINCIPLE // 0{idx + 1}
                </span>
                <ShieldCheck size={16} color="var(--tech-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--tech-slate-100)' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--tech-slate-400)' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skills Grouped by Actual Discipline */}
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-medium)',
            background: 'var(--bg-panel)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div
            style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'rgba(12, 16, 23, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={16} color="var(--accent-amber)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--tech-slate-200)',
                  letterSpacing: '0.08em'
                }}
              >
                DISCIPLINE CAPABILITIES MATRIX (NO ARBITRARY METRICS)
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--tech-slate-500)'
              }}
            >
              {SKILL_DISCIPLINES.length} DOMAINS ACTIVE
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              minHeight: '440px'
            }}
            className="discipline-matrix-grid"
          >
            {/* Discipline Navigation Tabs */}
            <div
              style={{
                borderRight: '1px solid var(--border-subtle)',
                background: 'rgba(10, 13, 19, 0.5)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {SKILL_DISCIPLINES.map((discipline) => {
                const isActive = activeDisciplineId === discipline.id;

                return (
                  <button
                    key={discipline.id}
                    onClick={() => setActiveDisciplineId(discipline.id)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      borderBottom: '1px solid var(--border-subtle)',
                      background: isActive ? 'rgba(24, 31, 44, 0.8)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--accent-amber)' : '3px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6875rem',
                          color: isActive ? 'var(--accent-amber)' : 'var(--tech-slate-500)'
                        }}
                      >
                        [{discipline.shortCode}]
                      </span>
                      {isActive && <ChevronRight size={14} color="var(--accent-amber)" />}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: isActive ? '#FFFFFF' : 'var(--tech-slate-300)'
                      }}
                    >
                      {discipline.discipline}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Discipline Details & Specific Skills */}
            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-amber)',
                    textTransform: 'uppercase'
                  }}
                >
                  DISCIPLINE OVERVIEW //
                </span>
                <h3 style={{ fontSize: '1.35rem', margin: '0.35rem 0', color: '#FFFFFF' }}>
                  {currentDiscipline.discipline}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--tech-slate-400)', lineHeight: 1.6 }}>
                  {currentDiscipline.description}
                </p>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--tech-cyan)',
                    letterSpacing: '0.06em'
                  }}
                >
                  ENGINEERING FOCUS & ARCHITECTURAL PATTERNS:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.875rem' }}>
                  {currentDiscipline.skills.map((skill, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(18, 22, 31, 0.7)',
                        border: `1px solid ${skill.highlight ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-subtle)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Check size={14} color={skill.highlight ? 'var(--accent-amber)' : 'var(--tech-cyan)'} />
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--tech-slate-100)'
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--tech-slate-400)',
                          paddingLeft: '1.25rem',
                          lineHeight: 1.45
                        }}
                      >
                        {skill.focus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concrete Hardware & Software Toolchain */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--tech-slate-500)',
                    textTransform: 'uppercase'
                  }}
                >
                  VERIFIED HARDWARE & SOFTWARE TOOLSETS IN USE:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {currentDiscipline.concreteTools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        color: 'var(--tech-slate-300)'
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .discipline-matrix-grid {
            grid-template-columns: 320px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
