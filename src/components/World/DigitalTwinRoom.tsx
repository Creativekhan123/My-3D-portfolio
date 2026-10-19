import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, ROOM_EXIT_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface DigitalTwinRoomProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const DigitalTwinRoom: React.FC<DigitalTwinRoomProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  const station = EXHIBIT_STATIONS.find((s) => s.id === 'station-digital-twin') || EXHIBIT_STATIONS[2];

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
      <ambientLight intensity={0.6} color="#0d9488" />
      <directionalLight position={[10, 18, 6]} intensity={1.1} color="#cffafe" castShadow />
      <pointLight position={[0, 4.5, -3]} color="#00f5d4" intensity={4.0} distance={18} />
      <pointLight position={[-5, 3.5, 0]} color="#a855f7" intensity={3.0} distance={14} />
      <pointLight position={[5, 3.5, 0]} color="#38bdf8" intensity={3.0} distance={14} />

      {/* Cyber-Physical Glass Floor with Glowing Wireframe Grid Beneath */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#020617" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Matrix Cyan Grid on Floor */}
      <gridHelper args={[24, 24, '#00f5d4', '#0f766e']} position={[0, 0.02, 0]} />

      {/* Dual Physical & Virtual Robot Twin Sync Pedestals */}
      {/* Left Station: Physical Robot Hardware CAD */}
      <group position={[-5.2, 0, 0]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[1.3, 1.5, 1.4, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 6]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        {/* Physical Robot Wireframe Model */}
        <mesh position={[0, 2.1, 0]}>
          <boxGeometry args={[0.9, 1.1, 0.8]} />
          <meshStandardMaterial color="#0284c7" wireframe />
        </mesh>
        {/* Diagnostic Label */}
        <mesh position={[0, 2.9, 0]}>
          <planeGeometry args={[1.8, 0.35]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
      </group>

      {/* Right Station: UE5 Simulated Mesh Digital Twin */}
      <group position={[5.2, 0, 0]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[1.3, 1.5, 1.4, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 6]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        {/* Simulated Solid Mesh with ROS2 Telemetry Rays */}
        <mesh position={[0, 2.1, 0]}>
          <boxGeometry args={[0.9, 1.1, 0.8]} />
          <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh position={[0, 2.9, 0]}>
          <planeGeometry args={[1.8, 0.35]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
      </group>

      {/* Central Rotating LiDAR Holographic Point Cloud Sphere */}
      <group position={[0, 0, 1.2]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.8, 1.0, 0.8, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh ref={lidarGlobeRef} position={[0, 1.8, 0]}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshBasicMaterial color="#00f5d4" wireframe />
        </mesh>
        <mesh ref={ring1Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.1, 0.025, 8, 24]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.3, 0.02, 8, 24]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 1. CENTRAL LARGE INTERACTIVE PROJECT TV STATION              */}
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
