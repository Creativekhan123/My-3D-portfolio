import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, RETURN_TO_PARK_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface TwinDevLevelProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const TwinDevLevel: React.FC<TwinDevLevelProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  // 4 Digital Twin LED TV Stations
  const twinStations = EXHIBIT_STATIONS.filter((s) => s.sectorId === 'twin-dev');

  const lidarGlobeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lidarGlobeRef.current) {
      lidarGlobeRef.current.rotation.y = t * 0.7;
      lidarGlobeRef.current.rotation.x = t * 0.4;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.9;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.8;
  });

  return (
    <group>
      {/* Robotics + Game Dev Hybrid Lighting: Cyber Teal & Holographic Magenta */}
      <ambientLight intensity={0.62} color="#0d9488" />
      <directionalLight position={[10, 18, 6]} intensity={1.15} color="#cffafe" castShadow />
      <pointLight position={[0, 4.5, -2]} color="#00f5d4" intensity={4.0} distance={18} />
      <pointLight position={[-5, 3.5, 0]} color="#a855f7" intensity={3.0} distance={14} />
      <pointLight position={[5, 3.5, 0]} color="#38bdf8" intensity={3.0} distance={14} />

      {/* Cyber-Physical Glass Floor with Glowing Wireframe Grid Beneath */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#020617" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Matrix Cyan Grid on Floor */}
      <gridHelper args={[26, 26, '#00f5d4', '#0f766e']} position={[0, 0.02, 0]} />

      {/* Central Rotating LiDAR Holographic Point Cloud Sphere */}
      <group position={[0, 0, 1.0]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.9, 1.1, 0.8, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh ref={lidarGlobeRef} position={[0, 1.8, 0]}>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshBasicMaterial color="#00f5d4" wireframe />
        </mesh>
        <mesh ref={ring1Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.2, 0.025, 8, 24]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.4, 0.02, 8, 24]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>

      {/* Synchronized Twin Comparison Platforms: Physical vs Simulation */}
      {/* Left: Physical Robot Hardware Model */}
      <group position={[-5.8, 0, 1.5]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.3, 1.2, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[0.8, 0.9, 0.8]} />
          <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
      </group>

      {/* Right: Unreal Engine Simulated Mesh */}
      <group position={[5.8, 0, 1.5]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.3, 1.2, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[0.8, 0.9, 0.8]} />
          <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.7} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* THE 4 DIGITAL TWIN LED TV PROJECT STATIONS                   */}
      {/* ============================================================ */}
      {twinStations.map((station) => (
        <ProjectTVStation
          key={station.id}
          station={station}
          isNearby={nearestExhibit?.id === station.id}
          onInteract={onInteractStation}
        />
      ))}

      {/* ============================================================ */}
      {/* EXIT DOOR BACK TO SCENIC PARK                                */}
      {/* ============================================================ */}
      <GatewayDoor
        door={RETURN_TO_PARK_DOOR}
        isNearby={nearestDoor?.id === RETURN_TO_PARK_DOOR.id}
        onEnter={onEnterDoor}
      />
    </group>
  );
};
