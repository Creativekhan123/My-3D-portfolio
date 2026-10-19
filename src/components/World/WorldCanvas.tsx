import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { RoboticExplorer } from './RoboticExplorer';
import { ThirdPersonCamera } from './ThirdPersonCamera';
import { PortfolioWorld } from './PortfolioWorld';
import { TouchCameraPad } from '../Input/TouchCameraPad';
import { GameHUD } from '../HUD/GameHUD';
import { DirectPortfolioModal } from '../DirectPortfolio/DirectPortfolioModal';
import { ProjectVideoModal } from '../ProjectVideoModal';
import { useInputManager } from '../../hooks/useInputManager';
import { EXHIBIT_STATIONS, SECTORS, PARK_DOORS, RETURN_TO_PARK_DOOR } from '../../data/worldData';
import { PROJECTS } from '../../data/projects';
import { isWebGLAvailable, prefersReducedMotion } from '../LabScene/WebGLCheck';
import type {
  ExhibitStationInfo,
  DoorPortalInfo,
  GraphicQuality,
  PlayerState,
  AvatarType,
  RoomId
} from '../../types/game';
import type { ProjectCaseStudy } from '../../types/project';

interface WorldCanvasProps {
  onFallbackTo2D?: () => void;
}

export const WorldCanvas: React.FC<WorldCanvasProps> = ({ onFallbackTo2D }) => {
  const [graphicQuality, setGraphicQuality] = useState<GraphicQuality>('high');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [avatarType, setAvatarType] = useState<AvatarType>('character');
  const [activeRoom, setActiveRoom] = useState<RoomId>('park');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectCaseStudy | null>(null);
  const [isDirectPortfolioOpen, setIsDirectPortfolioOpen] = useState<boolean>(false);
  const [directPortfolioTab, setDirectPortfolioTab] = useState<'projects' | 'profile'>('projects');
  const [cameraYaw, setCameraYaw] = useState<number>(0);

  const [playerState, setPlayerState] = useState<PlayerState>({
    position: [0, 0, 4.2],
    rotation: 0,
    speed: 0,
    currentSector: 'Greenery Park Hub',
    activeRoom: 'park',
    avatarType: 'character',
    nearestExhibit: null,
    distanceToNearest: 999,
    nearestDoor: null,
    distanceToDoor: 999
  });

  const isAnyModalOpen = activeCaseStudy !== null || isDirectPortfolioOpen;

  const {
    inputRef,
    setJoystickInput,
    addCameraDelta,
    hasTouchCapability
  } = useInputManager(isAnyModalOpen);

  // Initialize WebGL and motion preferences
  useEffect(() => {
    if (!isWebGLAvailable()) {
      onFallbackTo2D?.();
    }
    if (prefersReducedMotion()) {
      setReducedMotion(true);
    }
  }, [onFallbackTo2D]);

  // Keyboard shortcut [V] to toggle Avatar (Cartoon Robot / Microcontroller Rover)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'v' || e.key === 'V') {
        if (!isAnyModalOpen) {
          setAvatarType((curr) => (curr === 'character' ? 'vehicle' : 'character'));
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isAnyModalOpen]);

  // Handle URL hash navigation for deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const slug = hash.replace('#/project/', '');
        const p = PROJECTS.find((proj) => proj.slug === slug || proj.id === slug);
        if (p) setActiveCaseStudy(p);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Room Enter / Door Transition Handler
  const handleEnterDoor = useCallback((targetRoomId: RoomId) => {
    setActiveRoom(targetRoomId);

    // Determine target spawn coordinates
    let spawn: [number, number, number] = [0, 0, 5.0];
    let sectorName = 'Greenery Park Hub';

    if (targetRoomId === 'park' || targetRoomId === 'nexus') {
      spawn = [0, 0, 4.2];
      sectorName = 'Greenery Park Hub';
    } else {
      const foundSector = SECTORS.find((s) => s.id === targetRoomId);
      if (foundSector) {
        sectorName = foundSector.name;
        spawn = foundSector.spawnPoint;
      }
    }

    setPlayerState((prev) => ({
      ...prev,
      position: spawn,
      activeRoom: targetRoomId,
      currentSector: sectorName,
      nearestDoor: null,
      distanceToDoor: 999
    }));
  }, []);

  // Open Project TV Video Showcase
  const handleOpenCaseStudyFromStation = useCallback((station: ExhibitStationInfo) => {
    const project = PROJECTS.find((p) => p.id === station.projectId || p.slug === station.slug);
    if (project) {
      setActiveCaseStudy(project);
      window.history.pushState(null, '', `#/project/${project.slug}`);
    }
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setActiveCaseStudy(null);
    if (window.location.hash.startsWith('#/project/')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, []);

  // Update Player Position, Door Proximity, and Exhibit Proximity
  const handlePositionUpdate = useCallback(
    (pos: [number, number, number], rot: number, speed: number) => {
      // 1. Check Nearest Exhibit TV Station (matching active room)
      let closestExhibit: ExhibitStationInfo | null = null;
      let minExhibitDist = 999;

      const stationsToCheck = EXHIBIT_STATIONS.filter((s) => s.sectorId === activeRoom);
      for (const station of stationsToCheck) {
        const dx = pos[0] - station.position[0];
        const dz = pos[2] - station.position[2];
        const dist = Math.hypot(dx, dz);

        if (dist < station.interactionRadius && dist < minExhibitDist) {
          closestExhibit = station;
          minExhibitDist = dist;
        }
      }

      // 2. Check Nearest Gateway Door
      let closestDoor: DoorPortalInfo | null = null;
      let minDoorDist = 999;

      const doorsToCheck = (activeRoom === 'park' || activeRoom === 'nexus') ? PARK_DOORS : [RETURN_TO_PARK_DOOR];
      for (const door of doorsToCheck) {
        const dx = pos[0] - door.position[0];
        const dz = pos[2] - door.position[2];
        const dist = Math.hypot(dx, dz);

        if (dist < door.interactionRadius && dist < minDoorDist) {
          closestDoor = door;
          minDoorDist = dist;
        }
      }

      // 3. Determine Sector Name
      let activeSectorName = (activeRoom === 'park' || activeRoom === 'nexus') ? 'Greenery Park Hub' : 'Realm Level';
      const sec = SECTORS.find((s) => s.id === activeRoom);
      if (sec) activeSectorName = sec.name;

      setPlayerState((prev) => {
        if (
          Math.abs(prev.position[0] - pos[0]) > 0.05 ||
          Math.abs(prev.position[2] - pos[2]) > 0.05 ||
          prev.nearestExhibit?.id !== closestExhibit?.id ||
          prev.nearestDoor?.id !== closestDoor?.id ||
          prev.avatarType !== avatarType ||
          prev.activeRoom !== activeRoom
        ) {
          return {
            position: pos,
            rotation: rot,
            speed,
            currentSector: activeSectorName,
            activeRoom,
            avatarType,
            nearestExhibit: closestExhibit,
            distanceToNearest: minExhibitDist,
            nearestDoor: closestDoor,
            distanceToDoor: minDoorDist
          };
        }
        return prev;
      });

      // 4. Handle Interaction (Press E / Enter or Tap)
      if (inputRef.current.interactRequested && !isAnyModalOpen) {
        inputRef.current.interactRequested = false;

        if (closestDoor) {
          handleEnterDoor(closestDoor.targetRoomId);
        } else if (closestExhibit) {
          handleOpenCaseStudyFromStation(closestExhibit);
        }
      }
    },
    [activeRoom, avatarType, inputRef, isAnyModalOpen, handleEnterDoor, handleOpenCaseStudyFromStation]
  );

  // Fast Travel teleportation
  const handleFastTravel = useCallback(
    (sectorId: string) => {
      handleEnterDoor(sectorId as RoomId);
    },
    [handleEnterDoor]
  );

  // Sky & Atmospheric Tint based on Active Room
  const getSkyConfig = () => {
    switch (activeRoom) {
      case 'game-dev':
      case 'game-studio':
        return { color: '#090d16', fogNear: 16, fogFar: 45 };
      case 'robotics':
      case 'robotics-lab':
        return { color: '#0f172a', fogNear: 18, fogFar: 48 };
      case 'twin-dev':
      case 'twin-lab':
        return { color: '#020617', fogNear: 18, fogFar: 48 };
      case 'park':
      case 'nexus':
      default:
        // Pleasant daylight park sky with soft meadow horizon
        return { color: '#bae6fd', fogNear: 24, fogFar: 60 };
    }
  };

  const sky = getSkyConfig();

  return (
    <div
      id="3d-world-container"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: sky.color
      }}
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows={graphicQuality === 'high'}
        dpr={graphicQuality === 'high' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
        frameloop="always"
        gl={{
          antialias: graphicQuality === 'high',
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        camera={{ position: [0, 4.2, 7.0], fov: 48, near: 0.1, far: 120 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Dynamic Sky & Fog */}
        <color attach="background" args={[sky.color]} />
        <fog attach="fog" args={[sky.color, sky.fogNear, sky.fogFar]} />

        {/* Third-Person Camera Follow */}
        <ThirdPersonCamera
          avatarPosition={playerState.position}
          inputRef={inputRef}
          onCameraYawUpdate={setCameraYaw}
          reducedMotion={reducedMotion}
        />

        {/* Player Avatar (Cartoon Robot / Microcontroller Rover) */}
        <RoboticExplorer
          inputRef={inputRef}
          cameraAngle={cameraYaw}
          onPositionUpdate={handlePositionUpdate}
          nearestExhibit={playerState.nearestExhibit}
          reducedMotion={reducedMotion}
          avatarType={avatarType}
          activeRoom={activeRoom}
          spawnPosition={
            activeRoom === 'park' || activeRoom === 'nexus'
              ? [0, 0, 4.2]
              : SECTORS.find((s) => s.id === activeRoom)?.spawnPoint || [0, 0, 5.0]
          }
        />

        {/* Multi-Room World Architecture & Doors */}
        <PortfolioWorld
          activeRoom={activeRoom}
          nearestExhibit={playerState.nearestExhibit}
          nearestDoor={playerState.nearestDoor}
          onInteractStation={handleOpenCaseStudyFromStation}
          onEnterDoor={handleEnterDoor}
        />
      </Canvas>

      {/* Right-Side Touch Camera Drag Region */}
      <TouchCameraPad onDragDelta={addCameraDelta} />

      {/* Responsive Game HUD */}
      <GameHUD
        playerState={playerState}
        onMoveJoystick={setJoystickInput}
        onInteract={() => {
          if (playerState.nearestDoor) {
            handleEnterDoor(playerState.nearestDoor.targetRoomId);
          } else if (playerState.nearestExhibit) {
            handleOpenCaseStudyFromStation(playerState.nearestExhibit);
          }
        }}
        onOpenDirectPortfolio={() => {
          setDirectPortfolioTab('projects');
          setIsDirectPortfolioOpen(true);
        }}
        onFastTravel={handleFastTravel}
        onToggleAvatarType={() =>
          setAvatarType((curr) => (curr === 'character' ? 'vehicle' : 'character'))
        }
        onEnterDoor={handleEnterDoor}
        graphicQuality={graphicQuality}
        onToggleGraphicQuality={() => setGraphicQuality((q) => (q === 'high' ? 'perf' : 'high'))}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((r) => !r)}
        hasTouch={hasTouchCapability}
        isModalOpen={isAnyModalOpen}
      />

      {/* Non-3D Direct Portfolio Directory Modal */}
      <DirectPortfolioModal
        isOpen={isDirectPortfolioOpen}
        initialTab={directPortfolioTab}
        onClose={() => setIsDirectPortfolioOpen(false)}
        onSelectProject={(project) => {
          setIsDirectPortfolioOpen(false);
          setActiveCaseStudy(project);
        }}
        onTeleportToProject={(projectId) => {
          setIsDirectPortfolioOpen(false);
          const found = EXHIBIT_STATIONS.find((s) => s.projectId === projectId);
          if (found) {
            handleEnterDoor(found.sectorId as RoomId);
          }
        }}
      />

      {/* In-UI Project Video Showcase & Fullscreen Player Modal */}
      <ProjectVideoModal
        project={activeCaseStudy}
        onClose={handleCloseCaseStudy}
      />
    </div>
  );
};
