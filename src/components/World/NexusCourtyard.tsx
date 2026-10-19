import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GatewayDoor } from './GatewayDoor';
import { NEXUS_DOORS } from '../../data/worldData';
import type { DoorPortalInfo, RoomId } from '../../types/game';

interface NexusCourtyardProps {
  nearestDoor: DoorPortalInfo | null;
  onEnterDoor: (targetRoomId: RoomId) => void;
}

// Low-poly stylized pine tree
const LowPolyPineTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0
}) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.22, 1.5, 6]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      {/* Tier 1 Foliage (Dark Green) */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <coneGeometry args={[1.3, 1.4, 6]} />
        <meshStandardMaterial color="#15803d" roughness={0.7} />
      </mesh>
      {/* Tier 2 Foliage (Medium Green) */}
      <mesh position={[0, 2.4, 0]} castShadow>
        <coneGeometry args={[1.05, 1.3, 6]} />
        <meshStandardMaterial color="#16a34a" roughness={0.7} />
      </mesh>
      {/* Tier 3 Foliage (Lighter Peak) */}
      <mesh position={[0, 3.1, 0]} castShadow>
        <coneGeometry args={[0.75, 1.1, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.7} />
      </mesh>
    </group>
  );
};

// Low-poly round canopy oak tree
const LowPolyRoundTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({
  position,
  scale = 1.0
}) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.25, 1.8, 6]} />
        <meshStandardMaterial color="#5c3818" roughness={0.9} />
      </mesh>
      {/* Main Canopy */}
      <mesh position={[0, 2.4, 0]} castShadow>
        <dodecahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial color="#16a34a" roughness={0.65} />
      </mesh>
      {/* Secondary Canopy Cluster */}
      <mesh position={[0.4, 2.8, 0.3]} castShadow>
        <dodecahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color="#22c55e" roughness={0.65} />
      </mesh>
      <mesh position={[-0.4, 2.6, -0.2]} castShadow>
        <dodecahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#15803d" roughness={0.65} />
      </mesh>
    </group>
  );
};

// Low-poly planter with flowers/succulents
const LowPolyPlanter: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({
  position,
  rotation = [0, 0, 0]
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Ceramic Pot */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.3, 0.56, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} />
      </mesh>
      {/* Top Gold Rim */}
      <mesh position={[0, 0.56, 0]}>
        <torusGeometry args={[0.43, 0.03, 8, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.39, 0.39, 0.06, 8]} />
        <meshStandardMaterial color="#3f2e18" roughness={0.9} />
      </mesh>
      {/* Succulents & Flowers */}
      <mesh position={[0, 0.65, 0]}>
        <dodecahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color="#10b981" roughness={0.5} />
      </mesh>
      <mesh position={[0.12, 0.72, 0.08]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.1, 0.7, -0.06]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};

export const NexusCourtyard: React.FC<NexusCourtyardProps> = ({ nearestDoor, onEnterDoor }) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.3;
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.75 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group>
      {/* ============================================================ */}
      {/* 1. SOFT, PLEASANT, BALANCED LIGHTING RIG (NOT OVERLY BRIGHT) */}
      {/* ============================================================ */}
      <ambientLight intensity={0.68} color="#f8fafc" />

      {/* Gentle Warm Sun (Soft Shadows, Pleasant Contrast) */}
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

      {/* Soft Sky / Meadow Ground Bounce */}
      <hemisphereLight args={['#93c5fd', '#86efac', 0.65]} />

      {/* Soft Courtyard Central Point Light */}
      <pointLight position={[0, 4.0, 0]} color="#38bdf8" intensity={2.0} distance={15} />

      {/* ============================================================ */}
      {/* 2. GROUND PLANES, NATURAL STONE PAVING, & GRASS SURROUNDS    */}
      {/* ============================================================ */}
      {/* Outer Lush Grass Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#4ade80" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Inner Natural Stone Courtyard Terrace */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[15.8, 36]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Concentric Garden Stone Paver Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[11.2, 11.8, 36]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>

      {/* Outer Cyan Boundary Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[15.2, 15.6, 36]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
      </mesh>

      {/* Central Reflection Pond with Water & Gold Rim */}
      <group position={[0, 0, 0]}>
        {/* Pond Basin */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <circleGeometry args={[3.2, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.7} />
        </mesh>
        {/* Transparent Shimmering Water Layer */}
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
          <circleGeometry args={[3.15, 32]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.75}
            roughness={0.05}
            metalness={0.4}
          />
        </mesh>
        {/* Golden Pond Rim */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <ringGeometry args={[3.1, 3.35, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Central Floating Holographic Spire & Orbital Rings */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={2.5} />
        </mesh>
        <mesh ref={ring1Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.2, 0.035, 8, 32]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.65, 0.03, 8, 32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 3. LUSH LOW-POLY GREENERY: TREES, HEDGES & PLANTERS          */}
      {/* ============================================================ */}
      {/* Stylized Pine Trees around Courtyard Quadrants */}
      <LowPolyPineTree position={[6.5, 0, 6.5]} scale={1.15} />
      <LowPolyPineTree position={[-6.5, 0, 6.5]} scale={1.05} />
      <LowPolyPineTree position={[6.5, 0, -6.5]} scale={1.1} />
      <LowPolyPineTree position={[-6.5, 0, -6.5]} scale={1.2} />
      <LowPolyPineTree position={[13.5, 0, 9.5]} scale={1.3} />
      <LowPolyPineTree position={[-13.5, 0, 9.5]} scale={1.25} />
      <LowPolyPineTree position={[9.5, 0, -13.5]} scale={1.35} />

      {/* Stylized Round Oak Trees */}
      <LowPolyRoundTree position={[9.5, 0, 7.5]} scale={1.1} />
      <LowPolyRoundTree position={[-9.5, 0, 7.5]} scale={1.15} />
      <LowPolyRoundTree position={[-8.5, 0, -9.5]} scale={1.05} />
      <LowPolyRoundTree position={[12.5, 0, -7.5]} scale={1.2} />

      {/* Low-Poly Flower & Succulent Planters around Pond */}
      <LowPolyPlanter position={[2.6, 0, 2.6]} />
      <LowPolyPlanter position={[-2.6, 0, 2.6]} />
      <LowPolyPlanter position={[2.6, 0, -2.6]} />
      <LowPolyPlanter position={[-2.6, 0, -2.6]} />
      <LowPolyPlanter position={[0, 0, 3.8]} />
      <LowPolyPlanter position={[0, 0, -3.8]} />
      <LowPolyPlanter position={[3.8, 0, 0]} />
      <LowPolyPlanter position={[-3.8, 0, 0]} />

      {/* ============================================================ */}
      {/* 4. THE 5 INTERACTIVE GATEWAY DOORS TO SECTORS                */}
      {/* ============================================================ */}
      {NEXUS_DOORS.map((door: DoorPortalInfo) => (
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
