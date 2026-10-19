import type { ProjectCategory } from './project';

export type GraphicQuality = 'high' | 'perf';
export type AvatarType = 'character' | 'vehicle';
export type RoomId = 
  | 'park' 
  | 'game-dev' 
  | 'robotics' 
  | 'twin-dev'
  | 'nexus' 
  | 'game-studio' 
  | 'robotics-lab' 
  | 'twin-lab' 
  | 'creator-studio' 
  | 'command-core';

export interface Vector2D {
  x: number;
  y: number;
}

export interface InputState {
  moveVector: { x: number; z: number }; // X is left/right (-1 to 1), Z is forward/back (-1 to 1)
  cameraDelta: { yaw: number; pitch: number };
  interactRequested: boolean;
  activeInputType: 'touch' | 'keyboard' | 'mouse';
  isMoving: boolean;
  speedMultiplier: number;
}

export interface ExhibitStationInfo {
  id: string;
  projectId: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  sectorName: string;
  sectorId: string;
  position: [number, number, number];
  rotation: [number, number, number];
  interactionRadius: number;
  accentColor: string;
  thumbnailUrl: string;
  badgeText: string;
  description: string;
}

export interface DoorPortalInfo {
  id: string;
  targetRoomId: RoomId;
  label: string;
  sublabel: string;
  badge: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  targetSpawn: [number, number, number];
  interactionRadius: number;
}

export interface SectorZone {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
  spawnPoint: [number, number, number];
  bounds: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };
}

export interface PlayerState {
  position: [number, number, number];
  rotation: number; // yaw in radians
  speed: number;
  currentSector: string;
  activeRoom: RoomId;
  avatarType: AvatarType;
  nearestExhibit: ExhibitStationInfo | null;
  distanceToNearest: number;
  nearestDoor: DoorPortalInfo | null;
  distanceToDoor: number;
}

