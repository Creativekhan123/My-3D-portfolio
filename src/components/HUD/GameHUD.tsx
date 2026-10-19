import React, { useState } from 'react';
import {
  Compass,
  FolderKanban,
  HelpCircle,
  Zap,
  Gauge,
  ChevronRight,
  DoorOpen
} from 'lucide-react';
import { VirtualJoystick } from '../Input/VirtualJoystick';
import { SECTORS } from '../../data/worldData';
import type { GraphicQuality, PlayerState, RoomId } from '../../types/game';

interface GameHUDProps {
  playerState: PlayerState;
  onMoveJoystick: (vector: { x: number; z: number }) => void;
  onInteract: () => void;
  onOpenDirectPortfolio: () => void;
  onFastTravel: (sectorId: string) => void;
  onToggleAvatarType: () => void;
  onEnterDoor?: (targetRoomId: RoomId) => void;
  graphicQuality: GraphicQuality;
  onToggleGraphicQuality: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  hasTouch?: boolean;
  isModalOpen: boolean;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  playerState,
  onMoveJoystick,
  onInteract,
  onOpenDirectPortfolio,
  onFastTravel,
  onToggleAvatarType,
  onEnterDoor,
  graphicQuality,
  onToggleGraphicQuality,
  reducedMotion,
  onToggleReducedMotion,
  isModalOpen
}) => {
  const [showFastTravel, setShowFastTravel] = useState(false);
  const [showControlsHelp, setShowControlsHelp] = useState(false);

  if (isModalOpen) {
    return null;
  }

  const { nearestExhibit, nearestDoor, position, rotation, currentSector, avatarType, activeRoom } =
    playerState;

  // Radar calculations
  const radarSize = 100;
  const radarCenterX = radarSize / 2;
  const radarCenterY = radarSize / 2;

  const playerRadarX = radarCenterX + (position[0] / 16) * 36;
  const playerRadarY = radarCenterY + (position[2] / 16) * 36;

  const exhibitBlips = [
    { x: radarCenterX, y: radarCenterY - 28, color: '#f59e0b', name: 'UE5 Combat' },
    { x: radarCenterX + 28, y: radarCenterY, color: '#38bdf8', name: 'Micromouse' },
    { x: radarCenterX, y: radarCenterY + 28, color: '#a855f7', name: 'CyberTwin' },
    { x: radarCenterX - 28, y: radarCenterY, color: '#10b981', name: '6-DOF Arm' },
    { x: radarCenterX - 20, y: radarCenterY - 20, color: '#f43f5e', name: 'Command Deck' }
  ];

  return (
    <div
      id="game-hud"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding:
          'max(14px, env(safe-area-inset-top)) max(14px, env(safe-area-inset-right)) max(14px, env(safe-area-inset-bottom)) max(14px, env(safe-area-inset-left))'
      }}
    >
      {/* ============================================================ */}
      {/* TOP BAR: Sector Breadcrumb, Avatar Switcher, Directory, Teleport */}
      {/* ============================================================ */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        {/* Current Sector Badge */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '8px',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00f5d4',
              boxShadow: '0 0 8px #00f5d4'
            }}
          />
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#38bdf8',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              {activeRoom === 'nexus' ? 'CENTRAL COURTYARD' : 'LAB SECTOR ROOM'}
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#f8fafc',
                letterSpacing: '0.5px'
              }}
            >
              {currentSector}
            </div>
          </div>
        </div>

        {/* Action Controls Cluster */}
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          {/* Avatar Switcher Button (Vehicle / Character) */}
          <button
            id="hud-avatar-toggle-btn"
            onClick={onToggleAvatarType}
            style={{
              background:
                avatarType === 'vehicle'
                  ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.9) 0%, rgba(2, 132, 199, 0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.9) 100%)',
              color: '#090d16',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 12px',
              fontWeight: 800,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
              transition: 'transform 0.15s ease'
            }}
            title="Toggle Avatar (Character Droid / Cyber Rover) - Shortcut [V]"
          >
            <span>{avatarType === 'vehicle' ? '🏎️ ROVER' : '🤖 DROID'}</span>
            <span
              style={{
                fontSize: '10px',
                background: 'rgba(0,0,0,0.2)',
                padding: '1px 5px',
                borderRadius: '3px'
              }}
            >
              [V]
            </span>
          </button>

          {/* Direct 2D Portfolio Route Button */}
          <button
            id="hud-direct-directory-btn"
            onClick={onOpenDirectPortfolio}
            style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(217, 119, 6, 0.9) 100%)',
              color: '#090d16',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 14px',
              fontWeight: 700,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 0 14px rgba(245, 158, 11, 0.4)'
            }}
            title="Browse all projects directly without 3D exploration"
          >
            <FolderKanban size={15} />
            <span>Archive (2D)</span>
          </button>

          {/* Fast Travel Sector Menu Toggle */}
          <button
            id="hud-fast-travel-btn"
            onClick={() => setShowFastTravel(!showFastTravel)}
            style={{
              background: 'rgba(30, 41, 59, 0.85)',
              color: '#e2e8f0',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)'
            }}
          >
            <Compass size={15} color="#38bdf8" />
            <span>Rooms / Teleport</span>
          </button>

          {/* Graphics Quality Toggle */}
          <button
            id="hud-quality-toggle-btn"
            onClick={onToggleGraphicQuality}
            style={{
              background: 'rgba(30, 41, 59, 0.85)',
              color: graphicQuality === 'high' ? '#38bdf8' : '#e2e8f0',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '6px',
              padding: '8px 10px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)'
            }}
            title={`Toggle rendering fidelity: Currently ${graphicQuality.toUpperCase()}`}
          >
            <Gauge size={14} />
            <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
              {graphicQuality === 'high' ? 'HIGH' : 'PERF'}
            </span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            id="hud-motion-toggle-btn"
            onClick={onToggleReducedMotion}
            style={{
              background: 'rgba(30, 41, 59, 0.85)',
              color: reducedMotion ? '#f59e0b' : '#94a3b8',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '6px',
              padding: '8px 10px',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)'
            }}
            title={`Reduced Motion: ${reducedMotion ? 'ON' : 'OFF'}`}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
              {reducedMotion ? 'MOTION:OFF' : 'MOTION:ON'}
            </span>
          </button>

          {/* Controls Help Guide */}
          <button
            id="hud-help-btn"
            onClick={() => setShowControlsHelp(!showControlsHelp)}
            style={{
              background: 'rgba(30, 41, 59, 0.85)',
              color: '#e2e8f0',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '6px',
              padding: '8px',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)'
            }}
            title="View controls & keyboard shortcuts"
          >
            <HelpCircle size={15} />
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* FAST TRAVEL DROPDOWN DRAWER */}
      {/* ============================================================ */}
      {showFastTravel && (
        <div
          style={{
            pointerEvents: 'auto',
            position: 'absolute',
            top: '64px',
            right: '16px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '10px',
            padding: '12px',
            width: '280px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(12px)',
            zIndex: 25
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#94a3b8',
              fontFamily: 'monospace',
              letterSpacing: '1px',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}
          >
            Sector Instant Teleport
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {SECTORS.map((sec) => (
              <button
                key={sec.id}
                id={`fast-travel-${sec.id}`}
                onClick={() => {
                  onFastTravel(sec.id);
                  setShowFastTravel(false);
                }}
                style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: `1px solid ${sec.color}44`,
                  borderRadius: '6px',
                  padding: '8px 10px',
                  color: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{sec.name}</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{sec.code}</div>
                </div>
                <ChevronRight size={14} color={sec.color} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* CONTROLS GUIDE MODAL */}
      {/* ============================================================ */}
      {showControlsHelp && (
        <div
          style={{
            pointerEvents: 'auto',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
          onClick={() => setShowControlsHelp(false)}
        >
          <div
            style={{
              background: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '460px',
              width: '100%',
              color: '#f8fafc'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#38bdf8' }}>
              Explorer Navigation Controls
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#f59e0b',
                  marginBottom: '6px'
                }}
              >
                🖥️ Desktop / Laptop (Keyboard & Mouse)
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: '#cbd5e1'
                }}
              >
                <li>
                  <strong>W, A, S, D</strong> or <strong>Arrow Keys</strong>: Move / Drive
                </li>
                <li>
                  <strong>Mouse Drag</strong>: 360° Orbit Camera
                </li>
                <li>
                  <strong>Mouse Wheel</strong>: Camera Zoom In / Out
                </li>
                <li>
                  <strong>V</strong>: Toggle Avatar (Cute Droid 🤖 / Cyber Rover 🏎️)
                </li>
                <li>
                  <strong>E or Enter</strong>: Enter Doors & Inspect Project TV
                </li>
                <li>
                  <strong>Esc</strong>: Close Video / Modals
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#38bdf8',
                  marginBottom: '6px'
                }}
              >
                📱 Mobile / Touchscreen (Android & Windows Touch)
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: '#cbd5e1'
                }}
              >
                <li>
                  <strong>Virtual Joystick (Lower Left)</strong>: Analog 360° Drive
                </li>
                <li>
                  <strong>Right Screen Drag</strong>: Smooth Camera Rotation
                </li>
                <li>
                  <strong>Action Pill Button</strong>: Tap to enter doors & play TV video
                </li>
                <li>
                  <strong>Fullscreen Video Button</strong>: One-tap fullscreen video on mobile
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowControlsHelp(false)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Resume Exploration
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TACTICAL RADAR MINIMAP (UPPER RIGHT) */}
      {/* ============================================================ */}
      <div
        id="hud-minimap-radar"
        style={{
          position: 'absolute',
          top: '74px',
          right: '16px',
          width: `${radarSize}px`,
          height: `${radarSize}px`,
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1.5px solid rgba(56, 189, 248, 0.4)',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(6px)',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: 'rgba(56, 189, 248, 0.2)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'rgba(56, 189, 248, 0.2)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            right: '15%',
            bottom: '15%',
            borderRadius: '50%',
            border: '1px dashed rgba(56, 189, 248, 0.25)'
          }}
        />

        {exhibitBlips.map((blip, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${blip.x}px`,
              top: `${blip.y}px`,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: blip.color,
              boxShadow: `0 0 6px ${blip.color}`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            left: `${playerRadarX}px`,
            top: `${playerRadarY}px`,
            width: '0',
            height: '0',
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: '9px solid #00f5d4',
            transform: `translate(-50%, -50%) rotate(${rotation}rad)`,
            filter: 'drop-shadow(0 0 4px #00f5d4)'
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* BOTTOM CONTROLS ZONE: Virtual Joystick & Contextual Action Button */}
      {/* ============================================================ */}
      <footer
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          pointerEvents: 'none'
        }}
      >
        {/* Left: Virtual Joystick */}
        <div
          style={{
            pointerEvents: 'auto',
            marginBottom: '6px',
            marginLeft: '6px'
          }}
        >
          <VirtualJoystick onMove={onMoveJoystick} size={135} />
        </div>

        {/* Right: Contextual Interaction Button */}
        <div
          style={{
            pointerEvents: 'auto',
            marginBottom: '12px',
            marginRight: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px'
          }}
        >
          {nearestDoor ? (
            <button
              id="hud-enter-door-btn"
              onClick={() => onEnterDoor?.(nearestDoor.targetRoomId)}
              style={{
                background: `linear-gradient(135deg, ${nearestDoor.color} 0%, #0f172a 100%)`,
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: '30px',
                padding: '14px 22px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: `0 0 25px ${nearestDoor.color}cc, 0 8px 20px rgba(0,0,0,0.5)`,
                transform: 'scale(1.05)',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <DoorOpen size={18} />
              <span>{`ENTER ${nearestDoor.label.toUpperCase()}`}</span>
              <span
                style={{
                  background: '#ffffff',
                  color: '#090d16',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}
              >
                E / TAP
              </span>
            </button>
          ) : nearestExhibit ? (
            <button
              id="hud-interact-btn"
              onClick={onInteract}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#090d16',
                border: '2px solid #ffffff',
                borderRadius: '30px',
                padding: '14px 22px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(245, 158, 11, 0.8), 0 8px 20px rgba(0,0,0,0.4)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <Zap size={18} fill="#090d16" />
              <span>WATCH {nearestExhibit.shortTitle.toUpperCase()} TV</span>
              <span
                style={{
                  background: '#090d16',
                  color: '#f59e0b',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}
              >
                E / TAP
              </span>
            </button>
          ) : (
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#94a3b8',
                fontSize: '11px',
                fontFamily: 'monospace'
              }}
            >
              Approach any Gateway Door or Project TV
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
