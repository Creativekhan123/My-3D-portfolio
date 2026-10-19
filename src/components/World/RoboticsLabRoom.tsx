import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, ROOM_EXIT_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface RoboticsLabRoomProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const RoboticsLabRoom: React.FC<RoboticsLabRoomProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  const station = EXHIBIT_STATIONS.find((s) => s.id === 'station-micromouse') || EXHIBIT_STATIONS[1];
  const miniBotRef = useRef<THREE.Group>(null);
  const robotArmRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Animated micromouse navigating in a square loop inside the maze
    if (miniBotRef.current) {
      const loop = (t * 1.5) % 8;
      let x = 0;
      let z = 0;
      let rot = 0;
      if (loop < 2) {
        x = -1.2 + (loop / 2) * 2.4;
        z = -1.2;
        rot = Math.PI / 2;
      } else if (loop < 4) {
        x = 1.2;
        z = -1.2 + ((loop - 2) / 2) * 2.4;
        rot = 0;
      } else if (loop < 6) {
        x = 1.2 - ((loop - 4) / 2) * 2.4;
        z = 1.2;
        rot = -Math.PI / 2;
      } else {
        x = -1.2;
        z = 1.2 - ((loop - 6) / 2) * 2.4;
        rot = Math.PI;
      }
      miniBotRef.current.position.set(x, 0.08, z);
      miniBotRef.current.rotation.y = rot;
    }

    // Industrial robot arm oscillating joint motion
    if (robotArmRef.current) {
      robotArmRef.current.rotation.y = Math.sin(t * 1.2) * 0.8;
    }
  });

  return (
    <group>
      {/* Cool Industrial Cyan & Steel Lighting Rig */}
      <ambientLight intensity={0.65} color="#cffafe" />
      <directionalLight position={[10, 18, 8]} intensity={1.2} color="#e0f2fe" castShadow />
      <pointLight position={[0, 5, -2]} color="#06b6d4" intensity={3.5} distance={18} />
      <pointLight position={[-6, 4, 0]} color="#f59e0b" intensity={2.0} distance={12} />

      {/* Industrial Lab Floor with Steel Tile Pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Hazard Caution Stripes Along Perimeter */}
      <mesh position={[0, 0.02, 11]}>
        <boxGeometry args={[22, 0.01, 0.3]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, -11]}>
        <boxGeometry args={[22, 0.01, 0.3]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} />
      </mesh>

      {/* Lab Back Wall */}
      <mesh position={[0, 5, -12]} receiveShadow>
        <boxGeometry args={[26, 10, 0.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Side Walls */}
      <mesh position={[-12, 5, 0]} receiveShadow>
        <boxGeometry args={[0.5, 10, 26]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[12, 5, 0]} receiveShadow>
        <boxGeometry args={[0.5, 10, 26]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* ============================================================ */}
      {/* 1. MICROMOUSE 16X16 MAZE ARENA                               */}
      {/* ============================================================ */}
      <group position={[-5.5, 0.1, 0]}>
        {/* Maze Baseboard */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.4, 3.8]} />
          <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Outer Maze Walls */}
        <mesh position={[0, 0.55, 1.85]}>
          <boxGeometry args={[3.8, 0.3, 0.1]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, 0.55, -1.85]}>
          <boxGeometry args={[3.8, 0.3, 0.1]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[1.85, 0.55, 0]}>
          <boxGeometry args={[0.1, 0.3, 3.8]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[-1.85, 0.55, 0]}>
          <boxGeometry args={[0.1, 0.3, 3.8]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>

        {/* Maze Grid Walls */}
        {[-1.0, 0, 1.0].map((coord, i) => (
          <React.Fragment key={i}>
            <mesh position={[coord, 0.5, 0.3]}>
              <boxGeometry args={[0.08, 0.2, 1.6]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0.3, 0.5, coord]}>
              <boxGeometry args={[1.6, 0.2, 0.08]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
          </React.Fragment>
        ))}

        {/* Animated Navigating Micromouse Robot */}
        <group ref={miniBotRef} position={[0, 0.5, 0]}>
          {/* Chassis PCB */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.26, 0.04, 0.32]} />
            <meshStandardMaterial color="#059669" />
          </mesh>
          {/* Battery Pack */}
          <mesh position={[0, 0.12, -0.04]}>
            <boxGeometry args={[0.18, 0.08, 0.16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Optical IR Sensors */}
          <mesh position={[-0.1, 0.08, 0.15]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.1, 0.08, 0.15]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          {/* Wheels */}
          <mesh position={[-0.15, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0.15, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 2. INDUSTRIAL WORKBENCH & ROBOT ARM PEDESTAL                */}
      {/* ============================================================ */}
      <group position={[5.5, 0, 0]}>
        {/* Steel Table */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2.5, 1.5, 4.2]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Tabletop Diagnostic Screen */}
        <mesh position={[0, 1.6, -1.2]}>
          <boxGeometry args={[1.2, 0.7, 0.1]} />
          <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.5} />
        </mesh>

        {/* Articulated Robot Arm Stand */}
        <group ref={robotArmRef} position={[0, 1.5, 0.5]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.25, 0.3, 0.4, 8]} />
            <meshStandardMaterial color="#eab308" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.65, 0]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[0.16, 0.7, 0.16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 1.1, 0.25]} rotation={[-0.6, 0, 0]}>
            <boxGeometry args={[0.14, 0.6, 0.14]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
          {/* Gripper Hand */}
          <mesh position={[0, 1.35, 0.4]}>
            <boxGeometry args={[0.22, 0.08, 0.1]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 3. CENTRAL LARGE INTERACTIVE PROJECT TV STATION              */}
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
      {/* 4. EXIT DOOR BACK TO COURTYARD                               */}
      {/* ============================================================ */}
      <GatewayDoor
        door={ROOM_EXIT_DOOR}
        isNearby={nearestDoor?.id === ROOM_EXIT_DOOR.id}
        onEnter={onEnterDoor}
      />
    </group>
  );
};
