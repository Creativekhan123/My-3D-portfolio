import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, GitBranch, ExternalLink, ArrowRight } from 'lucide-react';
import type { ProjectCaseStudy } from '../types/project';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-panel)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="modal-content"
      >
        {/* Sticky Header Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.75rem',
            background: 'rgba(12, 16, 23, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-amber">
              <span className="badge-dot" />
              <span>{project.status}</span>
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--tech-cyan)',
                textTransform: 'uppercase'
              }}
            >
              {project.categoryLabel}
            </span>
          </div>

          <button
            id="case-study-close-btn"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-xs)',
              background: 'rgba(18, 22, 31, 0.8)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--tech-slate-300)',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Title Area */}
          <div>
            <h2
              id="case-study-title"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                marginBottom: '0.5rem',
                lineHeight: 1.2
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                color: 'var(--accent-amber)',
                fontWeight: 500
              }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* Hero Media with Caption */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              backgroundColor: '#080A0E'
            }}
          >
            <img
              src={project.heroImage}
              alt={project.title}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            {project.diagramCaption && (
              <div
                style={{
                  padding: '0.625rem 1rem',
                  background: 'rgba(8, 10, 14, 0.85)',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--tech-cyan)'
                  }}
                >
                  DIAGRAM TELEMETRY //
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--tech-slate-300)'
                  }}
                >
                  {project.diagramCaption}
                </span>
              </div>
            )}
          </div>

          {/* Technical Specs Key Value Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(12, 16, 23, 0.7)',
              border: '1px solid var(--border-medium)'
            }}
          >
            {project.technicalSpecs.map((spec, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--tech-slate-400)',
                    textTransform: 'uppercase'
                  }}
                >
                  {spec.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--tech-slate-100)'
                  }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Section: Problem & Objective */}
          <div>
            <div className="section-pretitle" style={{ marginBottom: '0.5rem' }}>
              <span className="badge-dot" />
              <span>01 // PROBLEM & OBJECTIVE</span>
            </div>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--tech-slate-200)' }}>
              {project.problemObjective}
            </p>
          </div>

          {/* Section: Role & Responsibilities */}
          <div>
            <div className="section-pretitle" style={{ marginBottom: '0.75rem' }}>
              <span className="badge-dot" />
              <span>02 // ROLE & RESPONSIBILITIES</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {project.roleResponsibilities.map((resp, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    color: 'var(--tech-slate-300)',
                    fontSize: '0.95rem'
                  }}
                >
                  <ArrowRight size={16} color="var(--accent-amber)" style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Technology & Tools Used */}
          <div>
            <div className="section-pretitle" style={{ marginBottom: '0.75rem' }}>
              <span className="badge-dot" />
              <span>03 // TECHNOLOGY & TOOLS</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="badge badge-cyan"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Architecture & Technical Approach */}
          <div>
            <div className="section-pretitle" style={{ marginBottom: '0.75rem' }}>
              <span className="badge-dot" />
              <span>04 // ARCHITECTURE & TECHNICAL APPROACH</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {project.architectureApproach.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(18, 22, 31, 0.6)',
                    borderLeft: '3px solid var(--tech-cyan)',
                    color: 'var(--tech-slate-300)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.6
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Challenges and Solutions */}
          <div>
            <div className="section-pretitle" style={{ marginBottom: '0.75rem' }}>
              <span className="badge-dot" />
              <span>05 // CHALLENGES & IMPLEMENTED SOLUTIONS</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {project.challengesAndSolutions.map((cs, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'rgba(12, 16, 23, 0.7)',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      padding: '0.875rem 1rem',
                      background: 'rgba(239, 68, 68, 0.08)',
                      borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.625rem'
                    }}
                  >
                    <AlertTriangle size={17} color="#EF4444" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: '#FCA5A5' }}>
                      <strong>Challenge:</strong> {cs.challenge}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '0.875rem 1rem',
                      background: 'rgba(16, 185, 129, 0.06)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.625rem'
                    }}
                  >
                    <CheckCircle2 size={17} color="#10B981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: '#A7F3D0' }}>
                      <strong>Solution:</strong> {cs.solution}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Verified Results */}
          <div>
            <div className="section-pretitle" style={{ marginBottom: '0.75rem' }}>
              <span className="badge-dot" />
              <span>06 // VERIFIED RESULTS</span>
            </div>
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem'
              }}
            >
              {project.verifiedResults.map((result, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.925rem', color: 'var(--tech-slate-200)' }}>
                    {result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Links & Close Row */}
          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                >
                  <GitBranch size={15} />
                  <span>Repository</span>
                </a>
              )}
              {project.docsUrl && project.docsUrl !== '#' && (
                <a
                  href={project.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                >
                  <ExternalLink size={15} />
                  <span>Technical Docs</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
