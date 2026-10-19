import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { InputState } from '../../types/game';

interface ThirdPersonCameraProps {
  avatarPosition: [number, number, number];
  inputRef: React.MutableRefObject<InputState>;
  onCameraYawUpdate: (yaw: number) => void;
  reducedMotion?: boolean;
}

export const ThirdPersonCamera: React.FC<ThirdPersonCameraProps> = ({
  avatarPosition,
  inputRef,
  onCameraYawUpdate,
  reducedMotion = false
}) => {
  const { camera } = useThree();

  const camState = useRef({
    yaw: 0,
    pitch: 0.35, // default viewing pitch
    distance: 6.8,
    targetLookAt: new THREE.Vector3(0, 0.8, 0),
    currentLookAt: new THREE.Vector3(0, 0.8, 0),
    currentCamPos: new THREE.Vector3(0, 4, 6)
  });

  // Wheel zoom handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't zoom if cursor is inside a modal or scrollable panel
      const target = e.target as HTMLElement;
      if (target?.closest?.('.modal-backdrop, .scrollable-panel, .direct-portfolio-modal')) {
        return;
      }
      const zoomDelta = e.deltaY * 0.003;
      camState.current.distance = THREE.MathUtils.clamp(
        camState.current.distance + zoomDelta,
        3.5,
        11.0
      );
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const s = camState.current;
    const input = inputRef.current;

    // Apply accumulated camera orbit delta from mouse/touch pad
    if (input.cameraDelta.yaw !== 0 || input.cameraDelta.pitch !== 0) {
      s.yaw -= input.cameraDelta.yaw;
      s.pitch += input.cameraDelta.pitch;

      // Clamp pitch so camera cannot flip upside down
      s.pitch = THREE.MathUtils.clamp(s.pitch, -0.05, 1.15);

      // Consume delta
      input.cameraDelta.yaw = 0;
      input.cameraDelta.pitch = 0;

      onCameraYawUpdate(s.yaw);
    }

    // Desired camera offset calculated from spherical coordinates
    const horizontalDist = s.distance * Math.cos(s.pitch);
    const verticalDist = s.distance * Math.sin(s.pitch) + 1.25;

    const offsetX = Math.sin(s.yaw) * horizontalDist;
    const offsetZ = Math.cos(s.yaw) * horizontalDist;

    const targetPos = new THREE.Vector3(
      avatarPosition[0] + offsetX,
      avatarPosition[1] + verticalDist,
      avatarPosition[2] + offsetZ
    );

    s.targetLookAt.set(
      avatarPosition[0],
      avatarPosition[1] + 1.25,
      avatarPosition[2]
    );

    // Smooth lerp camera position and look target
    const lerpSpeed = reducedMotion ? 12.0 : 8.0;
    const factor = 1.0 - Math.exp(-lerpSpeed * dt);

    s.currentCamPos.lerp(targetPos, factor);
    s.currentLookAt.lerp(s.targetLookAt, factor);

    camera.position.copy(s.currentCamPos);
    camera.lookAt(s.currentLookAt);
  });

  return null;
};
