import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { ExhibitStationInfo } from '../../types/game';

interface ProjectTVStationProps {
  station: ExhibitStationInfo;
  isNearby: boolean;
  onInteract: (station: ExhibitStationInfo) => void;
}

export const ProjectTVStation: React.FC<ProjectTVStationProps> = ({ station, isNearby, onInteract }) => {
  const proximityRingRef = useRef<THREE.Mesh>(null);
  const screenScanRef = useRef<THREE.Mesh>(null);

  // Load project screen texture
  const texture = useTexture(station.thumbnailUrl);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (proximityRingRef.current) {
      proximityRingRef.current.rotation.z = t * 0.8;
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.05;
      proximityRingRef.current.scale.set(pulse, pulse, pulse);
    }
    if (screenScanRef.current) {
      screenScanRef.current.position.y = 1.9 + Math.sin(t * 2.5) * 0.7;
    }
  });

  return (
    <group
      position={station.position}
      rotation={station.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onInteract(station);
      }}
    >
      {/* Station Hexagonal Platform Base */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.4, 0.16, 6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Interactive Proximity Ring on Ground */}
      <mesh ref={proximityRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.17, 0]}>
        <ringGeometry args={[1.7, 1.88, 32]} />
        <meshBasicMaterial
          color={station.accentColor}
          transparent
          opacity={isNearby ? 0.95 : 0.4}
        />
      </mesh>

      {/* Pedestal Stand */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.9, 1.5, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.25} metalness={0.6} />
      </mesh>
      {/* Front Accent Neon Strip */}
      <mesh position={[0, 0.9, 0.26]}>
        <boxGeometry args={[0.06, 1.3, 0.02]} />
        <meshBasicMaterial color={station.accentColor} />
      </mesh>

      {/* Operator Keyboard Console Shelf */}
      <mesh position={[0, 0.95, 0.4]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[1.1, 0.08, 0.45]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.97, 0.4]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.9, 0.02, 0.32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Large Wide-Screen TV Monitor Display Chassis */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <boxGeometry args={[3.2, 1.9, 0.16]} />
        <meshStandardMaterial color="#0b1320" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* TV Screen Display with Project Texture */}
      <mesh position={[0, 2.3, 0.085]}>
        <planeGeometry args={[3.04, 1.74]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Scanning Laser Line Across TV */}
      <mesh ref={screenScanRef} position={[0, 2.3, 0.09]}>
        <planeGeometry args={[3.04, 0.04]} />
        <meshBasicMaterial color={station.accentColor} transparent opacity={0.6} />
      </mesh>

      {/* Screen Glowing Frame Bezel */}
      <mesh position={[0, 2.3, 0.084]}>
        <boxGeometry args={[3.12, 1.82, 0.01]} />
        <meshBasicMaterial color={station.accentColor} wireframe />
      </mesh>

      {/* Floating Overhead Badge and Title */}
      <group position={[0, 3.55, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.6, 0.42]} />
          <meshBasicMaterial color="#020617" transparent opacity={0.85} />
        </mesh>
        <Text
          position={[0, 0.02, 0.02]}
          fontSize={0.16}
          color={station.accentColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {`[ ${station.badgeText} ]`}
        </Text>
      </group>

      {/* Nearby Interactive Prompt */}
      {isNearby && (
        <group position={[0, 1.25, 0.9]}>
          <mesh>
            <planeGeometry args={[2.5, 0.44]} />
            <meshBasicMaterial color="#020617" transparent opacity={0.92} />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {`⚡ WATCH PROJECT TV [E / TAP]`}
          </Text>
        </group>
      )}

      {/* Screen Ambient Glow Light */}
      <pointLight
        position={[0, 2.3, 1.2]}
        color={station.accentColor}
        intensity={isNearby ? 4.5 : 2.5}
        distance={6.5}
      />
    </group>
  );
};
