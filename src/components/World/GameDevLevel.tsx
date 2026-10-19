import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectTVStation } from './ProjectTVStation';
import { GatewayDoor } from './GatewayDoor';
import { EXHIBIT_STATIONS, RETURN_TO_PARK_DOOR } from '../../data/worldData';
import type { ExhibitStationInfo, DoorPortalInfo, RoomId } from '../../types/game';

interface GameDevLevelProps {
  nearestExhibit: ExhibitStationInfo | null;
  nearestDoor: DoorPortalInfo | null;
  onInteractStation: (station: ExhibitStationInfo) => void;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

export const GameDevLevel: React.FC<GameDevLevelProps> = ({
  nearestExhibit,
  nearestDoor,
  onInteractStation,
  onEnterDoor
}) => {
  // 4 Game Dev LED TV Stations
  const gameStations = EXHIBIT_STATIONS.filter((s) => s.sectorId === 'game-dev');

  const crystalRef1 = useRef<THREE.Mesh>(null);
  const crystalRef2 = useRef<THREE.Mesh>(null);
  const swordRef = useRef<THREE.Mesh>(null);

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
    if (swordRef.current) {
      swordRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group>
      {/* Dramatic Game Dev Atmosphere: Violet Ambiance & Warm Firelight */}
      <ambientLight intensity={0.6} color="#581c87" />
      <directionalLight position={[8, 16, 10]} intensity={1.1} color="#fef08a" castShadow />
      <pointLight position={[0, 4.5, -2]} color="#f97316" intensity={4.0} distance={18} />
      <pointLight position={[-6, 3, 0]} color="#a855f7" intensity={3.5} distance={14} />
      <pointLight position={[6, 3, 0]} color="#a855f7" intensity={3.5} distance={14} />

      {/* Dark Stone Combat Arena Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#090d16" roughness={0.7} />
      </mesh>

      {/* Glowing Combat Rune Rings on Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[4.2, 4.45, 32]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[7.2, 7.45, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      {/* Colosseum Stone Pillars with Torch Flames */}
      {[-7.5, 7.5].map((x, i) => (
        <React.Fragment key={i}>
          {[-5, 2].map((z, j) => (
            <group key={j} position={[x, 0, z]}>
              <mesh position={[0, 2.5, 0]} castShadow>
                <cylinderGeometry args={[0.55, 0.65, 5, 8]} />
                <meshStandardMaterial color="#1e293b" roughness={0.8} />
              </mesh>
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

      {/* Floating Glowing Power Crystals */}
      <group position={[-5.5, 0, 1]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 1.4, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        <mesh ref={crystalRef1} position={[0, 2.4, 0]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2.8} />
        </mesh>
      </group>

      <group position={[5.5, 0, 1]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 1.4, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        <mesh ref={crystalRef2} position={[0, 2.4, 0]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2.8} />
        </mesh>
      </group>

      {/* Central Rotating Legendary Sword in Stone */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.3, 0.7, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        <group ref={swordRef} position={[0, 1.3, 0]}>
          <mesh>
            <boxGeometry args={[0.08, 1.2, 0.03]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[0.3, 0.06, 0.08]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* THE 4 GAME DEV LED TV PROJECT STATIONS                       */}
      {/* ============================================================ */}
      {gameStations.map((station) => (
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
