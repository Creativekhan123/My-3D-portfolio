import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, ROOM_EXIT_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface KinematicsRoomProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const KinematicsRoom: React.FC<KinematicsRoomProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  const station = EXHIBIT_STATIONS.find((s) => s.id === 'station-robotic-arm') || EXHIBIT_STATIONS[3];

  const armBaseRef = useRef<THREE.Group>(null);
  const armElbowRef = useRef<THREE.Group>(null);
  const armWristRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // 6-DOF Manipulator continuous pick & place kinematic trajectory
    if (armBaseRef.current) armBaseRef.current.rotation.y = Math.sin(t * 0.9) * 1.1;
    if (armElbowRef.current) armElbowRef.current.rotation.x = -0.3 + Math.sin(t * 1.8) * 0.4;
    if (armWristRef.current) armWristRef.current.rotation.x = 0.4 + Math.cos(t * 1.8) * 0.35;
  });

  return (
    <group>
      {/* Workshop Ambiance: Crisp Emerald Task Lights & Clean Factory Slate */}
      <ambientLight intensity={0.65} color="#ecfdf5" />
      <directionalLight position={[10, 18, 10]} intensity={1.15} color="#d1fae5" castShadow />
      <pointLight position={[0, 4.5, -3]} color="#10b981" intensity={4.0} distance={16} />
      <pointLight position={[-5, 3.5, 0]} color="#f59e0b" intensity={3.0} distance={14} />

      {/* Workshop Floor with Floor Cable Trays */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Emerald Perimeter Workshop Rails */}
      <mesh position={[0, 0.02, 11]}>
        <boxGeometry args={[22, 0.02, 0.2]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <mesh position={[0, 0.02, -11]}>
        <boxGeometry args={[22, 0.02, 0.2]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* Large 6-DOF Industrial Robotic Manipulator Workstation */}
      <group position={[-5.2, 0, 0]}>
        {/* Heavy Pedestal Table */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[1.4, 1.6, 1.0, 8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Arm Base Swivel */}
        <group ref={armBaseRef} position={[0, 1.0, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 0.4, 12]} />
            <meshStandardMaterial color="#059669" />
          </mesh>

          {/* Lower Bicep Arm Segment */}
          <group position={[0, 0.4, 0]}>
            <mesh position={[0, 0.45, 0]} castShadow>
              <boxGeometry args={[0.22, 0.9, 0.22]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Elbow Articulation */}
            <group ref={armElbowRef} position={[0, 0.9, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.16, 0.16, 0.32, 8]} />
                <meshStandardMaterial color="#10b981" />
              </mesh>
              {/* Forearm Segment */}
              <mesh position={[0, 0.45, 0]} castShadow>
                <boxGeometry args={[0.18, 0.8, 0.18]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>

              {/* Wrist & End Effector Gripper */}
              <group ref={armWristRef} position={[0, 0.85, 0]}>
                <mesh>
                  <sphereGeometry args={[0.12, 8, 8]} />
                  <meshStandardMaterial color="#f59e0b" />
                </mesh>
                {/* Dual Pneumatic Gripper Claws */}
                <mesh position={[-0.1, 0.16, 0]}>
                  <boxGeometry args={[0.04, 0.2, 0.08]} />
                  <meshStandardMaterial color="#38bdf8" />
                </mesh>
                <mesh position={[0.1, 0.16, 0]}>
                  <boxGeometry args={[0.04, 0.2, 0.08]} />
                  <meshStandardMaterial color="#38bdf8" />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* CNC Machine Enclosure on the Right */}
      <group position={[5.5, 0, 0]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[2.8, 2.8, 2.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* CNC Acrylic Window with Glowing Internal Work Area */}
        <mesh position={[0, 1.5, 1.32]}>
          <planeGeometry args={[1.8, 1.4]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.65} />
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
