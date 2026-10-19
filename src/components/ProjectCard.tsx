import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { ProjectCaseStudy } from '../types/project';

interface ProjectCardProps {
  project: ProjectCaseStudy;
  onOpenCaseStudy: (project: ProjectCaseStudy) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  return (
    <article
      onClick={() => onOpenCaseStudy(project)}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative'
      }}
      className="project-card"
    >
      {/* Media Banner */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          overflow: 'hidden',
          backgroundColor: '#0A0D13'
        }}
      >
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-slow)'
          }}
          className="project-card-image"
        />

        {/* Gradient Overlay for Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(14, 18, 26, 0.95) 0%, rgba(14, 18, 26, 0.2) 60%, transparent 100%)'
          }}
        />

        {/* Top Floating Badges */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            right: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2
          }}
        >
          <span className="badge badge-amber" style={{ backdropFilter: 'blur(8px)' }}>
            <span className="badge-dot" />
            <span>{project.status}</span>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--tech-slate-300)',
              background: 'rgba(8, 10, 14, 0.75)',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-xs)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {project.completionDate}
          </span>
        </div>

        {/* Bottom Category Tag over Image */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '1rem',
            zIndex: 2
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--tech-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600
            }}
          >
            {project.categoryLabel}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.25rem',
              lineHeight: 1.3,
              marginBottom: '0.35rem',
              color: 'var(--tech-slate-100)'
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.875rem',
              color: 'var(--accent-amber)',
              fontWeight: 500
            }}
          >
            {project.subtitle}
          </p>
        </div>

        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: 'var(--tech-slate-400)'
          }}
        >
          {project.summary}
        </p>

        {/* Technical Specs Compact Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            padding: '0.75rem',
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(12, 16, 23, 0.6)',
            border: '1px solid var(--border-subtle)',
            marginTop: 'auto'
          }}
        >
          {project.technicalSpecs.slice(0, 2).map((spec, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--tech-slate-500)',
                  textTransform: 'uppercase'
                }}
              >
                {spec.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--tech-slate-200)'
                }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(56, 189, 248, 0.06)',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                color: 'var(--tech-slate-300)'
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                padding: '0.2rem 0.4rem',
                color: 'var(--tech-slate-500)'
              }}
            >
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Footer Action */}
        <div
          style={{
            paddingTop: '0.875rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={13} color="#10B981" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--tech-slate-400)' }}>
              Verified In Situ
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent-amber)'
            }}
          >
            <span>Examine Case Study</span>
            <ArrowUpRight size={15} />
          </div>
        </div>
      </div>

      <style>{`
        .project-card:hover {
          border-color: var(--accent-amber) !important;
          transform: translateY(-3px);
          box-shadow: var(--shadow-md) !important;
        }
        .project-card:hover .project-card-image {
          transform: scale(1.03);
        }
      `}</style>
    </article>
  );
};
