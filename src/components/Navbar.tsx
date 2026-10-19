import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'Selected Work' },
    { id: 'categories', label: 'Disciplines' },
    { id: 'convergence', label: 'Unreal × Robotics' },
    { id: 'about', label: 'Capabilities' },
    { id: 'contact', label: 'Terminal / Contact' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(8, 10, 14, 0.88)' : 'rgba(8, 10, 14, 0.45)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        transition: 'all var(--transition-normal)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand Callout */}
        <button
          onClick={() => handleLinkClick('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textAlign: 'left'
          }}
          aria-label="Return to top"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              background: 'rgba(245, 158, 11, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-amber)'
            }}
          >
            <Terminal size={17} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: 'var(--tech-slate-100)',
                letterSpacing: '0.04em'
              }}
            >
              {PROFILE.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 6px #10B981'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--tech-slate-400)',
                  letterSpacing: '0.06em'
                }}
              >
                LAB ONLINE
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--accent-amber)' : 'var(--tech-slate-400)',
                  position: 'relative',
                  padding: '0.4rem 0',
                  letterSpacing: '0.02em',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-amber)',
                      boxShadow: '0 0 8px var(--accent-amber)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <button
            onClick={() => handleLinkClick('contact')}
            className="btn-primary"
            style={{
              padding: '0.5rem 1.125rem',
              fontSize: '0.8125rem',
              display: 'none'
            }}
            id="nav-contact-btn"
          >
            <span>Initialize Contact</span>
            <ArrowUpRight size={15} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'flex',
              padding: '0.5rem',
              color: 'var(--tech-slate-300)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)',
              background: 'rgba(18, 22, 31, 0.8)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            background: 'rgba(11, 14, 20, 0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                textAlign: 'left',
                padding: '0.6rem 0',
                color: activeSection === link.id ? 'var(--accent-amber)' : 'var(--tech-slate-200)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{link.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--tech-slate-500)' }}>
                [0{navLinks.indexOf(link) + 1}]
              </span>
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('contact')}
            className="btn-primary"
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            Initialize Contact
          </button>
        </div>
      )}

      {/* Responsive media query helper styling */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-contact-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
