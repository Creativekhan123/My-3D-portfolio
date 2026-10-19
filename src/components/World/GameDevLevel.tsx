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
      <ambientLight intensity={0.88} color="#7c3aed" />
      <directionalLight position={[10, 20, 10]} intensity={1.35} color="#fef08a" castShadow />
      <pointLight position={[0, 5.5, -2]} color="#f97316" intensity={4.5} distance={22} />
      <pointLight position={[-6, 4, 0]} color="#c084fc" intensity={3.8} distance={16} />
      <pointLight position={[6, 4, 0]} color="#c084fc" intensity={3.8} distance={16} />

      {/* Stylized Stone Combat Arena Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#1e2433" roughness={0.65} />
      </mesh>
      {/* Outer Arena Circular Flagstone Paver Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[9.5, 12.8, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
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

      {/* ============================================================ */}
      {/* 1. COLOSSEUM AMPHITHEATER WALLS & ARCHITECTURAL ENCLOSURE    */}
      {/* ============================================================ */}
      {/* Back Wall (North) */}
      <mesh position={[0, 3.5, -13.5]} receiveShadow>
        <boxGeometry args={[27, 7, 1.0]} />
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
      </mesh>
      {/* Left Wall (West) */}
      <mesh position={[-13.5, 3.5, 0]} receiveShadow>
        <boxGeometry args={[1.0, 7, 27]} />
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
      </mesh>
      {/* Right Wall (East) */}
      <mesh position={[13.5, 3.5, 0]} receiveShadow>
        <boxGeometry args={[1.0, 7, 27]} />
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
      </mesh>
      {/* South Wall (Framing Exit Door) */}
      <mesh position={[-7.5, 3.5, 13.5]} receiveShadow>
        <boxGeometry args={[12, 7, 1.0]} />
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
      </mesh>
      <mesh position={[7.5, 3.5, 13.5]} receiveShadow>
        <boxGeometry args={[12, 7, 1.0]} />
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
      </mesh>

      {/* Stepped Arena Seating Tiers along Back and Side Walls */}
      <mesh position={[0, 0.45, -12.5]}>
        <boxGeometry args={[25, 0.9, 1.2]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.1, -13.1]}>
        <boxGeometry args={[25, 1.3, 0.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Wall Crenellation Battlements along Top */}
      {[-10, -6, -2, 2, 6, 10].map((x, i) => (
        <mesh key={`cren-${i}`} position={[x, 7.3, -13.5]}>
          <boxGeometry args={[1.6, 0.8, 1.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      ))}

      {/* Hanging Crimson & Gold Heraldic Banners */}
      {[-8, 8].map((x, i) => (
        <group key={`banner-${i}`} position={[x, 4.2, -12.95]}>
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <planeGeometry args={[1.4, 2.0]} />
            <meshStandardMaterial color="#991b1b" roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.4, 0.01]}>
            <ringGeometry args={[0.2, 0.35, 6]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}

      {/* Environmental Storytelling Prop: Open Treasure Chest */}
      <group position={[-9.5, 0, 5.0]} rotation={[0, Math.PI / 4, 0]}>
        {/* Chest Base */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.2, 0.6, 0.75]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        {/* Gold Trim */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.24, 0.1, 0.79]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} />
        </mesh>
        {/* Glowing Treasure Inside */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[0.9, 0.2, 0.55]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* Environmental Storytelling Prop: Low-Poly Weapon Rack */}
      <group position={[9.5, 0, 5.0]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Wooden Frame */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[1.4, 1.8, 0.2]} />
          <meshStandardMaterial color="#451a03" roughness={0.85} />
        </mesh>
        {/* Crystalline Broadsword 1 */}
        <mesh position={[-0.35, 0.9, 0.12]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.08, 1.4, 0.02]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2.0} />
        </mesh>
        {/* Crystalline Broadsword 2 */}
        <mesh position={[0.35, 0.9, 0.12]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.08, 1.4, 0.02]} />
          <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={2.0} />
        </mesh>
        {/* Knightly Buckler Shield */}
        <mesh position={[0, 0.9, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.06, 8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      </group>

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
