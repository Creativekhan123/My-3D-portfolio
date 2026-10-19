import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, ROOM_EXIT_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface GameStudioRoomProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const GameStudioRoom: React.FC<GameStudioRoomProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  const station = EXHIBIT_STATIONS.find((s) => s.id === 'station-unreal') || EXHIBIT_STATIONS[0];

  const crystalRef1 = useRef<THREE.Mesh>(null);
  const crystalRef2 = useRef<THREE.Mesh>(null);
  const swordGlowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (crystalRef1.current) {
      crystalRef1.current.rotation.y = t * 0.8;
      crystalRef1.current.position.y = 2.4 + Math.sin(t * 2.0) * 0.18;
    }
    if (crystalRef2.current) {
      crystalRef2.current.rotation.y = -t * 0.7;
      crystalRef2.current.position.y = 2.4 + Math.sin(t * 2.0 + 1.5) * 0.18;
    }
    if (swordGlowRef.current) {
      const mat = swordGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 + Math.sin(t * 4.0) * 0.3;
    }
  });

  return (
    <group>
      {/* Dramatic Game Dev Atmosphere: Violet Ambiance & Warm Amber Firelight */}
      <ambientLight intensity={0.55} color="#581c87" />
      <directionalLight position={[8, 16, 10]} intensity={1.1} color="#fef08a" castShadow />
      <pointLight position={[0, 4.5, -3]} color="#f97316" intensity={4.0} distance={16} />
      <pointLight position={[-6, 3, 0]} color="#a855f7" intensity={3.5} distance={12} />
      <pointLight position={[6, 3, 0]} color="#a855f7" intensity={3.5} distance={12} />

      {/* Dark Stone Combat Arena Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#090d16" roughness={0.7} />
      </mesh>

      {/* Glowing Combat Rune Ring on Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4.2, 4.45, 32]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[6.5, 6.7, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      {/* Arena Stone Pillars */}
      {[-6.5, 6.5].map((x, i) => (
        <React.Fragment key={i}>
          {[-4, 2].map((z, j) => (
            <group key={j} position={[x, 0, z]}>
              <mesh position={[0, 2.5, 0]} castShadow>
                <cylinderGeometry args={[0.55, 0.65, 5, 8]} />
                <meshStandardMaterial color="#1e293b" roughness={0.8} />
              </mesh>
              {/* Torch Light Bowl */}
              <mesh position={[0, 5.1, 0]}>
                <cylinderGeometry args={[0.6, 0.35, 0.3, 8]} />
                <meshStandardMaterial color="#0f172a" />
              </mesh>
              <mesh position={[0, 5.3, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial color="#f97316" />
              </mesh>
            </group>
          ))}
        </React.Fragment>
      ))}

      {/* ============================================================ */}
      {/* 1. FLOATING GLOWING POWER CRYSTALS                           */}
      {/* ============================================================ */}
      <group position={[-5, 0, -2]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 1.4, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        <mesh ref={crystalRef1} position={[0, 2.4, 0]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={2.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      <group position={[5, 0, -2]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 1.4, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        <mesh ref={crystalRef2} position={[0, 2.4, 0]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={2.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. LEGENDARY ENERGY SWORD IN PEDESTAL                        */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Stone Pedestal */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.2, 0.7, 1.2]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Sword Blade */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[0.08, 1.4, 0.03]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2.2} />
        </mesh>
        <mesh ref={swordGlowRef} position={[0, 1.4, 0]}>
          <boxGeometry args={[0.16, 1.45, 0.06]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
        </mesh>
        {/* Sword Crossguard */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.35, 0.06, 0.08]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
        {/* Sword Hilt */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
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
