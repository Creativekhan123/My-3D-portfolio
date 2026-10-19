import React, { useState } from 'react';
import {
  X,
  Gamepad2,
  Cpu,
  Wrench,
  Layers,
  Compass,
  ArrowRight,
  Terminal,
  FolderKanban,
  User,
  Globe,
  ExternalLink,
  Mail,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS, CATEGORIES } from '../../data/projects';
import { PROFILE } from '../../data/profile';
import type { ProjectCaseStudy, ProjectCategory } from '../../types/project';

interface DirectPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  onTeleportToProject: (projectId: string) => void;
  initialTab?: 'projects' | 'profile';
}

export const DirectPortfolioModal: React.FC<DirectPortfolioModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onTeleportToProject,
  initialTab = 'projects'
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'profile'>(initialTab);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');

  // Sync tab if initialTab changes on open
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'unreal-games': return <Gamepad2 size={16} color="#f59e0b" />;
      case 'maze-robotics': return <Cpu size={16} color="#38bdf8" />;
      case 'robotics-hardware': return <Wrench size={16} color="#10b981" />;
      case 'digital-twins': return <Layers size={16} color="#a855f7" />;
    }
  };

  return (
    <div
      className="direct-portfolio-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'rgba(5, 8, 15, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Modal Header */}
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.85)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#38bdf8',
                  letterSpacing: '1.5px',
                  fontWeight: 700
                }}
              >
                DIRECT DIRECTORY // DEVVERSE ARCHIVE
              </span>
              <span
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 600
                }}
              >
                5 Destinations Ready
              </span>
            </div>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#f8fafc', fontWeight: 800 }}>
              {activeTab === 'projects' ? 'Verified Engineering Projects' : 'Systems Command Deck & Profile'}
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(30, 41, 59, 0.7)',
              borderRadius: '8px',
              padding: '3px',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}
          >
            <button
              onClick={() => setActiveTab('projects')}
              style={{
                background: activeTab === 'projects' ? '#f59e0b' : 'transparent',
                color: activeTab === 'projects' ? '#090d16' : '#cbd5e1',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FolderKanban size={14} />
              <span>Projects ({PROJECTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                background: activeTab === 'profile' ? '#f43f5e' : 'transparent',
                color: activeTab === 'profile' ? '#ffffff' : '#cbd5e1',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <User size={14} />
              <span>Architect Profile</span>
            </button>
          </div>
        </div>

        <button
          id="direct-portfolio-close-btn"
          onClick={onClose}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '8px',
            color: '#f8fafc',
            padding: '8px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          <span>Return to 3D World</span>
          <X size={16} />
        </button>
      </header>

      {/* ============================================================ */}
      {/* VIEW 1: PROJECTS LIST WITH CATEGORIES                        */}
      {/* ============================================================ */}
      {activeTab === 'projects' && (
        <>
          {/* Filter Category Tabs */}
          <div
            style={{
              padding: '12px 24px',
              borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              background: 'rgba(11, 15, 25, 0.6)'
            }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                background: activeCategory === 'all' ? '#f59e0b' : 'rgba(30, 41, 59, 0.6)',
                color: activeCategory === 'all' ? '#0f172a' : '#cbd5e1',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              All Projects ({PROJECTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? '#f59e0b' : 'rgba(30, 41, 59, 0.6)',
                  color: activeCategory === cat.id ? '#0f172a' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Projects Grid Container */}
          <div
            className="scrollable-panel"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(245, 158, 11, 0.5)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#f59e0b',
                        fontFamily: 'monospace'
                      }}
                    >
                      {project.status}
                    </div>
                  </div>

                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      {getCategoryIcon(project.category)}
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                        {project.categoryLabel}
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#f8fafc', fontWeight: 700, lineHeight: 1.3 }}>
                      {project.title}
                    </h3>

                    <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, flex: 1 }}>
                      {project.summary}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'rgba(30, 41, 59, 0.7)',
                            color: '#38bdf8',
                            fontSize: '10px',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontFamily: 'monospace'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => onSelectProject(project)}
                        style={{
                          flex: 1,
                          background: '#f59e0b',
                          color: '#0f172a',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Inspect Case Study</span>
                        <ArrowRight size={14} />
                      </button>

                      <button
                        onClick={() => {
                          onTeleportToProject(project.id);
                          onClose();
                        }}
                        style={{
                          background: 'rgba(30, 41, 59, 0.8)',
                          border: '1px solid rgba(148, 163, 184, 0.3)',
                          color: '#38bdf8',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                        title="Teleport avatar to this exhibit"
                      >
                        <Compass size={14} />
                        <span>Drive Here</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* VIEW 2: ARCHITECT PROFILE & COMMAND DECK                     */}
      {/* ============================================================ */}
      {activeTab === 'profile' && (
        <div
          className="scrollable-panel"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px',
            maxWidth: '1000px',
            margin: '0 auto',
            width: '100%',
            color: '#f8fafc',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Hero Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              borderRadius: '14px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f43f5e', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>
              <Terminal size={14} />
              <span>COMMAND DECK // PRINCIPAL ARCHITECT</span>
            </div>
            <h1 style={{ margin: '0 0 6px 0', fontSize: '28px', fontWeight: 800 }}>
              {PROFILE.name}
            </h1>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#38bdf8', fontWeight: 600 }}>
              {PROFILE.role}
            </p>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: '#cbd5e1' }}>
              {PROFILE.shortBio}
            </p>
          </div>

          {/* Three Core Engineering Ethos Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {PROFILE.ethos.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '10px',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                  <ShieldCheck size={16} />
                  <span>{item.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#94a3b8' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* System Specs & Direct Comm Links */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                Operational Status
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#00f5d4', fontWeight: 700, fontFamily: 'monospace' }}>
                <CheckCircle2 size={14} />
                <span>{PROFILE.systemSpecs.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  color: '#f8fafc',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
              >
                <Globe size={14} />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  color: '#f8fafc',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
              >
                <ExternalLink size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PROFILE.socials.email}`}
                style={{
                  background: '#f43f5e',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
              >
                <Mail size={14} />
                <span>Contact Engineer</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
