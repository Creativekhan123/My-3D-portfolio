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
  const telemetryRingRef = useRef<THREE.Mesh>(null);
  const dataBitsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lidarGlobeRef.current) {
      lidarGlobeRef.current.rotation.y = t * 0.7;
      lidarGlobeRef.current.rotation.x = t * 0.4;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.9;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.8;
    if (telemetryRingRef.current) telemetryRingRef.current.rotation.z = -t * 0.5;

    if (dataBitsRef.current) {
      dataBitsRef.current.children.forEach((bit, i) => {
        bit.position.y = 1.0 + ((t * 0.7 + i * 0.4) % 2.5);
        bit.rotation.y = t * 2.0;
      });
    }
  });

  return (
    <group>
      {/* Robotics + Game Dev Hybrid Lighting: Cyber Teal & Holographic Magenta */}
      <ambientLight intensity={0.62} color="#0d9488" />
      <directionalLight position={[10, 18, 6]} intensity={1.15} color="#cffafe" castShadow />
      <pointLight position={[0, 4.5, -2]} color="#00f5d4" intensity={4.0} distance={18} />
      <pointLight position={[-5, 3.5, 0]} color="#a855f7" intensity={3.0} distance={14} />
      <pointLight position={[5, 3.5, 0]} color="#38bdf8" intensity={3.0} distance={14} />

      {/* ============================================================ */}
      {/* 1. SPLIT-BAY CYBER-PHYSICAL FLOOR DESIGN                     */}
      {/* ============================================================ */}
      {/* Left Bay: Physical Industrial Test Cell (Steel Plate) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-7, 0.01, 0]} receiveShadow>
        <planeGeometry args={[14, 28]} />
        <meshStandardMaterial color="#0f172a" roughness={0.45} metalness={0.65} />
      </mesh>

      {/* Right Bay: Virtual Simulation Twin (Dark Mirror Glass) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7, 0.01, 0]} receiveShadow>
        <planeGeometry args={[14, 28]} />
        <meshStandardMaterial color="#020617" roughness={0.08} metalness={0.95} />
      </mesh>

      {/* Central Division Line: Cyber-Physical Threshold */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[0.3, 28]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.8} />
      </mesh>

      {/* Matrix Cyan Grid across Simulation Half */}
      <group position={[7, 0.025, 0]}>
        <gridHelper args={[14, 14, '#00f5d4', '#0f766e']} />
      </group>

      {/* ============================================================ */}
      {/* 2. HIGH-DENSITY SERVER RACKS & COMPUTE TOWERS                */}
      {/* ============================================================ */}
      {[-9.5, -6.5, 6.5, 9.5].map((x, i) => (
        <group key={`server-${i}`} position={[x, 0, -12.5]}>
          {/* Main 42U Server Cabinet */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <boxGeometry args={[1.8, 4.4, 1.2]} />
            <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.7} />
          </mesh>
          {/* Glass Door with Neon Bezel */}
          <mesh position={[0, 2.2, 0.62]}>
            <planeGeometry args={[1.6, 4.0]} />
            <meshStandardMaterial color="#020617" transparent opacity={0.6} roughness={0.1} />
          </mesh>
          {/* Blinking Status LED Arrays */}
          {[0.8, 1.6, 2.4, 3.2].map((y, j) => (
            <mesh key={`led-${j}`} position={[-0.5 + (j % 2) * 1.0, y, 0.63]}>
              <boxGeometry args={[0.15, 0.05, 0.02]} />
              <meshBasicMaterial color={j % 2 === 0 ? '#22c55e' : '#00f5d4'} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ============================================================ */}
      {/* 3. FLOATING HOLOGRAPHIC TELEMETRY HUD SCREENS                */}
      {/* ============================================================ */}
      {/* Left HUD: Hardware In-The-Loop CAN-FD Status */}
      <group position={[-5.8, 3.2, 0]} rotation={[0, 0.35, 0]}>
        <mesh>
          <planeGeometry args={[2.8, 1.2]} />
          <meshBasicMaterial color="#020617" transparent opacity={0.8} />
        </mesh>
        <mesh>
          <boxGeometry args={[2.84, 1.24, 0.02]} />
          <meshBasicMaterial color="#06b6d4" wireframe />
        </mesh>
      </group>

      {/* Right HUD: Synthetic LiDAR Raycasting Telemetry */}
      <group position={[5.8, 3.2, 0]} rotation={[0, -0.35, 0]}>
        <mesh>
          <planeGeometry args={[2.8, 1.2]} />
          <meshBasicMaterial color="#020617" transparent opacity={0.8} />
        </mesh>
        <mesh>
          <boxGeometry args={[2.84, 1.24, 0.02]} />
          <meshBasicMaterial color="#a855f7" wireframe />
        </mesh>
      </group>

      {/* Central Rotating LiDAR Holographic Point Cloud Sphere */}
      <group position={[0, 0, 1.0]}>
        {/* Animated Cyber Ground Telemetry Ring */}
        <mesh ref={telemetryRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[1.6, 1.9, 16]} />
          <meshBasicMaterial color="#00f5d4" transparent opacity={0.65} />
        </mesh>
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
        {/* Floating Telemetry Bit Packets */}
        <group ref={dataBitsRef}>
          {[
            [-0.7, 1.2, 0.6],
            [0.8, 1.5, -0.5],
            [-0.5, 2.0, -0.7],
            [0.6, 2.2, 0.7],
            [0.0, 2.5, -0.9],
          ].map(([bx, by, bz], bi) => (
            <mesh key={`dbit-${bi}`} position={[bx, by, bz]}>
              <boxGeometry args={[0.07, 0.07, 0.07]} />
              <meshBasicMaterial color={bi % 2 === 0 ? "#00f5d4" : "#a855f7"} />
            </mesh>
          ))}
        </group>
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
