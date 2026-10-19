import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Terminal, FileText } from 'lucide-react';
import { PROFILE } from '../data/profile';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Game Dev & Robotics Collaboration',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" style={{ padding: '5.5rem 0 3rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pretitle">
            <span className="badge-dot" />
            <span>COMMUNICATION TERMINAL // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="section-title">Engineering Collaborations & Roles</h2>
          <p className="section-description">
            Available for Senior Gameplay Engineering roles, Unreal Engine C++ architecture contracts, physical robotics development, and digital twin simulation systems.
          </p>
        </div>

        {/* Terminal Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem'
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Transmissions & Quick Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Quick Email Console Box */}
            <div
              style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-amber">
                  <span className="badge-dot" />
                  <span>DIRECT INBOX ACCESS</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10B981' }}>
                  ENCRYPTION: TLS 1.3
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--tech-slate-400)',
                    textTransform: 'uppercase'
                  }}
                >
                  PRIMARY TRANSMISSION ADDRESS:
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.35rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(12, 16, 23, 0.9)',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9375rem',
                      color: 'var(--accent-amber)',
                      fontWeight: 600
                    }}
                  >
                    {PROFILE.socials.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="btn-mono"
                    style={{ padding: '0.3rem 0.65rem' }}
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a
                  href={`mailto:${PROFILE.socials.email}`}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '160px', padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                >
                  <Mail size={16} />
                  <span>Send Direct Email</span>
                </a>

                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>

                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Verification / Resume Card */}
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(18, 22, 31, 0.5)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--tech-cyan)'
                  }}
                >
                  <FileText size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--tech-slate-100)' }}>
                    Engineering CV & System Dossier
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--tech-slate-400)' }}>
                    Updated verified credentials, patents, and publications.
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Engineering dossier requested. Contact directly via email for NDA-covered repository access.');
                }}
                className="btn-mono"
              >
                Request Dossier
              </a>
            </div>
          </div>

          {/* Right Column: Terminal Message Form */}
          <div
            style={{
              padding: '2rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={17} color="var(--accent-amber)" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--tech-slate-200)'
                  }}
                >
                  TRANSMISSION CONSOLE // DISPATCH
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--tech-slate-500)'
                }}
              >
                STDIN STREAM
              </span>
            </div>

            {formSubmitted ? (
              <div
                style={{
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(16, 185, 129, 0.25)'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981'
                  }}
                >
                  <Check size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>
                    Transmission Received
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--tech-slate-300)' }}>
                    Your message packet has been queued in our laboratory dispatch system. A response will be transmitted shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Game Dev & Robotics Collaboration', message: '' });
                  }}
                  className="btn-mono"
                  style={{ marginTop: '0.5rem' }}
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label
                      htmlFor="form-name"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--tech-slate-400)',
                        textTransform: 'uppercase'
                      }}
                    >
                      Identification / Name *
                    </label>
                    <input
                      id="form-name"
                      required
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        padding: '0.7rem 0.875rem',
                        background: 'rgba(12, 16, 23, 0.9)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--tech-slate-100)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label
                      htmlFor="form-email"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--tech-slate-400)',
                        textTransform: 'uppercase'
                      }}
                    >
                      Return Address / Email *
                    </label>
                    <input
                      id="form-email"
                      required
                      type="email"
                      placeholder="elena@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        padding: '0.7rem 0.875rem',
                        background: 'rgba(12, 16, 23, 0.9)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--tech-slate-100)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label
                    htmlFor="form-subject"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--tech-slate-400)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Transmission Topic / Project Scope
                  </label>
                  <select
                    id="form-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      padding: '0.7rem 0.875rem',
                      background: 'rgba(12, 16, 23, 0.9)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--tech-slate-100)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Unreal Engine C++ Gameplay Architecture">Unreal Engine C++ Gameplay Architecture</option>
                    <option value="Embedded Robotics & Firmware Development">Embedded Robotics & Firmware Development</option>
                    <option value="ROS2 & Digital Twin Simulation">ROS2 & Digital Twin Simulation</option>
                    <option value="Full-Time Engineering Role Inquiry">Full-Time Engineering Role Inquiry</option>
                    <option value="Technical Advisory / Consultation">Technical Advisory / Consultation</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label
                    htmlFor="form-message"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--tech-slate-400)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Telemetry Payload / Message *
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    placeholder="Describe your technical specifications, project objectives, or collaboration timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      padding: '0.75rem 0.875rem',
                      background: 'rgba(12, 16, 23, 0.9)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--tech-slate-100)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
                >
                  <Send size={16} />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr 1.25fr !important;
          }
        }
      `}</style>
    </section>
  );
};
