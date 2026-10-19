import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GatewayDoor } from './GatewayDoor';
import { PARK_DOORS } from '../../data/worldData';
import type { DoorPortalInfo, RoomId } from '../../types/game';

interface GreeneryParkHubProps {
  nearestDoor: DoorPortalInfo | null;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

// Low-poly stylized pine tree
const LowPolyPineTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0
}) => (
  <group position={position} scale={[scale, scale, scale]}>
    <mesh position={[0, 0.75, 0]} castShadow>
      <cylinderGeometry args={[0.16, 0.24, 1.5, 6]} />
      <meshStandardMaterial color="#78350f" roughness={0.9} />
    </mesh>
    <mesh position={[0, 1.6, 0]} castShadow>
      <coneGeometry args={[1.35, 1.4, 6]} />
      <meshStandardMaterial color="#15803d" roughness={0.7} />
    </mesh>
    <mesh position={[0, 2.45, 0]} castShadow>
      <coneGeometry args={[1.1, 1.3, 6]} />
      <meshStandardMaterial color="#16a34a" roughness={0.7} />
    </mesh>
    <mesh position={[0, 3.2, 0]} castShadow>
      <coneGeometry args={[0.8, 1.1, 6]} />
      <meshStandardMaterial color="#22c55e" roughness={0.7} />
    </mesh>
  </group>
);

// Low-poly deciduous park tree
const LowPolyParkTree: React.FC<{
  position: [number, number, number];
  scale?: number;
  color?: string;
}> = ({ position, scale = 1.0, color = '#16a34a' }) => (
  <group position={position} scale={[scale, scale, scale]}>
    <mesh position={[0, 0.9, 0]} castShadow>
      <cylinderGeometry args={[0.18, 0.26, 1.8, 6]} />
      <meshStandardMaterial color="#5c3818" roughness={0.9} />
    </mesh>
    <mesh position={[0, 2.4, 0]} castShadow>
      <dodecahedronGeometry args={[1.3, 1]} />
      <meshStandardMaterial color={color} roughness={0.65} />
    </mesh>
    <mesh position={[0.45, 2.8, 0.3]} castShadow>
      <dodecahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial color="#22c55e" roughness={0.65} />
    </mesh>
    <mesh position={[-0.45, 2.6, -0.2]} castShadow>
      <dodecahedronGeometry args={[0.85, 1]} />
      <meshStandardMaterial color="#15803d" roughness={0.65} />
    </mesh>
  </group>
);

// Low-poly flowering cherry blossom tree
const LowPolyCherryTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0
}) => (
  <group position={position} scale={[scale, scale, scale]}>
    <mesh position={[0, 0.9, 0]} castShadow>
      <cylinderGeometry args={[0.18, 0.25, 1.8, 6]} />
      <meshStandardMaterial color="#44281d" roughness={0.9} />
    </mesh>
    <mesh position={[0, 2.4, 0]} castShadow>
      <dodecahedronGeometry args={[1.35, 1]} />
      <meshStandardMaterial color="#f472b6" roughness={0.6} />
    </mesh>
    <mesh position={[0.4, 2.7, 0.3]} castShadow>
      <dodecahedronGeometry args={[0.95, 1]} />
      <meshStandardMaterial color="#fbcfe8" roughness={0.6} />
    </mesh>
  </group>
);

// Low-poly wooden park bench
const LowPolyParkBench: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => (
  <group position={position} rotation={rotation}>
    {/* Metal legs */}
    <mesh position={[-0.6, 0.25, 0]}>
      <boxGeometry args={[0.08, 0.5, 0.45]} />
      <meshStandardMaterial color="#1e293b" metalness={0.8} />
    </mesh>
    <mesh position={[0.6, 0.25, 0]}>
      <boxGeometry args={[0.08, 0.5, 0.45]} />
      <meshStandardMaterial color="#1e293b" metalness={0.8} />
    </mesh>
    {/* Wood seat planks */}
    <mesh position={[0, 0.45, 0]} castShadow>
      <boxGeometry args={[1.5, 0.06, 0.5]} />
      <meshStandardMaterial color="#92400e" roughness={0.8} />
    </mesh>
    {/* Wood backrest */}
    <mesh position={[0, 0.75, 0.22]} rotation={[-0.1, 0, 0]} castShadow>
      <boxGeometry args={[1.5, 0.35, 0.05]} />
      <meshStandardMaterial color="#92400e" roughness={0.8} />
    </mesh>
  </group>
);

// Low-poly park lamp post
const LowPolyParkLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1.5, 0]} castShadow>
      <cylinderGeometry args={[0.08, 0.12, 3.0, 8]} />
      <meshStandardMaterial color="#0f172a" metalness={0.7} />
    </mesh>
    <mesh position={[0, 3.1, 0]}>
      <cylinderGeometry args={[0.22, 0.14, 0.3, 8]} />
      <meshStandardMaterial color="#0f172a" />
    </mesh>
    <mesh position={[0, 3.0, 0]}>
      <sphereGeometry args={[0.14, 8, 8]} />
      <meshBasicMaterial color="#fef08a" />
    </mesh>
    <pointLight position={[0, 3.0, 0]} color="#fef08a" intensity={1.5} distance={7} />
  </group>
);

// Low-poly mountain peak for valley horizon
const LowPolyMountain: React.FC<{
  position: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}> = ({ position, scale = [1, 1, 1], color = '#475569' }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 8, 0]} castShadow>
      <coneGeometry args={[14, 18, 6]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
    {/* Snow or highlight cap */}
    <mesh position={[0, 14.5, 0]}>
      <coneGeometry args={[5.2, 6.5, 6]} />
      <meshStandardMaterial color="#f8fafc" roughness={0.7} flatShading />
    </mesh>
  </group>
);

// Low-poly garden rock/boulder
const LowPolyRock: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}> = ({ position, scale = 1.0, rotation = [0, 0, 0] }) => (
  <mesh position={position} scale={[scale, scale * 0.7, scale]} rotation={rotation} castShadow>
    <dodecahedronGeometry args={[0.5, 0]} />
    <meshStandardMaterial color="#64748b" roughness={0.85} flatShading />
  </mesh>
);

// Low-poly direction signpost
const LowPolyDirectionSign: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1.1, 0]} castShadow>
      <cylinderGeometry args={[0.08, 0.1, 2.2, 6]} />
      <meshStandardMaterial color="#78350f" roughness={0.9} />
    </mesh>
    {/* Left Arm -> Game Dev */}
    <mesh position={[-0.45, 1.8, 0]} rotation={[0, -Math.PI / 4, 0.04]} castShadow>
      <boxGeometry args={[0.85, 0.22, 0.06]} />
      <meshStandardMaterial color="#ea580c" roughness={0.7} />
    </mesh>
    {/* Center Arm -> Robotics */}
    <mesh position={[0, 1.45, -0.45]} rotation={[0, 0, 0]} castShadow>
      <boxGeometry args={[0.06, 0.22, 0.85]} />
      <meshStandardMaterial color="#0284c7" roughness={0.7} />
    </mesh>
    {/* Right Arm -> Twin Dev */}
    <mesh position={[0.45, 1.15, 0]} rotation={[0, Math.PI / 4, -0.04]} castShadow>
      <boxGeometry args={[0.85, 0.22, 0.06]} />
      <meshStandardMaterial color="#9333ea" roughness={0.7} />
    </mesh>
  </group>
);

export const GreeneryParkHub: React.FC<GreeneryParkHubProps> = ({ nearestDoor, onEnterDoor }) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const lilyGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.78 + Math.sin(t * 1.5) * 0.08;
    }
    if (lilyGroupRef.current) {
      lilyGroupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group>
      {/* ============================================================ */}
      {/* 1. SOFT, PLEASANT, NATURAL PARK SUNLIGHT                     */}
      {/* ============================================================ */}
      <ambientLight intensity={0.72} color="#f8fafc" />

      {/* Gentle Warm Sun */}
      <directionalLight
        position={[14, 24, 12]}
        intensity={1.15}
        color="#fef3c7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />

      {/* Soft Sky-to-Meadow Bounce */}
      <hemisphereLight args={['#93c5fd', '#86efac', 0.7]} />

      {/* ============================================================ */}
      {/* 2. PARK GROUNDS, WALKING TRAILS & SCENIC REFLECTION POND     */}
      {/* ============================================================ */}
      {/* Outer Lush Park Lawn Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <planeGeometry args={[95, 95]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>

      {/* Central Paved Park Plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[15.6, 36]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.65} />
      </mesh>

      {/* Stone Paving Border Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[15.2, 15.6, 36]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>

      {/* Flagstone Pathway Ribbons Radiating to the 3 Doors */}
      {/* Path to Game Dev Door (North-West) */}
      <mesh position={[-4.5, 0.022, -4.5]} rotation={[-Math.PI / 2, 0, -Math.PI / 4]}>
        <planeGeometry args={[2.4, 9.5]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>
      {/* Path to Robotics Door (North) */}
      <mesh position={[0, 0.022, -6.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 8.5]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>
      {/* Path to Twin Dev Door (North-East) */}
      <mesh position={[4.5, 0.022, -4.5]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[2.4, 9.5]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>

      {/* Central Scenic Pond with Water Lilies */}
      <group position={[0, 0, 0]}>
        {/* Pond Basin Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
          <circleGeometry args={[2.9, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.7} />
        </mesh>
        {/* Transparent Shimmering Water */}
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
          <circleGeometry args={[2.85, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.8}
            roughness={0.05}
            metalness={0.4}
          />
        </mesh>
        {/* Natural Stone Pond Rim */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <ringGeometry args={[2.8, 3.1, 32]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>

        {/* Floating Green Water Lilies */}
        <group ref={lilyGroupRef} position={[0, 0.05, 0]}>
          <mesh position={[0.9, 0, 0.7]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.3, 10]} />
            <meshStandardMaterial color="#16a34a" />
          </mesh>
          <mesh position={[-0.8, 0, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.35, 10]} />
            <meshStandardMaterial color="#16a34a" />
          </mesh>
          <mesh position={[0.7, 0, -0.9]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.26, 10]} />
            <meshStandardMaterial color="#16a34a" />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 3. LUSH PARK GREENERY: TREES, BENCHES, LAMPS & FLOWER BEDS  */}
      {/* ============================================================ */}
      {/* Stylized Pine Trees */}
      <LowPolyPineTree position={[-12.5, 0, 3.5]} scale={1.2} />
      <LowPolyPineTree position={[12.5, 0, 3.5]} scale={1.2} />
      <LowPolyPineTree position={[-13.5, 0, -5.5]} scale={1.3} />
      <LowPolyPineTree position={[13.5, 0, -5.5]} scale={1.3} />
      <LowPolyPineTree position={[0, 0, 13.5]} scale={1.25} />

      {/* Deciduous Green Shade Trees */}
      <LowPolyParkTree position={[-7.5, 0, 7.5]} scale={1.15} />
      <LowPolyParkTree position={[7.5, 0, 7.5]} scale={1.15} />
      <LowPolyParkTree position={[-13.5, 0, 10.5]} scale={1.1} />
      <LowPolyParkTree position={[13.5, 0, 10.5]} scale={1.1} />

      {/* Flowering Pink Cherry Blossom Trees */}
      <LowPolyCherryTree position={[-4.5, 0, 10.5]} scale={1.05} />
      <LowPolyCherryTree position={[4.5, 0, 10.5]} scale={1.05} />
      <LowPolyCherryTree position={[-10.5, 0, -12.5]} scale={1.1} />
      <LowPolyCherryTree position={[10.5, 0, -12.5]} scale={1.1} />

      {/* Park Benches for Visitors */}
      <LowPolyParkBench position={[-3.8, 0, 1.8]} rotation={[0, Math.PI / 3, 0]} />
      <LowPolyParkBench position={[3.8, 0, 1.8]} rotation={[0, -Math.PI / 3, 0]} />
      <LowPolyParkBench position={[0, 0, 8.5]} rotation={[0, Math.PI, 0]} />

      {/* Park Lamp Posts */}
      <LowPolyParkLamp position={[-5.8, 0, 4.8]} />
      <LowPolyParkLamp position={[5.8, 0, 4.8]} />
      <LowPolyParkLamp position={[-4.8, 0, -8.8]} />
      <LowPolyParkLamp position={[4.8, 0, -8.8]} />

      {/* Low-Poly Flower Beds (Surrounding Park) */}
      {[-8, -4, 4, 8].map((x, i) => (
        <group key={i} position={[x, 0.05, 5.8]}>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.6, 0.12, 0.6]} />
            <meshStandardMaterial color="#3f2e18" roughness={0.9} />
          </mesh>
          <mesh position={[-0.4, 0.18, 0]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
          <mesh position={[0.4, 0.18, 0]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}

      {/* Directional Navigation Guidepost */}
      <LowPolyDirectionSign position={[1.8, 0, 3.2]} />

      {/* Natural River Boulders Around Pond & Garden Beds */}
      <LowPolyRock position={[2.8, 0.1, 0.6]} scale={1.2} rotation={[0.2, 0.5, 0]} />
      <LowPolyRock position={[-2.7, 0.1, -0.7]} scale={1.1} rotation={[-0.1, 1.2, 0]} />
      <LowPolyRock position={[1.3, 0.1, -2.6]} scale={0.9} rotation={[0.3, -0.4, 0]} />
      <LowPolyRock position={[-1.4, 0.1, 2.5]} scale={1.0} rotation={[0, 0.8, -0.2]} />
      <LowPolyRock position={[0.3, 0.1, 3.1]} scale={0.8} rotation={[0.4, 0.2, 0]} />
      <LowPolyRock position={[-6.2, 0.1, 8.2]} scale={1.3} rotation={[0.1, 0.6, 0]} />
      <LowPolyRock position={[6.2, 0.1, 8.2]} scale={1.3} rotation={[-0.2, -0.5, 0]} />

      {/* Stepping Stones on Plaza Trails */}
      {[-2.2, -1.5, -0.8, 0.8, 1.5, 2.2].map((x, i) => (
        <mesh key={`step-${i}`} position={[x * 0.9, 0.025, 6.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.28, 7]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} flatShading />
        </mesh>
      ))}

      {/* ============================================================ */}
      {/* 4. LOW-POLY VALLEY MOUNTAIN HORIZON ENCLOSURE                */}
      {/* ============================================================ */}
      {/* Enclosing ring of majestic low-poly mountains to eliminate endless void */}
      <LowPolyMountain position={[-34, -1, -30]} scale={[1.2, 1.3, 1.2]} color="#334155" />
      <LowPolyMountain position={[0, -1, -44]} scale={[1.4, 1.5, 1.4]} color="#1e293b" />
      <LowPolyMountain position={[34, -1, -30]} scale={[1.2, 1.3, 1.2]} color="#334155" />
      <LowPolyMountain position={[-42, -1, 5]} scale={[1.1, 1.2, 1.1]} color="#475569" />
      <LowPolyMountain position={[42, -1, 5]} scale={[1.1, 1.2, 1.1]} color="#475569" />
      <LowPolyMountain position={[-28, -1, 34]} scale={[1.0, 1.1, 1.0]} color="#334155" />
      <LowPolyMountain position={[28, -1, 34]} scale={[1.0, 1.1, 1.0]} color="#334155" />
      <LowPolyMountain position={[0, -1, 40]} scale={[1.2, 1.25, 1.2]} color="#1e293b" />

      {/* ============================================================ */}
      {/* 5. THE 3 MANDATORY GATEWAY DOORS IN THE PARK                 */}
      {/* ============================================================ */}
      {PARK_DOORS.map((door) => (
        <GatewayDoor
          key={door.id}
          door={door}
          isNearby={nearestDoor?.id === door.id}
          onEnter={onEnterDoor}
        />
      ))}
    </group>
  );
};
