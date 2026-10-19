import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { ExhibitStationInfo } from '../../types/game';

interface ExhibitStationProps {
  station: ExhibitStationInfo;
  isNear: boolean;
  onInteract: () => void;
}

// Display screen with real project screenshot
const ExhibitScreen: React.FC<{
  imageUrl: string;
  accentColor: string;
}> = ({ imageUrl, accentColor }) => {
  const texture = useTexture(imageUrl);

  return (
    <group position={[0, 2.7, 0]}>
      {/* Sleek Beveled Frame */}
      <mesh castShadow>
        <boxGeometry args={[3.2, 1.9, 0.12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Screen Trim Accent */}
      <mesh position={[0, -0.98, 0.05]}>
        <boxGeometry args={[3.1, 0.06, 0.04]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>

      {/* Display Plane with Crisp Screenshot */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[3.0, 1.7]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Top Banner Tag */}
      <group position={[0, 1.08, 0.05]}>
        <mesh>
          <boxGeometry args={[2.2, 0.22, 0.04]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>
    </group>
  );
};

// Unique 3D Low-Poly Animated Hologram / Props for each station
const ExhibitProp: React.FC<{ stationId: string; accentColor: string; isNear: boolean }> = ({
  stationId,
  accentColor,
  isNear
}) => {
  const propGroupRef = useRef<THREE.Group>(null);
  const miniRoverRef = useRef<THREE.Group>(null);
  const armJ1Ref = useRef<THREE.Group>(null);
  const armJ2Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (propGroupRef.current) {
      // Gentle floating bob
      propGroupRef.current.position.y = 1.35 + Math.sin(t * 1.8) * 0.08;
      propGroupRef.current.rotation.y = t * 0.45;
    }

    // Mini Micromouse animation inside maze arena
    if (miniRoverRef.current) {
      const radius = 0.55;
      miniRoverRef.current.position.x = Math.cos(t * 1.5) * radius;
      miniRoverRef.current.position.z = Math.sin(t * 1.5) * radius;
      miniRoverRef.current.rotation.y = -t * 1.5 + Math.PI / 2;
    }

    // Robotic arm kinematic articulation
    if (armJ1Ref.current) {
      armJ1Ref.current.rotation.y = Math.sin(t * 0.8) * 0.7;
    }
    if (armJ2Ref.current) {
      armJ2Ref.current.rotation.z = Math.sin(t * 1.2) * 0.4 + 0.3;
    }
  });

  if (stationId === 'station-unreal') {
    // Game Studio: Holographic combat energy blade & shield crest
    return (
      <group ref={propGroupRef} position={[0, 1.35, 0]}>
        <mesh>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isNear ? 2.5 : 1.2}
            wireframe
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.55, 0.025, 8, 24]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
        </mesh>
      </group>
    );
  }

  if (stationId === 'station-micromouse') {
    // Robotics Lab: 3D Miniature Maze Arena with navigating micro-rover
    return (
      <group position={[0, 0.95, 0]}>
        {/* Maze Base Floor */}
        <mesh receiveShadow>
          <boxGeometry args={[1.6, 0.06, 1.6]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} />
        </mesh>
        {/* Low-Poly Maze Outer Walls */}
        <mesh position={[0, 0.12, 0.78]}>
          <boxGeometry args={[1.6, 0.18, 0.04]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, 0.12, -0.78]}>
          <boxGeometry args={[1.6, 0.18, 0.04]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0.78, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.18, 1.6]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[-0.78, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.18, 1.6]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        {/* Inner Maze Posts */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.18, 0.7]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0.35, 0.12, -0.35]}>
          <boxGeometry args={[0.7, 0.18, 0.04]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        {/* Tiny Autonomous Micromouse */}
        <group ref={miniRoverRef} position={[0, 0.08, 0]}>
          <mesh>
            <boxGeometry args={[0.16, 0.08, 0.22]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.05, -0.1]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3} />
          </mesh>
        </group>
      </group>
    );
  }

  if (stationId === 'station-digital-twin') {
    // Twin Lab: Holographic Cyber-Physical Twin Simulation Orb
    return (
      <group ref={propGroupRef} position={[0, 1.35, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={isNear ? 2.2 : 1.0}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
        </mesh>
      </group>
    );
  }

  if (stationId === 'station-command-core') {
    // Command Deck & Architecture Core: Luminous command core with data rings
    return (
      <group ref={propGroupRef} position={[0, 1.35, 0]}>
        <mesh>
          <dodecahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color="#f43f5e"
            emissive="#f43f5e"
            emissiveIntensity={isNear ? 2.6 : 1.2}
            wireframe
          />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.58, 0.02, 8, 24]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
        </mesh>
      </group>
    );
  }

  // Creator Studio: 6-DOF Articulated Robotic Manipulator
  return (
    <group position={[0, 0.88, 0]}>
      {/* Arm Base Turntable */}
      <mesh>
        <cylinderGeometry args={[0.32, 0.38, 0.14, 12]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      {/* Joint 1 Pivot */}
      <group ref={armJ1Ref} position={[0, 0.1, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.16, 0.28, 0.16]} />
          <meshStandardMaterial color="#10b981" metalness={0.6} />
        </mesh>
        {/* Joint 2 Arm Link */}
        <group ref={armJ2Ref} position={[0, 0.32, 0]}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
          {/* End Effector Gripper */}
          <mesh position={[0, 0.52, 0]}>
            <boxGeometry args={[0.18, 0.08, 0.12]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export const ExhibitStation: React.FC<ExhibitStationProps> = ({
  station,
  isNear,
  onInteract
}) => {
  const pulseRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (pulseRingRef.current) {
      const t = clock.getElapsedTime();
      if (isNear) {
        const scale = 1.0 + Math.sin(t * 4.5) * 0.06;
        pulseRingRef.current.scale.set(scale, scale, 1);
      } else {
        pulseRingRef.current.scale.set(1, 1, 1);
      }
    }
  });

  return (
    <group
      position={station.position}
      rotation={station.rotation}
      onClick={(e) => {
        if (isNear) {
          e.stopPropagation();
          onInteract();
        }
      }}
    >
      {/* Ground Proximity Interaction Ring */}
      <mesh
        ref={pulseRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
      >
        <ringGeometry args={[station.interactionRadius * 0.85, station.interactionRadius, 36]} />
        <meshBasicMaterial
          color={station.accentColor}
          transparent
          opacity={isNear ? 0.65 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Low-Poly Beveled Pedestal */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.7, 0.88, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Pedestal Top Collar Ring */}
      <mesh position={[0, 0.89, 0]}>
        <cylinderGeometry args={[1.54, 1.54, 0.04, 8]} />
        <meshStandardMaterial
          color={station.accentColor}
          emissive={station.accentColor}
          emissiveIntensity={isNear ? 1.5 : 0.6}
        />
      </mesh>

      {/* Interactive 3D Prop / Hologram */}
      <ExhibitProp
        stationId={station.id}
        accentColor={station.accentColor}
        isNear={isNear}
      />

      {/* Crisp Mounted Project Showcase Display Screen */}
      <React.Suspense fallback={null}>
        <ExhibitScreen
          imageUrl={station.thumbnailUrl}
          accentColor={station.accentColor}
        />
      </React.Suspense>

      {/* Interaction Range Trigger Beam (vertical light column) */}
      {isNear && (
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 5.0, 6]} />
          <meshBasicMaterial color={station.accentColor} transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
};
