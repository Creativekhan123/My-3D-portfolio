import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, RETURN_TO_PARK_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface RoboticsLevelProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const RoboticsLevel: React.FC<RoboticsLevelProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  // 4 Robotics LED TV Stations
  const roboticsStations = EXHIBIT_STATIONS.filter((s) => s.sectorId === 'robotics');

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
        x = -1.1 + (loop / 2) * 2.2;
        z = -1.1;
        rot = Math.PI / 2;
      } else if (loop < 4) {
        x = 1.1;
        z = -1.1 + ((loop - 2) / 2) * 2.2;
        rot = 0;
      } else if (loop < 6) {
        x = 1.1 - ((loop - 4) / 2) * 2.2;
        z = 1.1;
        rot = -Math.PI / 2;
      } else {
        x = -1.1;
        z = 1.1 - ((loop - 6) / 2) * 2.2;
        rot = Math.PI;
      }
      miniBotRef.current.position.set(x, 0.08, z);
      miniBotRef.current.rotation.y = rot;
    }

    // Industrial robot arm oscillating joint motion
    if (robotArmRef.current) {
      robotArmRef.current.rotation.y = Math.sin(t * 1.2) * 0.75;
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
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Hazard Caution Stripes Along Perimeter */}
      <mesh position={[0, 0.02, 12]}>
        <boxGeometry args={[24, 0.01, 0.3]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, -12]}>
        <boxGeometry args={[24, 0.01, 0.3]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} />
      </mesh>

      {/* Lab Back Wall */}
      <mesh position={[0, 5, -13]} receiveShadow>
        <boxGeometry args={[28, 10, 0.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Side Walls */}
      <mesh position={[-13, 5, 0]} receiveShadow>
        <boxGeometry args={[0.5, 10, 28]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[13, 5, 0]} receiveShadow>
        <boxGeometry args={[0.5, 10, 28]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* ============================================================ */}
      {/* 1. MICROMOUSE 16X16 MAZE ARENA IN WORKSHOP                   */}
      {/* ============================================================ */}
      <group position={[0, 0.1, 0.5]}>
        {/* Maze Baseboard */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.4, 3.6]} />
          <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Outer Maze Walls */}
        <mesh position={[0, 0.55, 1.75]}>
          <boxGeometry args={[3.6, 0.3, 0.08]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, 0.55, -1.75]}>
          <boxGeometry args={[3.6, 0.3, 0.08]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[1.75, 0.55, 0]}>
          <boxGeometry args={[0.08, 0.3, 3.6]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[-1.75, 0.55, 0]}>
          <boxGeometry args={[0.08, 0.3, 3.6]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>

        {/* Maze Grid Walls */}
        {[-0.9, 0, 0.9].map((coord, i) => (
          <React.Fragment key={i}>
            <mesh position={[coord, 0.5, 0.2]}>
              <boxGeometry args={[0.06, 0.2, 1.4]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
            <mesh position={[0.2, 0.5, coord]}>
              <boxGeometry args={[1.4, 0.2, 0.06]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
          </React.Fragment>
        ))}

        {/* Animated Navigating Micromouse Robot */}
        <group ref={miniBotRef} position={[0, 0.5, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.24, 0.04, 0.28]} />
            <meshStandardMaterial color="#059669" />
          </mesh>
          <mesh position={[0, 0.1, -0.04]}>
            <boxGeometry args={[0.16, 0.06, 0.14]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[-0.08, 0.07, 0.13]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.08, 0.07, 0.13]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 2. INDUSTRIAL WORKBENCH & ROBOT ARM                          */}
      {/* ============================================================ */}
      <group position={[6.5, 0, 1]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2.2, 1.5, 3.6]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.4} />
        </mesh>
        <group ref={robotArmRef} position={[0, 1.5, 0]}>
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
        </group>
      </group>

      {/* ============================================================ */}
      {/* THE 4 ROBOTICS LED TV PROJECT STATIONS                       */}
      {/* ============================================================ */}
      {roboticsStations.map((station) => (
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
