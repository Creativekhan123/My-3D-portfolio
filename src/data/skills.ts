import type { SkillDiscipline } from '../types/skills';

export const SKILL_DISCIPLINES: SkillDiscipline[] = [
  {
    id: 'unreal-gameplay',
    discipline: 'Unreal Engine & Gameplay Engineering',
    shortCode: 'UE5.SYS',
    description: 'High-performance interactive game architectures, animation locomotion pipelines, and deterministic systems built with modern C++ standards.',
    skills: [
      { name: 'Unreal Engine 5 (5.1 - 5.4)', focus: 'Core engine architecture, lifecycle, Subsystems, delegates, World Partition', highlight: true },
      { name: 'Modern C++ (C++17/20)', focus: 'Memory management, smart pointers, RAII, template meta-programming, cache-friendly data layouts', highlight: true },
      { name: 'Gameplay Ability System (GAS)', focus: 'Attributes, Gameplay Tags, Gameplay Effects, Gameplay Cues, target data replication', highlight: true },
      { name: 'Motion Warping & Distance Matching', focus: 'Adaptive dynamic trajectories, pose warping, foot IK, terrain alignment' },
      { name: 'Chaos Physics & Traces', focus: 'Substepping, custom collision channels, sweep trace buffers, physics constraints' },
      { name: 'Control Rig & Animation Blueprints', focus: 'Procedural IK solvers, state machines, blend spaces, bone transforms' }
    ],
    concreteTools: ['Unreal Engine 5.4', 'C++20', 'Visual Studio 2022', 'Rider for Unreal Engine', 'Unreal Insights Profiler', 'Perforce']
  },
  {
    id: 'multiplayer-networking',
    discipline: 'Networked Multiplayer & Blueprints',
    shortCode: 'NET.REP',
    description: 'Authoritative server architecture, client-side prediction, entity replication, and robust visual scripting for rapid prototyping.',
    skills: [
      { name: 'Authoritative Dedicated Servers', focus: 'Server-side validation, anti-cheat architectural invariants, tick rate budgeting', highlight: true },
      { name: 'Replication & RPCs', focus: 'Dormancy, custom serialization, condition replication, reliable vs unreliable RPCs' },
      { name: 'Client-Side Prediction & Reconciliation', focus: 'Autonomous proxy prediction, server error correction smoothing' },
      { name: 'Advanced Blueprints Architecture', focus: 'Pure function libraries, interface decoupling, macro libraries, event-driven patterns' }
    ],
    concreteTools: ['Unreal NetDriver', 'Dedicated Linux Game Servers', 'Wireshark Net Telemetry', 'Unreal Network Profiler']
  },
  {
    id: 'robotics-embedded',
    discipline: 'Robotics, Microcontrollers & Hardware Control',
    shortCode: 'EMB.ROB',
    description: 'Bare-metal firmware, sensor fusion, closed-loop actuator control, and real-time communication buses engineered for physical robots.',
    skills: [
      { name: 'Embedded C / Bare-Metal Programming', focus: 'Direct register manipulation, hardware timers, interrupts, DMA channels', highlight: true },
      { name: 'Microcontroller Platforms', focus: 'STM32 ARM Cortex-M4/M7, ESP32-S3 (Xtensa Dual-Core), RP2040, Arduino', highlight: true },
      { name: 'Cascaded Closed-Loop PID Control', focus: 'Velocity, position, and torque control with anti-windup and feed-forward terms' },
      { name: 'Sensory Acquisition & Filtering', focus: 'High-frequency ADC sampling, ambient light cancellation, Extended Kalman Filters' },
      { name: 'Hardware Communication Protocols', focus: 'CAN-FD, SPI, I2C, UART, RS-485, USB CDC Serial' },
      { name: 'Motor Drive & Power Electronics', focus: 'H-Bridges, Field-Oriented Control (FOC), stepper drivers, LiPo battery telemetry' },
      { name: 'PCB Schematic & Layout', focus: 'KiCad 8, 4-layer routing, impedance matching, power plane decoupling' }
    ],
    concreteTools: ['STM32CubeIDE', 'KiCad 8', 'Saleae Logic Analyzer', 'Digital Storage Oscilloscope', 'FreeRTOS', 'PlatformIO']
  },
  {
    id: 'robotics-frameworks',
    discipline: 'ROS2 & Kinematic Trajectory Planning',
    shortCode: 'ROS2.IK',
    description: 'Distributed robotics operating software, spatial kinematic coordinate transformations, and robot manipulator motion planning.',
    skills: [
      { name: 'ROS2 (Humble / Iron)', focus: 'Nodes, publishers/subscribers, actions, services, QoS policies, lifecycle nodes', highlight: true },
      { name: 'MoveIt2 & Motion Planning', focus: 'OMPL planning pipelines, Cartesian paths, obstacle collision avoidance' },
      { name: 'Analytical & Numerical Kinematics', focus: 'Denavit-Hartenberg (D-H) formulation, Jacobian matrices, singularity handling', highlight: true },
      { name: 'URDF & Xacro Modeling', focus: 'Visual meshes, collision hulls, joint limits, inertial tensor matrices' },
      { name: 'Micro-ROS', focus: 'Running ROS2 DDS node clients directly on STM32 / ESP32 microcontrollers' }
    ],
    concreteTools: ['ROS2 Humble', 'MoveIt2', 'RViz2', 'FastDDS / CycloneDDS', 'Foxglove Studio', 'SolidWorks CAD']
  },
  {
    id: 'simulation-digital-twins',
    discipline: 'Simulation & Digital Twin Development',
    shortCode: 'SIM.TWN',
    description: 'Bridging the physical and virtual domains through synchronous physics simulation, synthetic sensor emulation, and hardware-in-the-loop pipelines.',
    skills: [
      { name: 'Cyber-Physical Digital Twins', focus: 'Bidirectional state synchronization between physical actuators and virtual models', highlight: true },
      { name: 'Synthetic Sensor Generation', focus: 'GPU-accelerated LiDAR point clouds, synthetic depth cameras, raycast radar', highlight: true },
      { name: 'Hardware-In-The-Loop (HIL) Testing', focus: 'Simulated environment validation before deployment to physical hardware' },
      { name: 'Mass Entity Component System', focus: 'High-density multi-agent swarm simulation, spatial partitioning' },
      { name: 'Physics Friction & Inertia Tuning', focus: 'Step-response calibration between real-world materials and Chaos physics engines' }
    ],
    concreteTools: ['Unreal Engine 5.4 Simulation', 'ROS2-UE5 Bridge Plugin', 'Niagara Compute Shaders', 'WebRTC Telemetry']
  },
  {
    id: 'interactive-web-3d',
    discipline: 'Three.js & Interactive Visualization',
    shortCode: 'WEB.3D',
    description: 'Hardware-accelerated web experiences, real-time 3D canvas interaction, custom shaders, and responsive engineering interfaces.',
    skills: [
      { name: 'Three.js & WebGL', focus: 'Scene graphs, custom buffer geometries, PBR materials, lighting composition, render loops', highlight: true },
      { name: 'React Three Fiber & Drei', focus: 'Declarative 3D components, camera controls, raycasting, frame-rate budgeting' },
      { name: 'TypeScript & Modern Web Standards', focus: 'Strict types, semantic HTML5, zero-bloat CSS systems, accessibility' },
      { name: 'Telemetry Dashboards & Data Streaming', focus: 'WebSockets, canvas telemetry charts, low-latency state rendering' }
    ],
    concreteTools: ['Three.js', 'React 19', 'React Three Fiber', 'TypeScript', 'Vite', 'Canvas API']
  }
];
