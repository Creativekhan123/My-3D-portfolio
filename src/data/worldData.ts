import type { ExhibitStationInfo, SectorZone, DoorPortalInfo } from '../types/game';

// 4 Sector Zones: The Scenic Park Hub + 3 Specialized Level Realms
export const SECTORS: SectorZone[] = [
  {
    id: 'park',
    name: 'Greenery Park Hub',
    code: 'SEC-00',
    description: 'Scenic botanical park with low-poly greenery, reflection pond, and 3 Gateway Doors',
    color: '#22c55e',
    spawnPoint: [0, 0, 0],
    bounds: { minX: -18, maxX: 18, minZ: -18, maxZ: 18 }
  },
  {
    id: 'game-dev',
    name: 'Game Development Realm',
    code: 'REALM-01',
    description: 'Dynamic arena with floating power crystals, glowing runes, and 4 Game Project LED TVs',
    color: '#f97316',
    spawnPoint: [0, 0, 5.0],
    bounds: { minX: -16, maxX: 16, minZ: -16, maxZ: 16 }
  },
  {
    id: 'robotics',
    name: 'Robotics Test Facility',
    code: 'REALM-02',
    description: 'High-tech industrial robotics workshop with micromouse maze, 6-DOF arm, and 4 Robotics LED TVs',
    color: '#06b6d4',
    spawnPoint: [0, 0, 5.0],
    bounds: { minX: -16, maxX: 16, minZ: -16, maxZ: 16 }
  },
  {
    id: 'twin-dev',
    name: 'Digital Twin Sim Lab',
    code: 'REALM-03',
    description: 'Cyber-physical hybrid of robotics and game engines with LiDAR holograms and 4 Twin LED TVs',
    color: '#a855f7',
    spawnPoint: [0, 0, 5.0],
    bounds: { minX: -16, maxX: 16, minZ: -16, maxZ: 16 }
  }
];

// The 3 Mandatory Gateway Doors in the Scenic Green Park
export const PARK_DOORS: DoorPortalInfo[] = [
  {
    id: 'door-as-game-dev',
    targetRoomId: 'game-dev',
    label: 'As a Game Developer',
    sublabel: 'Enter Game Development Realm',
    badge: 'GAME DEV',
    color: '#f97316',
    position: [-8.5, 0, -8.5],
    rotation: [0, Math.PI / 4, 0],
    targetSpawn: [0, 0, 5.0],
    interactionRadius: 3.6
  },
  {
    id: 'door-as-roboticist',
    targetRoomId: 'robotics',
    label: 'As a Roboticist',
    sublabel: 'Enter Autonomous Robotics Test Facility',
    badge: 'ROBOTICS',
    color: '#06b6d4',
    position: [0, 0, -12.0],
    rotation: [0, 0, 0],
    targetSpawn: [0, 0, 5.0],
    interactionRadius: 3.6
  },
  {
    id: 'door-as-twin-dev',
    targetRoomId: 'twin-dev',
    label: 'As a Twin Developer',
    sublabel: 'Enter Digital Twin Sim Lab (Robotics + Games)',
    badge: 'TWIN DEV',
    color: '#a855f7',
    position: [8.5, 0, -8.5],
    rotation: [0, -Math.PI / 4, 0],
    targetSpawn: [0, 0, 5.0],
    interactionRadius: 3.6
  }
];

// Return Door present inside each level to travel back to the Scenic Park
export const RETURN_TO_PARK_DOOR: DoorPortalInfo = {
  id: 'door-return-park',
  targetRoomId: 'park',
  label: 'Scenic Greenery Park',
  sublabel: 'Return to Central Park Hub',
  badge: 'PARK',
  color: '#22c55e',
  position: [0, 0, 7.5],
  rotation: [0, Math.PI, 0],
  targetSpawn: [0, 0, 0],
  interactionRadius: 3.5
};

// Backward-compatibility aliases
export const NEXUS_DOORS = PARK_DOORS;
export const ROOM_EXIT_DOOR = RETURN_TO_PARK_DOOR;

// =========================================================================
// 12 LED TV EXHIBIT STATIONS (4 per Realm)
// =========================================================================
export const EXHIBIT_STATIONS: ExhibitStationInfo[] = [
  // -----------------------------------------------------------------------
  // GAME DEVELOPMENT REALM (4 LED TVs)
  // -----------------------------------------------------------------------
  {
    id: 'station-game-1',
    projectId: 'project-unreal-combat',
    slug: 'unreal-physics-combat',
    title: 'Aetheria: Physics Combat & Traversal',
    shortTitle: 'UE5 Combat System',
    category: 'unreal-games',
    sectorName: 'Game Development Realm',
    sectorId: 'game-dev',
    position: [-6.8, 0, -4.2],
    rotation: [0, 0.45, 0],
    interactionRadius: 3.6,
    accentColor: '#f97316',
    thumbnailUrl: '/images/unreal_combat_system.jpg',
    badgeText: 'UE 5.4 / C++ / GAS',
    description: 'Physics-driven traversal and combat with distance matching and motion warping.'
  },
  {
    id: 'station-game-2',
    projectId: 'project-gas-multiplayer',
    slug: 'gas-multiplayer-rollback',
    title: 'Chronos: Authoritative GAS Framework',
    shortTitle: 'Multiplayer Netcode',
    category: 'unreal-games',
    sectorName: 'Game Development Realm',
    sectorId: 'game-dev',
    position: [-2.4, 0, -7.2],
    rotation: [0, 0.15, 0],
    interactionRadius: 3.6,
    accentColor: '#fb923c',
    thumbnailUrl: '/images/unreal_combat_system.jpg',
    badgeText: 'Iris Replication / C++',
    description: 'Server-authoritative rollback, client prediction, and replicated ability bitmasks.'
  },
  {
    id: 'station-game-3',
    projectId: 'project-motion-warping',
    slug: 'apex-dynamic-traversal',
    title: 'Apex Traversal: Ledge Vaulting & Climbing',
    shortTitle: 'Parkour Traversal',
    category: 'unreal-games',
    sectorName: 'Game Development Realm',
    sectorId: 'game-dev',
    position: [2.4, 0, -7.2],
    rotation: [0, -0.15, 0],
    interactionRadius: 3.6,
    accentColor: '#fdba74',
    thumbnailUrl: '/images/unreal_combat_system.jpg',
    badgeText: 'Control Rig / IK',
    description: 'Dynamic 3-stage obstacle scanning and smooth surface-contact hand plant IK.'
  },
  {
    id: 'station-game-4',
    projectId: 'project-ai-behavior',
    slug: 'vanguard-ai-state-trees',
    title: 'Vanguard: Tactical AI Squad Behavior Trees',
    shortTitle: 'Tactical AI Squad',
    category: 'unreal-games',
    sectorName: 'Game Development Realm',
    sectorId: 'game-dev',
    position: [6.8, 0, -4.2],
    rotation: [0, -0.45, 0],
    interactionRadius: 3.6,
    accentColor: '#f97316',
    thumbnailUrl: '/images/unreal_combat_system.jpg',
    badgeText: 'State Trees / EQS',
    description: 'Hierarchical AI state trees with dynamic flanking and coordinated suppressing fire.'
  },

  // -----------------------------------------------------------------------
  // ROBOTICS TEST FACILITY (4 LED TVs)
  // -----------------------------------------------------------------------
  {
    id: 'station-robotics-1',
    projectId: 'project-micromouse-maze',
    slug: 'aegis-micromouse-solver',
    title: 'Aegis-1: Autonomous Micromouse Maze-Solver',
    shortTitle: 'Micromouse Solver',
    category: 'maze-robotics',
    sectorName: 'Robotics Test Facility',
    sectorId: 'robotics',
    position: [-6.8, 0, -4.2],
    rotation: [0, 0.45, 0],
    interactionRadius: 3.6,
    accentColor: '#06b6d4',
    thumbnailUrl: '/images/micromouse_maze_robot.jpg',
    badgeText: 'STM32 / Bare-Metal C',
    description: '16x16 autonomous maze-solving robot with modified flood-fill and 1kHz dual PID.'
  },
  {
    id: 'station-robotics-2',
    projectId: 'project-robotic-arm',
    slug: 'apex-6-manipulator-kinematics',
    title: 'Apex-6: 6-DOF Kinematic Manipulator',
    shortTitle: '6-DOF Robot Arm',
    category: 'maze-robotics',
    sectorName: 'Robotics Test Facility',
    sectorId: 'robotics',
    position: [-2.4, 0, -7.2],
    rotation: [0, 0.15, 0],
    interactionRadius: 3.6,
    accentColor: '#38bdf8',
    thumbnailUrl: '/images/robotic_arm_kinematics.jpg',
    badgeText: 'MoveIt2 / CAN-FD',
    description: 'Synchronous 5Mbps CAN-FD bus, closed-form analytical IK, and ROS2 MoveIt2.'
  },
  {
    id: 'station-robotics-3',
    projectId: 'project-drone-fc',
    slug: 'aeropilot-drone-controller',
    title: 'AeroPilot: Custom STM32 Flight Controller',
    shortTitle: 'Drone Flight Controller',
    category: 'maze-robotics',
    sectorName: 'Robotics Test Facility',
    sectorId: 'robotics',
    position: [2.4, 0, -7.2],
    rotation: [0, -0.15, 0],
    interactionRadius: 3.6,
    accentColor: '#0ea5e9',
    thumbnailUrl: '/images/micromouse_maze_robot.jpg',
    badgeText: 'FreeRTOS / EKF',
    description: 'Custom 4-layer PCB running 800Hz attitude stabilization with DShot600 ESC telemetry.'
  },
  {
    id: 'station-robotics-4',
    projectId: 'project-pid-rover',
    slug: 'roverx-pid-telemetry',
    title: 'RoverX: Dual Closed-Loop Velocity Rover',
    shortTitle: 'PID Velocity Rover',
    category: 'maze-robotics',
    sectorName: 'Robotics Test Facility',
    sectorId: 'robotics',
    position: [6.8, 0, -4.2],
    rotation: [0, -0.45, 0],
    interactionRadius: 3.6,
    accentColor: '#06b6d4',
    thumbnailUrl: '/images/robotic_arm_kinematics.jpg',
    badgeText: 'Encoders / STM32',
    description: 'Differential-drive vehicle with optical encoder hardware counters and real-time telemetry.'
  },

  // -----------------------------------------------------------------------
  // DIGITAL TWIN SIM LAB (4 LED TVs - Robotics + Game Dev Blend)
  // -----------------------------------------------------------------------
  {
    id: 'station-twin-1',
    projectId: 'project-digital-twin',
    slug: 'unreal-ros2-cyber-physical-twin',
    title: 'CyberTwin: UE5 × ROS2 Cyber-Physical Twin',
    shortTitle: 'Digital Twin Sim',
    category: 'digital-twins',
    sectorName: 'Digital Twin Sim Lab',
    sectorId: 'twin-dev',
    position: [-6.8, 0, -4.2],
    rotation: [0, 0.45, 0],
    interactionRadius: 3.6,
    accentColor: '#a855f7',
    thumbnailUrl: '/images/digital_twin_unreal_ros.jpg',
    badgeText: 'ROS2 / UE5 / LiDAR',
    description: 'High-throughput ROS2 DDS bridge to Unreal Engine 5 with synthetic LiDAR and telemetry.'
  },
  {
    id: 'station-twin-2',
    projectId: 'project-fleet-sim',
    slug: 'fleetsync-warehouse-simulation',
    title: 'FleetSync: Autonomous Warehouse Fleet Sim',
    shortTitle: 'Warehouse Fleet Sim',
    category: 'digital-twins',
    sectorName: 'Digital Twin Sim Lab',
    sectorId: 'twin-dev',
    position: [-2.4, 0, -7.2],
    rotation: [0, 0.15, 0],
    interactionRadius: 3.6,
    accentColor: '#c084fc',
    thumbnailUrl: '/images/digital_twin_unreal_ros.jpg',
    badgeText: 'UE5 Chaos / Nav2',
    description: 'Coordinating 24 autonomous mobile warehouse robots with dynamic congestion heatmaps.'
  },
  {
    id: 'station-twin-3',
    projectId: 'project-synthetic-lidar',
    slug: 'lidarsim-synthetic-raycasting',
    title: 'LiDAR-X: Synthetic 3D LiDAR Generator',
    shortTitle: 'Synthetic LiDAR Sim',
    category: 'digital-twins',
    sectorName: 'Digital Twin Sim Lab',
    sectorId: 'twin-dev',
    position: [2.4, 0, -7.2],
    rotation: [0, -0.15, 0],
    interactionRadius: 3.6,
    accentColor: '#d8b4fe',
    thumbnailUrl: '/images/digital_twin_unreal_ros.jpg',
    badgeText: 'Compute Shaders / ROS2',
    description: 'Real-time multi-beam laser point cloud generation directly on GPU compute shaders.'
  },
  {
    id: 'station-twin-4',
    projectId: 'project-hil-sim',
    slug: 'hiltwin-hardware-in-the-loop',
    title: 'HIL-Twin: Micro-ROS Hardware-in-the-Loop',
    shortTitle: 'HIL Micro-ROS Bench',
    category: 'digital-twins',
    sectorName: 'Digital Twin Sim Lab',
    sectorId: 'twin-dev',
    position: [6.8, 0, -4.2],
    rotation: [0, -0.45, 0],
    interactionRadius: 3.6,
    accentColor: '#a855f7',
    thumbnailUrl: '/images/digital_twin_unreal_ros.jpg',
    badgeText: 'Micro-ROS / FreeRTOS',
    description: 'Physical microcontroller firmware executing real-time control with simulated Unreal sensors.'
  }
];

// Architectural collision barriers for boundaries
export interface CollisionObstacle {
  type: 'box' | 'cylinder';
  x: number;
  z: number;
  radius?: number;
  width?: number;
  depth?: number;
}

export const WORLD_OBSTACLES: CollisionObstacle[] = [
  // Central reflection pond in park
  { type: 'cylinder', x: 0, z: 0, radius: 2.8 },

  // Park Perimeter Boundaries
  { type: 'cylinder', x: 0, z: -16.5, radius: 1.2 },
  { type: 'cylinder', x: 16.5, z: 0, radius: 1.2 },
  { type: 'cylinder', x: 0, z: 16.5, radius: 1.2 },
  { type: 'cylinder', x: -16.5, z: 0, radius: 1.2 }
];
