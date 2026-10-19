import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, ROOM_EXIT_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface CommandDeckRoomProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const CommandDeckRoom: React.FC<CommandDeckRoomProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  const station = EXHIBIT_STATIONS.find((s) => s.id === 'station-command-core') || EXHIBIT_STATIONS[4];

  const globeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.5;
    if (ringRef.current) ringRef.current.rotation.z = -t * 0.6;
  });

  return (
    <group>
      {/* Executive Command Bridge Lighting: Slate, Deep Rose & Brushed Gold */}
      <ambientLight intensity={0.55} color="#1e1b4b" />
      <directionalLight position={[10, 18, 10]} intensity={1.1} color="#fbcfe8" castShadow />
      <pointLight position={[0, 4.5, -3]} color="#f43f5e" intensity={4.0} distance={18} />
      <pointLight position={[-6, 3.5, 0]} color="#f59e0b" intensity={3.0} distance={14} />

      {/* Sleek Polished Graphite Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Rose & Gold Concentric Bridge Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[5.2, 5.4, 32]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[8.5, 8.7, 32]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Central Holographic Globe & Telemetry Core */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[1.2, 1.4, 0.9, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh ref={globeRef} position={[0, 1.8, 0]}>
          <dodecahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2.5} wireframe />
        </mesh>
        <mesh ref={ringRef} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.2, 0.03, 8, 32]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      </group>

      {/* Observation Bridge Consoles */}
      {[-6, 6].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[1.2, 1.4, 4.2]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, 1.45, 0]}>
            <boxGeometry args={[1.0, 0.05, 3.8]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* ============================================================ */}
      {/* 1. CENTRAL LARGE INTERACTIVE PROJECT TV / DOSSIER STATION    */}
      {/* ============================================================ */}
      <ProjectTVStation
        station={{
          ...station,
          position: [0, 0, -6.5],
          rotation: [0, 0, 0]
        }}
        isNearby={nearestExhibit?.id === station.id}
        onInteract={onInteractStation}
      />

      {/* ============================================================ */}
      {/* 2. EXIT DOOR BACK TO COURTYARD                               */}
      {/* ============================================================ */}
      <GatewayDoor
        door={ROOM_EXIT_DOOR}
        isNearby={nearestDoor?.id === ROOM_EXIT_DOOR.id}
        onEnter={onEnterDoor}
      />
    </group>
  );
};
