import React from 'react';
import { PROJECTS, CATEGORIES } from '../data/projects';
import type { ProjectCaseStudy, ProjectCategory } from '../types/project';
import { ProjectCard } from './ProjectCard';
import { Filter } from 'lucide-react';

interface ProjectGridProps {
  selectedCategory: ProjectCategory | 'all';
  onSelectCategory: (category: ProjectCategory | 'all') => void;
  onOpenCaseStudy: (project: ProjectCaseStudy) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenCaseStudy
}) => {
  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pretitle">
            <span className="badge-dot" />
            <span>PORTFOLIO DIRECTORY // SELECTED PROJECTS</span>
          </div>
          <h2 className="section-title">Verified Engineering Works</h2>
          <p className="section-description">
            Complete technical deep-dives covering problem formulation, mechanical and software architecture, algorithmic challenges, and bench-verified performance outcomes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.625rem',
            alignItems: 'center',
            marginBottom: '2.5rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--tech-slate-400)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              marginRight: '0.5rem'
            }}
          >
            <Filter size={14} />
            <span>FILTER:</span>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            style={{
              padding: '0.45rem 0.875rem',
              borderRadius: 'var(--radius-xs)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              border: `1px solid ${selectedCategory === 'all' ? 'var(--accent-amber)' : 'var(--border-medium)'}`,
              background: selectedCategory === 'all' ? 'var(--accent-amber-subtle)' : 'rgba(18, 22, 31, 0.6)',
              color: selectedCategory === 'all' ? 'var(--accent-amber)' : 'var(--tech-slate-300)'
            }}
          >
            ALL WORKS [{PROJECTS.length}]
          </button>

          {CATEGORIES.map((cat) => {
            const count = PROJECTS.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '0.45rem 0.875rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? 'var(--accent-amber)' : 'var(--border-medium)'}`,
                  background: isSelected ? 'var(--accent-amber-subtle)' : 'rgba(18, 22, 31, 0.6)',
                  color: isSelected ? 'var(--accent-amber)' : 'var(--tech-slate-300)'
                }}
              >
                {cat.shortLabel.toUpperCase()} [{count}]
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem'
          }}
          className="projects-grid-layout"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .projects-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
