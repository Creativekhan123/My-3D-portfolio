import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WORLD_OBSTACLES } from '../../data/worldData';
import type { InputState, ExhibitStationInfo, AvatarType } from '../../types/game';

interface RoboticExplorerProps {
  inputRef: React.MutableRefObject<InputState>;
  cameraAngle: number;
  onPositionUpdate: (pos: [number, number, number], rot: number, speed: number) => void;
  nearestExhibit: ExhibitStationInfo | null;
  reducedMotion?: boolean;
  avatarType?: AvatarType;
  spawnPosition?: [number, number, number];
  activeRoom?: string;
}

export const RoboticExplorer: React.FC<RoboticExplorerProps> = ({
  inputRef,
  cameraAngle,
  onPositionUpdate,
  nearestExhibit,
  reducedMotion = false,
  avatarType = 'character',
  spawnPosition = [0, 0, 4.2],
  activeRoom = 'park'
}) => {
  // References for avatar transforms and articulated limbs
  const rootGroupRef = useRef<THREE.Group>(null);
  const torsoGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const antennaTipRef = useRef<THREE.Mesh>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);

  // Arm joint refs (Cartoon Robot)
  const leftArmGroupRef = useRef<THREE.Group>(null);
  const rightArmGroupRef = useRef<THREE.Group>(null);

  // Leg joint refs (Cartoon Robot)
  const leftLegGroupRef = useRef<THREE.Group>(null);
  const rightLegGroupRef = useRef<THREE.Group>(null);

  // Vehicle-specific refs (Microcontroller Rover)
  const vehicleBodyRef = useRef<THREE.Group>(null);
  const flSteerRef = useRef<THREE.Group>(null);
  const frSteerRef = useRef<THREE.Group>(null);
  const flWheelRef = useRef<THREE.Mesh>(null);
  const frWheelRef = useRef<THREE.Mesh>(null);
  const rlWheelRef = useRef<THREE.Mesh>(null);
  const rrWheelRef = useRef<THREE.Mesh>(null);
  const ledBlinkRef = useRef<THREE.Mesh>(null);

  // Physics and procedural locomotion state
  const motionState = useRef({
    position: new THREE.Vector3(spawnPosition[0], spawnPosition[1], spawnPosition[2]),
    velocity: new THREE.Vector3(0, 0, 0),
    targetVelocity: new THREE.Vector3(0, 0, 0),
    yaw: 0,
    targetYaw: 0,
    strideCycle: 0,
    idleTimer: 0,
    headScanAngle: 0,
    interactArmReach: 0,
    blinkTimer: 0,
    antennaWobble: 0,
    wheelSpin: 0,
    steerAngle: 0
  });

  const lastRoomRef = useRef<string>(activeRoom);
  useEffect(() => {
    if (lastRoomRef.current !== activeRoom) {
      lastRoomRef.current = activeRoom;
      motionState.current.position.set(spawnPosition[0], spawnPosition[1], spawnPosition[2]);
      motionState.current.velocity.set(0, 0, 0);
      motionState.current.targetVelocity.set(0, 0, 0);
      motionState.current.yaw = 0;
      motionState.current.targetYaw = 0;
    }
  }, [activeRoom, spawnPosition]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const m = motionState.current;
    const input = inputRef.current;

    // Movement speeds: Rover is slightly faster than the cartoon droid
    const baseSpeed = avatarType === 'vehicle' ? 8.4 : 6.2;
    const maxSpeed = baseSpeed * input.speedMultiplier;
    const acceleration = avatarType === 'vehicle' ? 18.0 : 15.0;
    const deceleration = 20.0;
    const turnSpeed = avatarType === 'vehicle' ? 10.5 : 13.0;

    // 1. Camera-Relative Locomotion Intent
    const rawX = input.moveVector.x;
    const rawZ = input.moveVector.z;
    const inputLength = Math.hypot(rawX, rawZ);

    if (inputLength > 0.05) {
      // Camera horizontal forward and right vectors:
      // When cameraAngle = 0, camera is at +Z looking towards -Z.
      const camForwardX = -Math.sin(cameraAngle);
      const camForwardZ = -Math.cos(cameraAngle);
      const camRightX = Math.cos(cameraAngle);
      const camRightZ = -Math.sin(cameraAngle);

      // Input: rawX is right/left (-1 to 1), rawZ is forward/backward (-1 to 1)
      const forwardAmount = -rawZ;
      const rightAmount = rawX;

      const worldDirX = rightAmount * camRightX + forwardAmount * camForwardX;
      const worldDirZ = rightAmount * camRightZ + forwardAmount * camForwardZ;
      const dirLength = Math.hypot(worldDirX, worldDirZ);

      if (dirLength > 0.001) {
        const normDirX = worldDirX / dirLength;
        const normDirZ = worldDirZ / dirLength;
        const speed = Math.min(inputLength, 1.0) * maxSpeed;

        m.targetVelocity.x = normDirX * speed;
        m.targetVelocity.z = normDirZ * speed;

        // Model's front face is at local -Z.
        // Heading angle around Y to align local -Z with (normDirX, normDirZ) is Math.atan2(-normDirX, -normDirZ):
        m.targetYaw = Math.atan2(-normDirX, -normDirZ);
        m.idleTimer = 0;
      }
    } else {
      m.targetVelocity.set(0, 0, 0);
      m.idleTimer += dt;
    }

    // 2. Smooth Acceleration and Deceleration
    const accelRate = m.targetVelocity.lengthSq() > 0.01 ? acceleration : deceleration;
    const smoothFactor = 1.0 - Math.exp(-accelRate * dt);
    m.velocity.lerp(m.targetVelocity, smoothFactor);

    const currentSpeed = m.velocity.length();
    const isMoving = currentSpeed > 0.15;

    // 3. Smooth Yaw Rotation & Steering Calculation
    let angleDiff = 0;
    if (currentSpeed > 0.12) {
      angleDiff = m.targetYaw - m.yaw;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      m.yaw += angleDiff * Math.min(turnSpeed * dt, 1.0);
    }

    // 4. Collision Detection and Position Integration
    const nextX = m.position.x + m.velocity.x * dt;
    const nextZ = m.position.z + m.velocity.z * dt;

    const avatarRadius = avatarType === 'vehicle' ? 0.75 : 0.45;
    let allowedX = nextX;
    let allowedZ = nextZ;

    for (const obs of WORLD_OBSTACLES) {
      if (obs.type === 'cylinder' && obs.radius) {
        const dx = allowedX - obs.x;
        const dz = allowedZ - obs.z;
        const minDist = obs.radius + avatarRadius;
        const distSq = dx * dx + dz * dz;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          if (dist > 0.001) {
            const pushFactor = minDist / dist;
            allowedX = obs.x + dx * pushFactor;
            allowedZ = obs.z + dz * pushFactor;
          }
        }
      }
    }

    // Level Boundary Clamping (inside 16m radius)
    const maxWorldRadius = 16.0;
    const currentDistCenter = Math.hypot(allowedX, allowedZ);
    if (currentDistCenter > maxWorldRadius) {
      const angle = Math.atan2(allowedZ, allowedX);
      allowedX = Math.cos(angle) * maxWorldRadius;
      allowedZ = Math.sin(angle) * maxWorldRadius;
    }

    m.position.x = allowedX;
    m.position.z = allowedZ;

    // =========================================================================
    // 5. ANIMATIONS: CARTOON ROBOT VS MICROCONTROLLER ROVER
    // =========================================================================
    if (avatarType === 'vehicle') {
      // MICROCONTROLLER ROVER:
      // A. Wheel rotation based on distance traveled
      m.wheelSpin += (currentSpeed * dt) / 0.22;
      if (flWheelRef.current) flWheelRef.current.rotation.x = -m.wheelSpin;
      if (frWheelRef.current) frWheelRef.current.rotation.x = -m.wheelSpin;
      if (rlWheelRef.current) rlWheelRef.current.rotation.x = -m.wheelSpin;
      if (rrWheelRef.current) rrWheelRef.current.rotation.x = -m.wheelSpin;

      // B. Front Wheel Steering Knuckles
      const targetSteer = THREE.MathUtils.clamp(-angleDiff * 1.5, -0.5, 0.5);
      m.steerAngle = THREE.MathUtils.lerp(m.steerAngle, targetSteer, 0.2);
      if (flSteerRef.current) flSteerRef.current.rotation.y = m.steerAngle;
      if (frSteerRef.current) frSteerRef.current.rotation.y = m.steerAngle;

      // C. Chassis Pitch & Roll Suspension
      if (vehicleBodyRef.current && !reducedMotion) {
        const pitchTilt = THREE.MathUtils.clamp((currentSpeed / maxSpeed) * -0.05, -0.07, 0.02);
        const rollTilt = THREE.MathUtils.clamp(angleDiff * 0.12, -0.09, 0.09);
        vehicleBodyRef.current.rotation.x = THREE.MathUtils.lerp(vehicleBodyRef.current.rotation.x, pitchTilt, 0.15);
        vehicleBodyRef.current.rotation.z = THREE.MathUtils.lerp(vehicleBodyRef.current.rotation.z, rollTilt, 0.15);
        vehicleBodyRef.current.position.y = 0.28 + Math.sin(m.idleTimer * 10.0) * (isMoving ? 0.012 : 0.003);
      }

      // D. Blinking Microcontroller LED
      if (ledBlinkRef.current) {
        const blink = Math.sin(m.idleTimer * 14.0) > 0;
        const mat = ledBlinkRef.current.material as THREE.MeshBasicMaterial;
        mat.color.set(blink ? '#22c55e' : '#052e16');
      }
    } else {
      // CARTOONIST ROBOT CHARACTER:
      if (isMoving && !reducedMotion) {
        m.strideCycle += currentSpeed * dt * 6.2;
      } else {
        m.strideCycle = THREE.MathUtils.lerp(m.strideCycle, Math.round(m.strideCycle / Math.PI) * Math.PI, 0.15);
      }

      const strideSin = Math.sin(m.strideCycle);

      // Biped Leg Swing & Waddle
      if (leftLegGroupRef.current && rightLegGroupRef.current) {
        const legAmp = 0.7;
        leftLegGroupRef.current.rotation.x = strideSin * legAmp;
        rightLegGroupRef.current.rotation.x = -strideSin * legAmp;
      }

      // Torso Cute Breathing Bob & Waddle Tilt
      if (torsoGroupRef.current && !reducedMotion) {
        const breathing = Math.sin(m.idleTimer * 2.5) * 0.02;
        const waddleBounce = Math.abs(strideSin) * 0.06;
        torsoGroupRef.current.position.y = 0.88 + (isMoving ? waddleBounce : breathing);
        torsoGroupRef.current.rotation.z = isMoving ? -strideSin * 0.06 : 0;
        torsoGroupRef.current.rotation.x = isMoving ? -0.06 : 0;
      }

      // Cute Cartoon Arms
      if (leftArmGroupRef.current && rightArmGroupRef.current) {
        const leftSwing = isMoving ? -strideSin * 0.5 : Math.sin(m.idleTimer * 2.0) * 0.08;
        leftArmGroupRef.current.rotation.x = leftSwing;

        if (nearestExhibit) {
          m.interactArmReach = THREE.MathUtils.lerp(m.interactArmReach, 1.0, 0.14);
        } else {
          m.interactArmReach = THREE.MathUtils.lerp(m.interactArmReach, 0.0, 0.15);
        }

        const rightSwing = isMoving ? strideSin * 0.45 : -Math.sin(m.idleTimer * 2.0) * 0.08;
        rightArmGroupRef.current.rotation.x = THREE.MathUtils.lerp(rightSwing, -1.3, m.interactArmReach);
        rightArmGroupRef.current.rotation.y = THREE.MathUtils.lerp(0, -0.3, m.interactArmReach);
      }

      // Head Tracking & Expressive Movements
      if (headGroupRef.current) {
        if (nearestExhibit) {
          const dx = nearestExhibit.position[0] - m.position.x;
          const dz = nearestExhibit.position[2] - m.position.z;
          const targetWorldAngle = Math.atan2(-dx, -dz);
          let headRelAngle = targetWorldAngle - m.yaw;
          while (headRelAngle > Math.PI) headRelAngle -= Math.PI * 2;
          while (headRelAngle < -Math.PI) headRelAngle -= Math.PI * 2;

          headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
            headGroupRef.current.rotation.y,
            THREE.MathUtils.clamp(headRelAngle, -1.3, 1.3),
            0.15
          );
          headGroupRef.current.rotation.z = Math.sin(m.idleTimer * 3.0) * 0.05; // curious cartoon tilt
        } else if (!isMoving) {
          m.headScanAngle = Math.sin(m.idleTimer * 1.5) * 0.35;
          headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, m.headScanAngle, 0.08);
          headGroupRef.current.rotation.z = Math.sin(m.idleTimer * 0.8) * 0.06;
        } else {
          headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, 0, 0.15);
          headGroupRef.current.rotation.z = THREE.MathUtils.lerp(headGroupRef.current.rotation.z, 0, 0.15);
        }
      }

      // Eye Blinking
      m.blinkTimer += dt;
      const isBlinking = m.blinkTimer % 3.6 < 0.14;
      const eyeScaleY = isBlinking ? 0.1 : 1.0;
      if (eyeLeftRef.current) eyeLeftRef.current.scale.y = eyeScaleY;
      if (eyeRightRef.current) eyeRightRef.current.scale.y = eyeScaleY;

      // Spring Antenna Bob
      if (antennaTipRef.current) {
        m.antennaWobble = Math.sin(m.strideCycle * 1.8) * (isMoving ? 0.14 : 0.03);
        antennaTipRef.current.position.x = 0.14 + m.antennaWobble;
      }
    }

    // 6. Root Transform & Callback
    if (rootGroupRef.current) {
      rootGroupRef.current.position.copy(m.position);
      rootGroupRef.current.rotation.y = m.yaw;
    }

    onPositionUpdate([m.position.x, m.position.y, m.position.z], m.yaw, currentSpeed);
  });

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {avatarType === 'vehicle' ? (
        // =====================================================================
        // MICROCONTROLLER ROBOT VEHICLE (DIY Maker Rover with Arduino/STM32)
        // =====================================================================
        <group ref={vehicleBodyRef} position={[0, 0.28, 0]}>
          {/* Main Green PCB Chassis Plate */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.9, 0.03, 1.3]} />
            <meshStandardMaterial color="#15803d" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Silkscreen White Wiring Lines on Chassis */}
          <mesh position={[0, 0.068, 0]}>
            <planeGeometry args={[0.82, 1.2]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>

          {/* Lower Motor Mount Brackets (Black Acrylic) */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.75, 0.08, 1.1]} />
            <meshStandardMaterial color="#090d16" roughness={0.6} />
          </mesh>

          {/* Microcontroller Development Board (Blue PCB with STM32 / Arduino Chip) */}
          <group position={[0, 0.1, -0.1]}>
            {/* Blue MCU Board */}
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.48, 0.04, 0.58]} />
              <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.1} />
            </mesh>
            {/* Black Microcontroller IC Chip */}
            <mesh position={[0, 0.03, 0]}>
              <boxGeometry args={[0.2, 0.02, 0.2]} />
              <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
            </mesh>
            {/* Silver Crystal Oscillator */}
            <mesh position={[-0.15, 0.03, 0.1]}>
              <boxGeometry args={[0.06, 0.02, 0.12]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* USB Programming Port */}
            <mesh position={[0, 0.03, -0.29]}>
              <boxGeometry args={[0.12, 0.05, 0.08]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </mesh>
            {/* Blinking SMD Status LEDs */}
            <mesh ref={ledBlinkRef} position={[0.16, 0.03, 0.18]}>
              <boxGeometry args={[0.03, 0.02, 0.03]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            <mesh position={[0.16, 0.03, 0.1]}>
              <boxGeometry args={[0.03, 0.02, 0.03]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </group>

          {/* Dual 18650 Battery Pack in Holder */}
          <group position={[0, 0.12, 0.35]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.55, 0.1, 0.38]} />
              <meshStandardMaterial color="#090d16" roughness={0.8} />
            </mesh>
            {/* Battery 1 (Cyan Sleeve) */}
            <mesh position={[-0.14, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.34, 10]} />
              <meshStandardMaterial color="#06b6d4" />
            </mesh>
            {/* Battery 2 (Cyan Sleeve) */}
            <mesh position={[0.14, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.34, 10]} />
              <meshStandardMaterial color="#06b6d4" />
            </mesh>
          </group>

          {/* Motor Driver Module (Red PCB with Metal Heatsink) */}
          <group position={[0, 0.1, 0.02]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.34, 0.03, 0.3]} />
              <meshStandardMaterial color="#dc2626" />
            </mesh>
            {/* Black Anodized Heatsink Fins */}
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[0.2, 0.1, 0.15]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>

          {/* Front Mounted HC-SR04 Ultrasonic Distance Sensor ("Eyes") */}
          <group position={[0, 0.12, -0.66]}>
            {/* Blue Sensor PCB */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.42, 0.16, 0.02]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
            {/* Left Ultrasonic Metal Canister Eye */}
            <mesh position={[-0.12, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.08, 12]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Right Ultrasonic Metal Canister Eye */}
            <mesh position={[0.12, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.08, 12]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
            </mesh>
          </group>

          {/* Front Headlight LEDs */}
          <mesh position={[-0.32, 0.05, -0.66]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh position={[0.32, 0.05, -0.66]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>

          {/* Forward Driving Spotlight Cone */}
          <spotLight
            position={[0, 0.2, -0.7]}
            target-position={[0, 0, -6]}
            angle={0.65}
            penumbra={0.5}
            intensity={4.0}
            distance={14}
            color="#fef08a"
          />

          {/* ================= 4 HOBBY ROBOT WHEELS ================= */}
          {/* Front Left Wheel Assembly */}
          <group ref={flSteerRef} position={[-0.52, -0.06, -0.42]}>
            <mesh ref={flWheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 12]} />
              <meshStandardMaterial color="#090d16" roughness={0.8} />
            </mesh>
            {/* Classic Yellow Robot Rim */}
            <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.03, 10]} />
              <meshStandardMaterial color="#eab308" roughness={0.4} />
            </mesh>
          </group>

          {/* Front Right Wheel Assembly */}
          <group ref={frSteerRef} position={[0.52, -0.06, -0.42]}>
            <mesh ref={frWheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 12]} />
              <meshStandardMaterial color="#090d16" roughness={0.8} />
            </mesh>
            {/* Classic Yellow Robot Rim */}
            <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.03, 10]} />
              <meshStandardMaterial color="#eab308" roughness={0.4} />
            </mesh>
          </group>

          {/* Rear Left Wheel */}
          <group position={[-0.52, -0.06, 0.42]}>
            <mesh ref={rlWheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 12]} />
              <meshStandardMaterial color="#090d16" roughness={0.8} />
            </mesh>
            <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.03, 10]} />
              <meshStandardMaterial color="#eab308" roughness={0.4} />
            </mesh>
          </group>

          {/* Rear Right Wheel */}
          <group position={[0.52, -0.06, 0.42]}>
            <mesh ref={rrWheelRef} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 12]} />
              <meshStandardMaterial color="#090d16" roughness={0.8} />
            </mesh>
            <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.03, 10]} />
              <meshStandardMaterial color="#eab308" roughness={0.4} />
            </mesh>
          </group>
        </group>
      ) : (
        // =====================================================================
        // CARTOONIST ROBOT CHARACTER (Super Cute Astro/Wall-E Inspired Droid)
        // =====================================================================
        <group>
          {/* LOWER BODY: CUTE CARTOON BIPED LEGS */}
          {/* Left Leg */}
          <group ref={leftLegGroupRef} position={[-0.2, 0.5, 0]}>
            {/* Upper Leg */}
            <mesh position={[0, -0.15, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.3, 10]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.25} />
            </mesh>
            {/* Chunky Rounded Cartoon Boot */}
            <mesh position={[0, -0.32, -0.04]} castShadow>
              <boxGeometry args={[0.16, 0.12, 0.26]} />
              <meshStandardMaterial color="#0284c7" roughness={0.3} />
            </mesh>
            {/* Yellow Rubber Sole */}
            <mesh position={[0, -0.38, -0.04]}>
              <boxGeometry args={[0.15, 0.03, 0.24]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>
          </group>

          {/* Right Leg */}
          <group ref={rightLegGroupRef} position={[0.2, 0.5, 0]}>
            {/* Upper Leg */}
            <mesh position={[0, -0.15, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.3, 10]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.25} />
            </mesh>
            {/* Chunky Rounded Cartoon Boot */}
            <mesh position={[0, -0.32, -0.04]} castShadow>
              <boxGeometry args={[0.16, 0.12, 0.26]} />
              <meshStandardMaterial color="#0284c7" roughness={0.3} />
            </mesh>
            {/* Yellow Rubber Sole */}
            <mesh position={[0, -0.38, -0.04]}>
              <boxGeometry args={[0.15, 0.03, 0.24]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>
          </group>

          {/* UPPER BODY: CHUBBY CARTOON TORSO & ARMS */}
          <group ref={torsoGroupRef} position={[0, 0.88, 0]}>
            {/* Rounded Porcelain Torso Shell */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.35, 0.32, 0.52, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.18} metalness={0.05} />
            </mesh>

            {/* Glowing Heart Core on Chest */}
            <mesh position={[0, 0.28, -0.32]}>
              <sphereGeometry args={[0.1, 10, 10]} />
              <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={3.0} />
            </mesh>

            {/* Back Mini Rocket Thrusters */}
            <mesh position={[-0.14, 0.26, 0.28]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 0.28, 8]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
            <mesh position={[0.14, 0.26, 0.28]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 0.28, 8]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>

            {/* LEFT CARTOON ARM */}
            <group ref={leftArmGroupRef} position={[-0.38, 0.36, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.09, 10, 10]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>
              <mesh position={[0, -0.16, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.22, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
              {/* Cute Little Mitt Hand */}
              <mesh position={[0, -0.28, -0.02]} castShadow>
                <sphereGeometry args={[0.08, 10, 10]} />
                <meshStandardMaterial color="#f59e0b" />
              </mesh>
            </group>

            {/* RIGHT CARTOON ARM (Points/Interacts) */}
            <group ref={rightArmGroupRef} position={[0.38, 0.36, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.09, 10, 10]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>
              <mesh position={[0, -0.16, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.22, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
              {/* Cute Little Mitt Hand */}
              <mesh position={[0, -0.28, -0.02]} castShadow>
                <sphereGeometry args={[0.08, 10, 10]} />
                <meshStandardMaterial color="#f59e0b" />
              </mesh>
            </group>

            {/* CUTE CARTOON HEAD & EXPRESSIVE EYES */}
            <group ref={headGroupRef} position={[0, 0.62, 0]}>
              {/* Neck Pivot */}
              <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.08, 0.09, 0.08, 10]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>

              {/* Big Rounded White Head */}
              <mesh position={[0, 0.18, 0]} castShadow>
                <sphereGeometry args={[0.32, 16, 16]} />
                <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.05} />
              </mesh>

              {/* Glossy Curved Visor Screen */}
              <mesh position={[0, 0.18, -0.18]}>
                <boxGeometry args={[0.36, 0.22, 0.08]} />
                <meshStandardMaterial color="#090d16" roughness={0.1} metalness={0.8} />
              </mesh>

              {/* Two Big Cute Cartoon Glowing Eyes */}
              <mesh ref={eyeLeftRef} position={[-0.09, 0.18, -0.23]}>
                <cylinderGeometry args={[0.055, 0.055, 0.01, 12]} />
                <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={3.5} />
              </mesh>
              <mesh ref={eyeRightRef} position={[0.09, 0.18, -0.23]}>
                <cylinderGeometry args={[0.055, 0.055, 0.01, 12]} />
                <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={3.5} />
              </mesh>

              {/* Cute Cheek Blushes (Pink Ovals) */}
              <mesh position={[-0.13, 0.1, -0.22]}>
                <planeGeometry args={[0.06, 0.03]} />
                <meshBasicMaterial color="#f472b6" transparent opacity={0.85} />
              </mesh>
              <mesh position={[0.13, 0.1, -0.22]}>
                <planeGeometry args={[0.06, 0.03]} />
                <meshBasicMaterial color="#f472b6" transparent opacity={0.85} />
              </mesh>

              {/* Playful Coiled Spring Antenna & Glowing Bouncy Orb */}
              <group position={[0, 0.46, 0]}>
                <mesh position={[0.06, 0.08, 0]}>
                  <cylinderGeometry args={[0.012, 0.012, 0.18, 6]} />
                  <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh ref={antennaTipRef} position={[0.14, 0.18, 0]}>
                  <sphereGeometry args={[0.055, 12, 12]} />
                  <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3.0} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      )}
    </group>
  );
};
