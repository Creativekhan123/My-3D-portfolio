import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ExternalLink,
  GitBranch,
  Video,
  AlertTriangle
} from 'lucide-react';
import type { ProjectCaseStudy } from '../types/project';

interface ProjectVideoModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const ProjectVideoModal: React.FC<ProjectVideoModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);

  // Default high-performance test video for dummy projects (Big Buck Bunny 720p open sample)
  const fallbackVideoUrl =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const videoSrc = project?.demoVideoUrl || fallbackVideoUrl;

  // Track fullscreen changes across browsers
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Video control handlers
  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleToggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
        (videoContainerRef.current as any).webkitRequestFullscreen();
      } else if ((videoContainerRef.current as any).msRequestFullscreen) {
        (videoContainerRef.current as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="project-video-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        backgroundColor: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !document.fullscreenElement) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '92vh',
          backgroundColor: '#0c1017',
          borderRadius: '16px',
          border: '1px solid #1e293b',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Sticky Header Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            background: 'rgba(12, 16, 23, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #1e293b'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              <Video size={14} />
              <span>PROJECT TV SHOWCASE</span>
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#38bdf8',
                textTransform: 'uppercase'
              }}
            >
              {project.categoryLabel}
            </span>
          </div>

          <button
            id="close-video-modal-btn"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid #334155',
              color: '#e2e8f0',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
            aria-label="Close Project Showcase"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Title Area */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)',
                fontWeight: 800,
                color: '#f8fafc',
                marginBottom: '0.4rem',
                lineHeight: 1.25
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontFamily: 'sans-serif',
                fontSize: '1rem',
                color: '#f59e0b',
                fontWeight: 600
              }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* ============================================================ */}
          {/* VIDEO PLAYER THEATER WITH CROSS-DEVICE FULLSCREEN            */}
          {/* ============================================================ */}
          <div
            ref={videoContainerRef}
            id="project-video-player-container"
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#000000',
              borderRadius: isFullscreen ? '0' : '12px',
              overflow: 'hidden',
              border: isFullscreen ? 'none' : '1px solid #334155',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Prominent Floating "EXIT FULLSCREEN & RESUME" Button (Shown in Fullscreen Mode) */}
            {isFullscreen && (
              <button
                id="floating-exit-fullscreen-btn"
                onClick={() => {
                  handleToggleFullscreen();
                  onClose();
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 50,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.95)',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  borderRadius: '30px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.7)'
                }}
              >
                <X size={18} />
                <span>EXIT FULLSCREEN & RESUME</span>
              </button>
            )}

            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              poster={project.heroImage}
              playsInline
              webkit-playsinline="true"
              autoPlay
              muted={isMuted}
              loop
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onError={() => setVideoError(true)}
              onClick={handleTogglePlay}
              style={{
                width: '100%',
                maxHeight: isFullscreen ? '100vh' : '480px',
                aspectRatio: '16/9',
                objectFit: 'contain',
                backgroundColor: '#000',
                cursor: 'pointer',
                display: 'block'
              }}
            />

            {/* In-Video Overlay Play/Pause Indicator if Paused */}
            {!isPlaying && (
              <div
                onClick={handleTogglePlay}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.45)',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(245, 158, 11, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#090d16',
                    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.5)'
                  }}
                >
                  <Play size={32} style={{ marginLeft: '4px' }} />
                </div>
              </div>
            )}

            {videoError && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(15, 23, 42, 0.92)',
                  color: '#f8fafc',
                  gap: '8px',
                  padding: '16px',
                  textAlign: 'center'
                }}
              >
                <AlertTriangle size={32} color="#f59e0b" />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sample Video Stream Standby</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Set <code style={{ color: '#38bdf8' }}>demoVideoUrl</code> in <code style={{ color: '#38bdf8' }}>src/data/projects.ts</code> to your MP4 video file.
                </div>
              </div>
            )}

            {/* Custom Sci-Fi Playback Controls Bar */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.7) 0%, rgba(2, 6, 23, 0.95) 100%)',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 10
              }}
            >
              {/* Play / Pause Toggle */}
              <button
                id="video-play-pause-btn"
                onClick={handleTogglePlay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px'
                }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              {/* Time Scrubber */}
              <input
                id="video-time-scrubber"
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                style={{
                  flex: 1,
                  accentColor: '#f59e0b',
                  cursor: 'pointer',
                  height: '6px'
                }}
              />

              {/* Time Display */}
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  minWidth: '78px',
                  textAlign: 'center'
                }}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Mute / Unmute Audio */}
              <button
                id="video-mute-toggle-btn"
                onClick={handleToggleMute}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px'
                }}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              {/* Fullscreen Toggle Button (PC & Mobile Android) */}
              <button
                id="video-fullscreen-btn"
                onClick={handleToggleFullscreen}
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid #f59e0b',
                  borderRadius: '6px',
                  color: '#f59e0b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
                title={isFullscreen ? 'Exit Fullscreen' : 'Watch Fullscreen'}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                <span>{isFullscreen ? 'EXIT' : 'FULLSCREEN'}</span>
              </button>
            </div>
          </div>

          {/* Dummy Project Notice / Media Replacement Guidance */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                color: '#38bdf8',
                background: 'rgba(56, 189, 248, 0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 700
              }}
            >
              MEDIA NOTE
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Currently streaming placeholder demonstration media. You can replace the project video,
              thumbnails, and links anytime in <code style={{ color: '#38bdf8' }}>src/data/projects.ts</code>.
            </span>
          </div>

          {/* Quick External Links (GitHub / Live Demo) */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <GitBranch size={16} color="#38bdf8" />
                <span>GitHub Repository</span>
                <ExternalLink size={14} color="#64748b" />
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '8px',
                  color: '#090d16',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <span>Live Simulation Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#94a3b8',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}
            >
              Core Technology Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#1e293b',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: '#e2e8f0',
                    border: '1px solid #334155'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h4
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#94a3b8',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}
            >
              Executive Summary
            </h4>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>{project.summary}</p>
          </div>

          {/* Problem & Objective */}
          <div>
            <h4
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#94a3b8',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}
            >
              Engineering Challenge & Objective
            </h4>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {project.problemObjective}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div>
            <h4
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#94a3b8',
                textTransform: 'uppercase',
                marginBottom: '0.75rem'
              }}
            >
              Verified Technical Benchmarks
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px'
              }}
            >
              {project.technicalSpecs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: '12px',
                    backgroundColor: '#111827',
                    borderRadius: '8px',
                    border: '1px solid #1f2937'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                    {spec.label}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8' }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
