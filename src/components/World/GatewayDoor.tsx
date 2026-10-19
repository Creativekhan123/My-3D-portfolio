import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { DoorPortalInfo } from '../../types/game';

interface GatewayDoorProps {
  door: DoorPortalInfo;
  isNearby: boolean;
  onEnter: (targetRoomId: DoorPortalInfo['targetRoomId']) => void;
}

export const GatewayDoor: React.FC<GatewayDoorProps> = ({ door, isNearby, onEnter }) => {
  const portalGlowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (portalGlowRef.current) {
      const mat = portalGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.45 + Math.sin(t * 3.0) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8;
      const s = 1.0 + Math.sin(t * 2.5) * 0.05;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group
      position={door.position}
      rotation={door.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onEnter(door.targetRoomId);
      }}
    >
      {/* Door Platform Base */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.12, 1.4]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Proximity Glowing Floor Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0.2]}>
        <ringGeometry args={[1.1, 1.25, 24]} />
        <meshBasicMaterial
          color={door.color}
          transparent
          opacity={isNearby ? 0.95 : 0.4}
        />
      </mesh>

      {/* Side Pillars */}
      {/* Left Pillar */}
      <mesh position={[-1.3, 1.8, 0]} castShadow>
        <boxGeometry args={[0.35, 3.6, 0.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.3} />
      </mesh>
      {/* Left Pillar Neon Accent */}
      <mesh position={[-1.12, 1.8, 0.21]}>
        <boxGeometry args={[0.04, 3.2, 0.02]} />
        <meshBasicMaterial color={door.color} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[1.3, 1.8, 0]} castShadow>
        <boxGeometry args={[0.35, 3.6, 0.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.3} />
      </mesh>
      {/* Right Pillar Neon Accent */}
      <mesh position={[1.12, 1.8, 0.21]}>
        <boxGeometry args={[0.04, 3.2, 0.02]} />
        <meshBasicMaterial color={door.color} />
      </mesh>

      {/* Top Lintel Arch */}
      <mesh position={[0, 3.65, 0]} castShadow>
        <boxGeometry args={[3.1, 0.45, 0.45]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Door Overhead Sign Plate */}
      <mesh position={[0, 4.05, 0.05]}>
        <boxGeometry args={[2.5, 0.4, 0.12]} />
        <meshStandardMaterial color="#020617" roughness={0.2} />
      </mesh>

      {/* 3D Label & Sector Badge on Archway */}
      <Text
        position={[0, 4.14, 0.14]}
        fontSize={0.16}
        color={door.color}
        anchorX="center"
        anchorY="middle"
      >
        {`[ ${door.badge} // ${door.label.toUpperCase()} ]`}
      </Text>

      <Text
        position={[0, 3.96, 0.14]}
        fontSize={0.11}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {door.sublabel}
      </Text>

      {/* Holographic / Energetic Portal Opening Curtain */}
      <mesh ref={portalGlowRef} position={[0, 1.75, 0]}>
        <planeGeometry args={[2.2, 3.3]} />
        <meshBasicMaterial
          color={door.color}
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle Inner Frame Light */}
      <pointLight
        position={[0, 2.0, 0.4]}
        color={door.color}
        intensity={isNearby ? 2.5 : 1.2}
        distance={4.5}
      />

      {/* Overhead "ENTER [E]" 3D Prompt when Nearby */}
      {isNearby && (
        <group position={[0, 2.2, 0.6]}>
          <mesh>
            <planeGeometry args={[1.8, 0.42]} />
            <meshBasicMaterial color="#020617" transparent opacity={0.88} />
          </mesh>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.14}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {`🚪 ENTER [E / TAP]`}
          </Text>
        </group>
      )}
    </group>
  );
};
