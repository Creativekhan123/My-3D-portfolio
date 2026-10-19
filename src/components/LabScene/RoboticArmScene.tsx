import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface RoboticArmSceneProps {
  onSelectHotspot?: (hotspotId: string) => void;
  activeHotspot?: string | null;
}

export const RoboticArmScene: React.FC<RoboticArmSceneProps> = ({ onSelectHotspot, activeHotspot }) => {
  const { mouse } = useThree();

  // Joint References for Procedural Kinematic Animation
  const baseTurntableRef = useRef<THREE.Group>(null);
  const shoulderJointRef = useRef<THREE.Group>(null);
  const elbowJointRef = useRef<THREE.Group>(null);
  const wristPitchRef = useRef<THREE.Group>(null);
  const endEffectorRef = useRef<THREE.Group>(null);
  const laserBeamRef = useRef<THREE.Line>(null);

  // Hover states for interactive hotspots
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Materials with curated PBR properties
  const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: '#151922',
    metalness: 0.85,
    roughness: 0.35
  });

  const graphiteMaterial = new THREE.MeshStandardMaterial({
    color: '#0E1118',
    metalness: 0.5,
    roughness: 0.7
  });

  const amberEmissiveMaterial = new THREE.MeshStandardMaterial({
    color: '#F59E0B',
    emissive: '#F59E0B',
    emissiveIntensity: 1.8,
    metalness: 0.2,
    roughness: 0.2
  });

  const cyanEmissiveMaterial = new THREE.MeshStandardMaterial({
    color: '#38BDF8',
    emissive: '#38BDF8',
    emissiveIntensity: 1.6,
    metalness: 0.2,
    roughness: 0.2
  });

  const steelJointMaterial = new THREE.MeshStandardMaterial({
    color: '#2A3448',
    metalness: 0.9,
    roughness: 0.2
  });

  // Laser targeting line geometry
  const laserPoints = React.useMemo(() => [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -1.8, 0)
  ], []);

  const laserLineGeometry = React.useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(laserPoints);
    return geom;
  }, [laserPoints]);

  const laserLineMaterial = React.useMemo(() => new THREE.LineBasicMaterial({
    color: '#F59E0B',
    transparent: true,
    opacity: 0.6,
    linewidth: 2
  }), []);

  // Frame loop with smooth dampening & mouse parallax
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Mouse parallax for subtle responsive depth
    const targetBaseRotation = mouse.x * 0.45 + Math.sin(t * 0.5) * 0.15;
    const targetShoulderAngle = -0.3 + mouse.y * 0.2 + Math.sin(t * 0.8) * 0.08;
    const targetElbowAngle = 0.65 - mouse.y * 0.15 + Math.cos(t * 0.7) * 0.1;
    const targetWristPitch = -0.35 + mouse.y * 0.1 + Math.sin(t * 0.6) * 0.05;

    // Smooth lerping to targets (damping factor)
    const dampSpeed = 4 * delta;

    if (baseTurntableRef.current) {
      baseTurntableRef.current.rotation.y = THREE.MathUtils.lerp(
        baseTurntableRef.current.rotation.y,
        targetBaseRotation,
        dampSpeed
      );
    }

    if (shoulderJointRef.current) {
      shoulderJointRef.current.rotation.z = THREE.MathUtils.lerp(
        shoulderJointRef.current.rotation.z,
        targetShoulderAngle,
        dampSpeed
      );
    }

    if (elbowJointRef.current) {
      elbowJointRef.current.rotation.z = THREE.MathUtils.lerp(
        elbowJointRef.current.rotation.z,
        targetElbowAngle,
        dampSpeed
      );
    }

    if (wristPitchRef.current) {
      wristPitchRef.current.rotation.z = THREE.MathUtils.lerp(
        wristPitchRef.current.rotation.z,
        targetWristPitch,
        dampSpeed
      );
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      {/* =================================================================
          LABORATORY OPTICAL PLATFORM & COORDINATE GRID
          ================================================================= */}
      {/* Base Optical Bench Platform */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.0, 0.1, 48]} />
        <primitive object={graphiteMaterial} />
      </mesh>

      {/* Outer Metallic Telemetry Ring */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.45, 64]} />
        <meshBasicMaterial color="#334155" wireframe={false} />
      </mesh>

      {/* Precision Calibration Grid */}
      <gridHelper args={[5.2, 26, '#38BDF8', '#1E293B']} position={[0, 0.01, 0]} />

      {/* Calibration Target Disc */}
      <mesh position={[1.2, 0.015, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.35, 32]} />
        <primitive object={amberEmissiveMaterial} />
      </mesh>
      <mesh position={[1.2, 0.02, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.08, 16]} />
        <primitive object={darkMetalMaterial} />
      </mesh>

      {/* =================================================================
          ROBOTIC ARM MANIPULATOR HIERARCHY
          ================================================================= */}
      {/* Turntable Base Anchor */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.85, 0.4, 32]} />
        <primitive object={darkMetalMaterial} />
      </mesh>

      {/* Ambient Status Ring on Base */}
      <mesh position={[0, 0.38, 0]}>
        <torusGeometry args={[0.62, 0.025, 16, 48]} />
        <primitive object={amberEmissiveMaterial} />
      </mesh>

      {/* Base Rotating Turntable Group (Joint 1 - Yaw) */}
      <group ref={baseTurntableRef} position={[0, 0.4, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.58, 0.3, 32]} />
          <primitive object={steelJointMaterial} />
        </mesh>

        {/* Shoulder Dual-Fork Yoke Bracket */}
        <mesh position={[-0.22, 0.55, 0]} castShadow>
          <boxGeometry args={[0.12, 0.65, 0.35]} />
          <primitive object={darkMetalMaterial} />
        </mesh>
        <mesh position={[0.22, 0.55, 0]} castShadow>
          <boxGeometry args={[0.12, 0.65, 0.35]} />
          <primitive object={darkMetalMaterial} />
        </mesh>

        {/* Shoulder Cross Pivot Axis */}
        <mesh position={[0, 0.75, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.58, 32]} />
          <primitive object={steelJointMaterial} />
        </mesh>

        {/* Hotspot 1: Embedded Hardware Controller */}
        <group position={[0.6, 0.75, 0]}>
          <Html distanceFactor={10} position={[0, 0, 0]} center>
            <button
              className={`badge ${activeHotspot === 'hardware' || hoveredHotspot === 'hardware' ? 'badge-cyan' : 'badge'}`}
              style={{ cursor: 'pointer', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}
              onClick={() => onSelectHotspot?.('maze-robotics')}
              onMouseEnter={() => setHoveredHotspot('hardware')}
              onMouseLeave={() => setHoveredHotspot(null)}
              aria-label="View Embedded Robotics Architecture"
            >
              <span className="badge-dot" />
              <span>CAN-FD // PID Controller</span>
            </button>
          </Html>
        </group>

        {/* =============================================================
            SHOULDER JOINT & LOWER ARM SEGMENT (Joint 2 - Pitch)
            ============================================================= */}
        <group ref={shoulderJointRef} position={[0, 0.75, 0]}>
          {/* Lower Arm Twin Carbon Fiber Struts */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <boxGeometry args={[0.2, 1.4, 0.22]} />
            <primitive object={graphiteMaterial} />
          </mesh>

          {/* Chamfered Accent Strip on Arm */}
          <mesh position={[0.11, 0.75, 0]}>
            <boxGeometry args={[0.015, 1.1, 0.12]} />
            <primitive object={amberEmissiveMaterial} />
          </mesh>

          {/* Hydraulic Balancing Cylinder */}
          <mesh position={[-0.15, 0.6, 0]} rotation={[0, 0, -0.15]}>
            <cylinderGeometry args={[0.045, 0.045, 0.9, 16]} />
            <primitive object={steelJointMaterial} />
          </mesh>

          {/* ===========================================================
              ELBOW JOINT & FOREARM (Joint 3 - Pitch)
              =========================================================== */}
          <group ref={elbowJointRef} position={[0, 1.45, 0]}>
            {/* Elbow Harmonic Drive Housing */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.32, 24]} />
              <primitive object={steelJointMaterial} />
            </mesh>

            {/* Cyan Status LED Ring on Elbow */}
            <mesh position={[0, 0, 0.17]}>
              <ringGeometry args={[0.08, 0.12, 16]} />
              <primitive object={cyanEmissiveMaterial} />
            </mesh>

            {/* Forearm Segment */}
            <mesh position={[0, 0.65, 0]} castShadow>
              <boxGeometry args={[0.16, 1.15, 0.18]} />
              <primitive object={darkMetalMaterial} />
            </mesh>

            {/* Hotspot 2: Kinematics & ROS2 */}
            <group position={[-0.55, 0.65, 0]}>
              <Html distanceFactor={10} position={[0, 0, 0]} center>
                <button
                  className={`badge ${activeHotspot === 'kinematics' || hoveredHotspot === 'kinematics' ? 'badge-amber' : 'badge'}`}
                  style={{ cursor: 'pointer', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}
                  onClick={() => onSelectHotspot?.('robotics-hardware')}
                  onMouseEnter={() => setHoveredHotspot('kinematics')}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  aria-label="View 6-DOF Kinematics Case Study"
                >
                  <span className="badge-dot" />
                  <span>ROS2 // MoveIt2 IK</span>
                </button>
              </Html>
            </group>

            {/* =========================================================
                WRIST MULTI-AXIS GIMBAL (Joints 4, 5 & 6)
                ========================================================= */}
            <group ref={wristPitchRef} position={[0, 1.25, 0]}>
              {/* Wrist Pivot Assembly */}
              <mesh castShadow>
                <sphereGeometry args={[0.12, 24, 24]} />
                <primitive object={steelJointMaterial} />
              </mesh>

              {/* End Effector Assembly */}
              <group ref={endEffectorRef} position={[0, 0.22, 0]}>
                {/* Tool Flange Mount */}
                <mesh castShadow>
                  <cylinderGeometry args={[0.09, 0.11, 0.14, 24]} />
                  <primitive object={darkMetalMaterial} />
                </mesh>

                {/* Micro-Gripper Parallel Fingers */}
                <mesh position={[-0.06, 0.16, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.2, 0.05]} />
                  <primitive object={steelJointMaterial} />
                </mesh>
                <mesh position={[0.06, 0.16, 0]} castShadow>
                  <boxGeometry args={[0.025, 0.2, 0.05]} />
                  <primitive object={steelJointMaterial} />
                </mesh>

                {/* Optical Laser Diode Module */}
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.025, 0.025, 0.06, 16]} />
                  <primitive object={amberEmissiveMaterial} />
                </mesh>

                {/* Laser Targeting Beam Projection */}
                <primitive
                  object={new THREE.Line(laserLineGeometry, laserLineMaterial)}
                  ref={laserBeamRef}
                  position={[0, 0.05, 0]}
                  rotation={[0, 0, Math.PI]}
                />

                {/* Hotspot 3: Unreal Engine & Digital Twin */}
                <group position={[0.7, 0.2, 0]}>
                  <Html distanceFactor={10} position={[0, 0, 0]} center>
                    <button
                      className={`badge ${activeHotspot === 'twin' || hoveredHotspot === 'twin' ? 'badge-amber' : 'badge'}`}
                      style={{ cursor: 'pointer', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}
                      onClick={() => onSelectHotspot?.('digital-twins')}
                      onMouseEnter={() => setHoveredHotspot('twin')}
                      onMouseLeave={() => setHoveredHotspot(null)}
                      aria-label="View Unreal Engine Digital Twin"
                    >
                      <span className="badge-dot" />
                      <span>UE5 // Digital Twin HIL</span>
                    </button>
                  </Html>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Floating Spatial Boundary Wireframe Box */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[4.4, 3.8, 4.4]} />
        <meshBasicMaterial color="#1E293B" wireframe={true} transparent={true} opacity={0.35} />
      </mesh>
    </group>
  );
};
