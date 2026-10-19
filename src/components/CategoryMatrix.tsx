import React from 'react';
import { Gamepad2, Cpu, Wrench, Layers, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/projects';
import type { ProjectCategory } from '../types/project';

interface CategoryMatrixProps {
  selectedCategory: ProjectCategory | 'all';
  onSelectCategory: (category: ProjectCategory | 'all') => void;
}

export const CategoryMatrix: React.FC<CategoryMatrixProps> = ({ selectedCategory, onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 size={24} />;
      case 'Cpu':
        return <Cpu size={24} />;
      case 'Wrench':
        return <Wrench size={24} />;
      case 'Layers':
      default:
        return <Layers size={24} />;
    }
  };

  return (
    <section id="categories" style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pretitle">
            <span className="badge-dot" />
            <span>DISCIPLINES & DOMAIN ARCHITECTURE</span>
          </div>
          <h2 className="section-title">Core Engineering Arenas</h2>
          <p className="section-description">
            Four specialized areas of practice anchored in rigorous programming standards, from sub-millisecond bare-metal microcontroller routines to frame-budgeted C++ game architecture.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  background: isSelected ? 'rgba(26, 34, 48, 0.95)' : 'var(--bg-card)',
                  border: `1px solid ${isSelected ? 'var(--accent-amber)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all var(--transition-normal)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
                }}
                className="category-card"
              >
                {/* Header Row: Discipline Number and Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(56, 189, 248, 0.08)',
                      color: isSelected ? 'var(--accent-amber)' : 'var(--tech-cyan)',
                      border: `1px solid ${isSelected ? 'rgba(245, 158, 11, 0.3)' : 'rgba(56, 189, 248, 0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(cat.iconName)}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--tech-slate-500)',
                      letterSpacing: '0.06em'
                    }}
                  >
                    [DISC-0{idx + 1}]
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      marginBottom: '0.5rem',
                      color: isSelected ? '#FFFFFF' : 'var(--tech-slate-100)'
                    }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'var(--tech-slate-400)'
                    }}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* Footer Spec Pill & Filter Action */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: isSelected ? 'var(--accent-amber)' : 'var(--tech-slate-400)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {cat.specHighlight}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: isSelected ? 'var(--accent-amber)' : 'var(--tech-slate-400)'
                    }}
                  >
                    <span>Filter</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .category-card:hover {
          border-color: var(--tech-slate-400) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
