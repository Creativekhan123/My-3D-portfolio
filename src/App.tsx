import React, { useState, useEffect } from 'react';
import { WorldCanvas } from './components/World/WorldCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryMatrix } from './components/CategoryMatrix';
import { ProjectGrid } from './components/ProjectGrid';
import { UnrealRoboticsIntersection } from './components/UnrealRoboticsIntersection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { PROJECTS } from './data/projects';
import { isWebGLAvailable } from './components/LabScene/WebGLCheck';
import type { ProjectCaseStudy, ProjectCategory } from './types/project';
import { Box } from 'lucide-react';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d-world' | 'editorial-2d'>('3d-world');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectCaseStudy | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Check WebGL support on initial mount
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setViewMode('editorial-2d');
    }
  }, []);

  // Handle URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const slug = hash.replace('#/project/', '');
        const found = PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setActiveCaseStudy(found);
        }
      } else if (hash.startsWith('#/category/')) {
        const cat = hash.replace('#/category/', '') as ProjectCategory;
        setSelectedCategory(cat);
        const el = document.getElementById('work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#/2d') {
        setViewMode('editorial-2d');
      } else if (hash === '#/3d') {
        setViewMode('3d-world');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenCaseStudy = (project: ProjectCaseStudy) => {
    setActiveCaseStudy(project);
    window.history.pushState(null, '', `#/project/${project.slug}`);
  };

  const handleCloseCaseStudy = () => {
    setActiveCaseStudy(null);
    if (window.location.hash.startsWith('#/project/')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleOpenCaseStudyBySlug = (slug: string) => {
    const found = PROJECTS.find((p) => p.slug === slug || p.id === slug);
    if (found) {
      handleOpenCaseStudy(found);
    }
  };

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (category: ProjectCategory | 'all') => {
    setSelectedCategory(category);
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Primary 3D Low-Poly Game Portfolio Mode
  if (viewMode === '3d-world') {
    return (
      <WorldCanvas onFallbackTo2D={() => setViewMode('editorial-2d')} />
    );
  }

  // Fallback / Direct Standard 2D Editorial Portfolio Mode
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Floating Button to Enter 3D World */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 90
        }}
      >
        <button
          id="enter-3d-world-btn"
          onClick={() => setViewMode('3d-world')}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#090d16',
            border: '2px solid #ffffff',
            borderRadius: '30px',
            padding: '12px 20px',
            fontWeight: 800,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.5)'
          }}
        >
          <Box size={18} />
          <span>Launch 3D Explorer World</span>
        </button>
      </div>

      {/* Persistent Technical Navigation Bar */}
      <Navbar onNavigate={handleScrollTo} activeSection={activeSection} />

      {/* Main Content Area */}
      <main id="main-content" style={{ flex: 1 }}>
        <Hero
          onExploreWork={() => handleScrollTo('work')}
          onAboutMe={() => handleScrollTo('about')}
          onSelectCategory={(cat) => handleCategorySelect(cat as ProjectCategory)}
        />

        <div className="container">
          <div className="tech-divider" />
        </div>

        <CategoryMatrix
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <div className="container">
          <div className="tech-divider" />
        </div>

        <ProjectGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenCaseStudy={handleOpenCaseStudy}
        />

        <div className="container">
          <div className="tech-divider" />
        </div>

        <UnrealRoboticsIntersection
          onOpenCaseStudy={handleOpenCaseStudyBySlug}
        />

        <div className="container">
          <div className="tech-divider" />
        </div>

        <AboutSection />

        <div className="container">
          <div className="tech-divider" />
        </div>

        <ContactSection />
      </main>

      <Footer onScrollToTop={() => handleScrollTo('hero')} />

      <CaseStudyModal
        project={activeCaseStudy}
        onClose={handleCloseCaseStudy}
      />
    </div>
  );
};

export default App;
