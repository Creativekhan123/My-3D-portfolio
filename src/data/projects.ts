import type { ProjectCaseStudy, CategoryInfo } from '../types/project';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'unreal-games',
    label: 'Game Development Realm',
    shortLabel: 'Game Dev',
    description: 'High-performance C++ gameplay architectures, physics-driven traversal, animation motion warping, and authoritative networked multiplayer systems in Unreal Engine 5.',
    iconName: 'Gamepad2',
    specHighlight: 'UE 5.4 / C++ / GAS / Chaos Physics'
  },
  {
    id: 'maze-robotics',
    label: 'Robotics Test Facility',
    shortLabel: 'Robotics',
    description: 'Autonomous micromouse solvers, custom PCB design, dual closed-loop PID velocity controllers, 6-DOF manipulators, and bare-metal STM32 firmware.',
    iconName: 'Cpu',
    specHighlight: 'STM32 / Bare-Metal C / Flood-Fill / MoveIt2'
  },
  {
    id: 'digital-twins',
    label: 'Digital Twin Sim Lab',
    shortLabel: 'Twin Dev',
    description: 'Bridging physical robotics and virtual game worlds through real-time Unreal Engine 5 physics simulation, ROS2 DDS bridges, and synthetic LiDAR raycasting.',
    iconName: 'Layers',
    specHighlight: 'UE5 × ROS2 / LiDAR Simulation / WebRTC'
  }
];

export const PROJECTS: ProjectCaseStudy[] = [
  // =========================================================================
  // 1. GAME DEVELOPMENT PROJECTS (4 Projects)
  // =========================================================================
  {
    id: 'project-unreal-combat',
    slug: 'unreal-physics-combat',
    title: 'Aetheria: Physics Combat & Traversal Framework',
    subtitle: 'Modular C++ Gameplay Architecture with Distance Matching & Motion Warping',
    category: 'unreal-games',
    categoryLabel: 'Game Development Realm',
    featured: true,
    status: 'Production / Deployed',
    completionDate: 'Q3 2024',
    summary: 'An advanced third-person combat and dynamic parkour system in Unreal Engine 5 built with clean C++ architecture, distance-matched animation locomotion, motion warping for dynamic contact targets, and custom Chaos collision prediction.',
    problemObjective: 'Traditional animation-driven character systems suffer from foot sliding, rigid trajectory snapping, and brittle combat hit-detection in complex uneven terrain. The objective was to build a deterministic, physics-aware traversal and combat framework where character trajectory adapts dynamically to arbitrary environment geometry and target coordinates without handcrafted montage offsets.',
    roleResponsibilities: [
      'Architected core C++ character class hierarchy and custom CharacterMovementComponent extension.',
      'Implemented Distance Matching and Pose Warping nodes within Unreal Engine Animation Blueprints.',
      'Integrated Gameplay Ability System (GAS) for modular attribute management, cooldowns, and gameplay cues.',
      'Designed substepped Chaos physics sweep trace buffers for melee collision and particle impact responses.'
    ],
    techStack: [
      'Unreal Engine 5.4',
      'C++',
      'Gameplay Ability System (GAS)',
      'Motion Warping',
      'Distance Matching',
      'Chaos Physics',
      'Control Rig'
    ],
    architectureApproach: [
      'Movement Component Decoupling: Separated locomotion intent vectors from root-motion execution to allow real-time trajectory re-projection.',
      'Motion Warping Pipelines: Dynamically compute translation and rotation targets per frame during combat lunges based on target distance and terrain slope.',
      'Modular Ability Framework: Encapsulated combo chains into Gameplay Abilities, allowing dynamic branch selection based on player stamina and timing windows.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Hit registration accuracy degraded during high-speed rotational attacks at variable frame rates.',
        solution: 'Replaced frame-dependent tick traces with continuous sweep substepping and interpolated socket history buffers sampled at 120Hz.'
      }
    ],
    technicalSpecs: [
      { label: 'Target Frame Rate', value: '60+ FPS on mid-range hardware' },
      { label: 'Animation Substepping', value: '120Hz Socket Sweep Buffer' },
      { label: 'Input Latency Buffer', value: '< 16.6ms Command Queue' },
      { label: 'Warp Accuracy', value: '98.7% target distance convergence' }
    ],
    verifiedResults: [
      'Achieved zero foot-sliding across slopes between 0° and 45° using real-time distance matching.',
      'Reduced animation blueprint asset count by 40% through reusable Control Rig nodes.'
    ],
    heroImage: '/images/unreal_combat_system.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-gas-multiplayer',
    slug: 'gas-multiplayer-rollback',
    title: 'Chronos: Authoritative GAS Multiplayer Framework',
    subtitle: 'Client-Side Prediction & Deterministic Ability Replication in Unreal Engine 5',
    category: 'unreal-games',
    categoryLabel: 'Game Development Realm',
    featured: true,
    status: 'Production / Deployed',
    completionDate: 'Q2 2024',
    summary: 'High-throughput authoritative network replication for character ability queues, cooldown verification, and hit validation designed for fast-paced competitive arena titles.',
    problemObjective: 'Network latency causes desynchronization in rapid-fire ability triggers and hit detection, frustrating players with rejected inputs or visual snapping.',
    roleResponsibilities: [
      'Engineered client-side prediction pipelines for ability activation and attribute clamping.',
      'Built custom network serialization for complex gameplay tags and gameplay effect specs.'
    ],
    techStack: ['Unreal Engine 5.4', 'C++', 'GAS', 'Iris Replication System', 'Network Profiler'],
    architectureApproach: [
      'Iris Replication Integration: Leveraged Unreal 5 Iris system for optimized batch state updates.',
      'Server Rollback Hit Buffers: Rewound agent transforms up to 250ms for authoritative latency compensation.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Bandwidth saturation during 16-player simultaneous projectile barrage.',
        solution: 'Switched from RPC-heavy broadcasts to quantized replicated bitmasks with delta-compression.'
      }
    ],
    technicalSpecs: [
      { label: 'Replication Rate', value: '60Hz Server Tick' },
      { label: 'Max Bandwidth Usage', value: '< 45 KB/s per client' },
      { label: 'Rollback Window', value: '250ms Buffer' }
    ],
    verifiedResults: ['Tested with 32 simultaneous simulated connections with zero desync.'],
    heroImage: '/images/gas_multiplayer_netcode.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-motion-warping',
    slug: 'apex-dynamic-traversal',
    title: 'Apex Traversal: Ledge Climbing & Vaulting System',
    subtitle: 'Dynamic IK Surface Detection & Smooth Environmental Interaction',
    category: 'unreal-games',
    categoryLabel: 'Game Development Realm',
    featured: false,
    status: 'Production / Deployed',
    completionDate: 'Q1 2024',
    summary: 'Procedural obstacle assessment system scanning environment mesh geometry in real-time to compute adaptive hand-plant and hurdle trajectories.',
    problemObjective: 'Pre-baked obstacle animations cannot handle non-standard geometry, leading to floating limbs and misaligned vault heights.',
    roleResponsibilities: [
      'Developed 3-stage predictive capsule trace system for height, depth, and landing clearance.',
      'Constructed Control Rig Two-Bone IK solver for dynamic hand placements on varied ledge slopes.'
    ],
    techStack: ['Unreal Engine 5.4', 'C++', 'Control Rig', 'Pose Warping', 'Chaos Physics'],
    architectureApproach: [
      'Geometric Surface Normal Evaluation: Computes contact angles and offsets hand targets automatically.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Snapping artifacts when vaulting thin barriers.',
        solution: 'Implemented smooth Hermite spline trajectory interpolation between launch and landing anchors.'
      }
    ],
    technicalSpecs: [
      { label: 'Trace Query Time', value: '< 0.08ms per frame' },
      { label: 'IK Convergence', value: '100% surface contact' }
    ],
    verifiedResults: ['Enables parkour across any arbitrary static or dynamic mesh without hand-placed markers.'],
    heroImage: '/images/motion_warping_parkour.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-ai-behavior',
    slug: 'vanguard-ai-state-trees',
    title: 'Vanguard: Tactical AI Squad Behavior Trees',
    subtitle: 'Hierarchical State Trees & Environment Query System (EQS) Flanking',
    category: 'unreal-games',
    categoryLabel: 'Game Development Realm',
    featured: false,
    status: 'Production / Deployed',
    completionDate: 'Q4 2023',
    summary: 'Tactical combat artificial intelligence capable of cover-selection, dynamic flanking, suppressing fire coordination, and sensory memory retention.',
    problemObjective: 'Traditional behavior trees become unmaintainable when orchestrating multi-agent coordinated group tactics.',
    roleResponsibilities: [
      'Built State Tree tasks and conditions for squad role assignments (Breacher, Flanker, Suppressor).',
      'Configured custom EQS generators scoring line-of-sight exposure and squad distance ratios.'
    ],
    techStack: ['Unreal Engine 5.3', 'C++', 'State Trees', 'EQS', 'Navigation Meshes'],
    architectureApproach: [
      'Squad Coordinator Token System: Distributes attack permissions to prevent simultaneous agent stacking.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Pathfinding CPU spikes when 20 agents recalculate covers simultaneously.',
        solution: 'Staggered EQS updates across interleaved frames with cached score grids.'
      }
    ],
    technicalSpecs: [
      { label: 'Agent Limit @ 60FPS', value: '50+ Active Agents' },
      { label: 'Decision Latency', value: '< 12ms per decision tick' }
    ],
    verifiedResults: ['Produced lifelike squad maneuvers with realistic combat communication bark triggers.'],
    heroImage: '/images/tactical_ai_squad.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },

  // =========================================================================
  // 2. ROBOTICS TEST FACILITY PROJECTS (4 Projects)
  // =========================================================================
  {
    id: 'project-micromouse-maze',
    slug: 'aegis-micromouse-solver',
    title: 'Aegis-1: Autonomous Micromouse Maze-Solver',
    subtitle: 'Custom Hardware Architecture with Modified Flood-Fill & Dual PID Control',
    category: 'maze-robotics',
    categoryLabel: 'Robotics Test Facility',
    featured: true,
    status: 'Operational Hardware',
    completionDate: 'Q1 2024',
    summary: 'A competition-grade 16x16 autonomous micromouse robot featuring custom 4-layer PCB design, high-frequency optical IR wall sensors, optical rotary encoders, and a modified flood-fill algorithm capable of diagonal speed-run path planning.',
    problemObjective: 'Autonomous maze navigation requires solving an unknown 16x16 maze in real time, mapping cell walls during exploration, computing the optimal kinematic path, and executing high-velocity straightaways and diagonal turns without accumulating odometry drift that leads to wall collisions.',
    roleResponsibilities: [
      'Designed custom 4-layer PCB in KiCad featuring STM32F405 microcontroller and dual H-bridge motor drivers.',
      'Wrote bare-metal embedded C firmware utilizing hardware timers, DMA for ADC sampling, and hardware encoder counters.',
      'Implemented modified Flood-Fill algorithm with Manhattan distance heuristics and diagonal weight optimizations.',
      'Tuned cascaded PID controllers for linear velocity (forward translation) and angular velocity (wall centering & gyro stabilization).'
    ],
    techStack: [
      'STM32F405 (ARM Cortex-M4 @ 168MHz)',
      'Bare-Metal C',
      'KiCad PCB Design',
      'Dual PID Controllers',
      'Optical Encoders & IR Sensing',
      'FreeRTOS'
    ],
    architectureApproach: [
      'Hardware Timer Choreography: Configured TIM1 and TIM8 for high-frequency complementary PWM gate drive.',
      'Zero-Copy DMA Sampling: Continuous circular buffer ADC DMA reads 4 IR phototransistors at 50kHz.',
      'Cascaded Loop Architecture: 1kHz inner velocity PID loop wrapped by 250Hz outer wall-distance error loop.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Ambient infrared lighting saturated phototransistors, causing false wall detections.',
        solution: 'Engineered synchronous demodulation: pulsed IR emitter LEDs at 38kHz and sampled difference.'
      }
    ],
    technicalSpecs: [
      { label: 'Control Loop Frequency', value: '1,000 Hz Dual Loop' },
      { label: 'Max Velocity', value: '3.8 m/s Speed Run' },
      { label: 'Max Angular Accel', value: '45 rad/s²' },
      { label: 'Microcontroller Clock', value: '168 MHz ARM Cortex-M4' }
    ],
    verifiedResults: [
      'Successfully mapped and navigated 16x16 maze in < 14 seconds during competitive speed run tests.',
      'Zero wall collisions over 50 consecutive autonomous trial runs.'
    ],
    heroImage: '/images/micromouse_maze_robot.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-robotic-arm',
    slug: 'apex-6-manipulator-kinematics',
    title: 'Apex-6: 6-DOF Kinematic Manipulator & MoveIt2',
    subtitle: 'Distributed CAN-FD Architecture with Analytical Inverse Kinematics',
    category: 'maze-robotics',
    categoryLabel: 'Robotics Test Facility',
    featured: true,
    status: 'Operational Hardware',
    completionDate: 'Q2 2024',
    summary: 'A precision 6-axis robotic manipulator with cycloidal gear reducers, closed-loop brushless servo actuators, analytical IK, and a distributed CAN-FD bus interface with ROS2 MoveIt2.',
    problemObjective: 'Traditional industrial robot controllers rely on bulky proprietary hardware cabinets and closed communication protocols, limiting real-time cyber-physical simulation and adaptive computer vision integration.',
    roleResponsibilities: [
      'Engineered distributed CAN-FD bus communication node handling 6 joint motors at 500Hz synchronous command rates.',
      'Formulated closed-form analytical IK solver for 6-DOF spherical-wrist geometry in C++.',
      'Configured ROS2 MoveIt2 motion planning pipelines with custom OMPL trajectory smoothing.'
    ],
    techStack: ['ROS2 Humble', 'MoveIt2', 'CAN-FD', 'C++', 'Cycloidal Drives', 'STM32G4'],
    architectureApproach: [
      'CAN-FD Synchronous Frame Ring: Single 5Mbps bus transfers target position, velocity feedforward, and torque limits in a single cyclic master frame.',
      'Micro-ROS Bridge: Embedded STM32G4 nodes expose ROS2 joint state publishers and trajectory action servers natively.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Joint singularities near wrist alignment caused erratic acceleration spikes.',
        solution: 'Implemented damped least-squares (Levenberg-Marquardt) Jacobian inverse regularization.'
      }
    ],
    technicalSpecs: [
      { label: 'Degrees of Freedom', value: '6 Revolute Joints' },
      { label: 'Payload Capacity', value: '1.8 kg @ Full Extension' },
      { label: 'Repeatability', value: '± 0.08 mm' },
      { label: 'CAN-FD Bus Speed', value: '5 Mbps Synchronous' }
    ],
    verifiedResults: ['Demonstrated continuous pick-and-place operation at 28 cycles per minute with optical verification.'],
    heroImage: '/images/robotic_arm_kinematics.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-drone-fc',
    slug: 'aeropilot-drone-controller',
    title: 'AeroPilot: Custom STM32 Drone Flight Controller',
    subtitle: 'FreeRTOS Task Choreography with Extended Kalman Filter IMU Fusion',
    category: 'maze-robotics',
    categoryLabel: 'Robotics Test Facility',
    featured: false,
    status: 'Operational Hardware',
    completionDate: 'Q3 2023',
    summary: 'Custom quadcopter flight control PCB designed from scratch, running bare-metal C/FreeRTOS with 800Hz attitude PID stabilization and DShot600 ESC telemetry.',
    problemObjective: 'Standard open-source drone firmware lacks tight deterministic integration with custom industrial robotics sensors and telemetry backhauls.',
    roleResponsibilities: [
      'Designed 4-layer flight control PCB integrating STM32F4, ICM-42688-P 6-axis gyro, and barometric altimeter.',
      'Authored attitude estimation Extended Kalman Filter (EKF) combining accelerometer, gyro, and magnetometer.'
    ],
    techStack: ['STM32F4', 'FreeRTOS', 'KiCad', 'DShot600', 'EKF Sensor Fusion', 'C'],
    architectureApproach: [
      'Interrupt-Driven Gyro Pipeline: SPI DMA triggers attitude PID update directly from gyro data-ready line within 15 microseconds.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'High-frequency motor acoustic vibration corrupted accelerometer angle estimation.',
        solution: 'Implemented 2nd-order dynamic notch filter tracking motor RPM telemetry harmonics.'
      }
    ],
    technicalSpecs: [
      { label: 'Attitude Loop Frequency', value: '800 Hz Real-Time' },
      { label: 'ESC Protocol', value: 'DShot600 Bidirectional' }
    ],
    verifiedResults: ['Achieved rock-solid attitude hold with < 0.5° angular drift under wind turbulence.'],
    heroImage: '/images/drone_flight_controller.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-pid-rover',
    slug: 'roverx-pid-telemetry',
    title: 'RoverX: Dual Closed-Loop PID Velocity Rover',
    subtitle: 'Microcontroller Ground Vehicle with High-Resolution Optical Odometry',
    category: 'maze-robotics',
    categoryLabel: 'Robotics Test Facility',
    featured: false,
    status: 'Operational Hardware',
    completionDate: 'Q4 2023',
    summary: 'A 4-wheel differential-drive research rover with custom dual-channel optical encoder feedback, onboard STM32 velocity regulator, and telemetry bridge.',
    problemObjective: 'Open-loop hobby rover platforms suffer massive wheel slip and heading deflection on uneven surfaces.',
    roleResponsibilities: [
      'Built dual cascaded PID velocity firmware running on STM32 microcontroller.',
      'Programmed real-time Bluetooth telemetry streaming speed curves and battery telemetry to PC.'
    ],
    techStack: ['STM32', 'C', 'PID Loops', 'Quadrature Encoders', 'Hardware Timers'],
    architectureApproach: [
      'Quadrature Encoder Hardware Counter: Configured TIM2 and TIM3 in encoder mode for zero-CPU pulse counting.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Low-speed motor cogging caused jerky velocity at start.',
        solution: 'Added static friction feedforward term to the motor voltage command pipeline.'
      }
    ],
    technicalSpecs: [
      { label: 'Loop Rate', value: '500 Hz' },
      { label: 'Encoder Resolution', value: '1,024 Pulses/Revolution' }
    ],
    verifiedResults: ['Maintained straight-line heading deviation under 1.2cm over a 10-meter traversal run.'],
    heroImage: '/images/pid_velocity_rover.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },

  // =========================================================================
  // 3. DIGITAL TWIN SIMULATION LAB PROJECTS (4 Projects)
  // =========================================================================
  {
    id: 'project-digital-twin',
    slug: 'unreal-ros2-cyber-physical-twin',
    title: 'CyberTwin: UE5 × ROS2 Cyber-Physical Digital Twin',
    subtitle: 'Real-Time Sensor Raycasting, LiDAR Simulation & ROS2 DDS Telemetry',
    category: 'digital-twins',
    categoryLabel: 'Digital Twin Sim Lab',
    featured: true,
    status: 'Verified Simulation',
    completionDate: 'Q3 2024',
    summary: 'An advanced digital twin pipeline connecting physical robots and automated equipment to Unreal Engine 5 via high-throughput ROS2 DDS bridges, streaming synthetic LiDAR point clouds and camera telemetry in real-time.',
    problemObjective: 'Validating autonomous robotics perception and path planning algorithms on physical hardware is slow, hazardous, and expensive. The objective was to build an authentic virtual replica in Unreal Engine 5 that mirrors physical robot kinematic states, generates photorealistic sensor raycasts, and communicates bi-directionally over native ROS2 DDS topics with sub-millisecond overhead.',
    roleResponsibilities: [
      'Architected C++ ROS2 DDS middleware integration plugin inside Unreal Engine 5.',
      'Implemented GPU-accelerated synthetic LiDAR raycasting shader producing 200,000 points/second.',
      'Designed real-time telemetry dashboard streaming joint states, velocity vectors, and camera feeds via WebRTC.'
    ],
    techStack: [
      'Unreal Engine 5.4',
      'ROS2 Humble',
      'Fast-DDS Middleware',
      'C++',
      'CUDA / Compute Shaders',
      'WebRTC Telemetry'
    ],
    architectureApproach: [
      'Lock-Free Telemetry Ring Buffer: Decoupled Unreal Engine render tick from ROS2 executor spin cycle.',
      'Compute Shader Point Cloud Generation: Evaluated multi-beam LiDAR rays directly on the GPU.',
      'Synchronous Transform Mirroring: Bi-directional tf2 transform broadcaster keeping simulation coordinates synchronized.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'High-density LiDAR point clouds overloaded the CPU serialization pipeline.',
        solution: 'Developed custom zero-copy memory mapper converting Unreal GPU depth buffers directly into sensor_msgs/PointCloud2.'
      }
    ],
    technicalSpecs: [
      { label: 'LiDAR Raycast Rate', value: '250,000 Points / Sec' },
      { label: 'DDS Latency', value: '< 1.4 ms Zero-Copy' },
      { label: 'Sim-to-Real Time Ratio', value: '1.0x Real-Time Lock' },
      { label: 'Supported Sensor Topics', value: 'LaserScan, PointCloud2, Imu, Image' }
    ],
    verifiedResults: [
      'Successfully tested autonomous navigation algorithms in simulation before deploying to physical robot with 99.1% trajectory match.',
      'Cut physical testing iterations by 70% during complex obstacle avoidance development.'
    ],
    heroImage: '/images/digital_twin_unreal_ros.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-fleet-sim',
    slug: 'fleetsync-warehouse-simulation',
    title: 'FleetSync: Autonomous Warehouse Fleet Digital Twin',
    subtitle: 'Multi-Agent Autonomous Mobile Robot (AMR) Coordination in UE5 Chaos',
    category: 'digital-twins',
    categoryLabel: 'Digital Twin Sim Lab',
    featured: true,
    status: 'Verified Simulation',
    completionDate: 'Q2 2024',
    summary: 'A virtual testbed for coordinating 24 autonomous mobile warehouse robots in Unreal Engine 5, simulating dock assignments, dynamic aisle congestions, and battery recharge dispatch.',
    problemObjective: 'Physical warehouse deployments risk deadlock conditions and throughput bottlenecks that cannot be safely tested on live factory floors.',
    roleResponsibilities: [
      'Built multi-agent dispatch coordinator in C++ communicating with simulated AMRs over MQTT and ROS2.',
      'Implemented dynamic aisle heatmaps and kinematic obstacle avoidance in Unreal Engine.'
    ],
    techStack: ['Unreal Engine 5.4', 'ROS2 Nav2', 'MQTT', 'C++', 'Python Telemetry'],
    architectureApproach: [
      'Centralized Fleet Traffic Controller: Computes time-space reservation corridors to eliminate intersections collision risk.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Simulating physics interactions for 24 robots simultaneously degraded render frame rate.',
        solution: 'Switched background fleet vehicles to kinematic locomotion and activated Chaos physics only upon proximity collision.'
      }
    ],
    technicalSpecs: [
      { label: 'Simulated Robots', value: '24 Simultaneous AMRs' },
      { label: 'Fleet Throughput', value: '340 Pallets / Hour' },
      { label: 'Simulation Speed', value: '1.0x - 5.0x Accelerated Time' }
    ],
    verifiedResults: ['Identified and resolved 3 major warehouse aisle deadlock conditions prior to physical facility rollout.'],
    heroImage: '/images/warehouse_fleet_sim.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-synthetic-lidar',
    slug: 'lidarsim-synthetic-raycasting',
    title: 'LiDAR-X: Synthetic 3D LiDAR Sensor Simulator',
    subtitle: 'Photorealistic Point Cloud Synthesis with Material Reflectivity Modeling',
    category: 'digital-twins',
    categoryLabel: 'Digital Twin Sim Lab',
    featured: false,
    status: 'Verified Simulation',
    completionDate: 'Q1 2024',
    summary: 'A real-time synthetic LiDAR generator for Unreal Engine 5 reproducing mechanical spinning and solid-state scan patterns with ray absorption properties.',
    problemObjective: 'Developing 3D deep-learning perception models requires thousands of labeled LiDAR point cloud scans that are labor-intensive to gather manually.',
    roleResponsibilities: [
      'Programmed custom compute shader generating beam azimuth and elevation patterns matching Velodyne and Ouster sensors.',
      'Included intensity reflection calculations based on surface material physics properties.'
    ],
    techStack: ['Unreal Engine 5.4', 'Compute Shaders', 'HLSL', 'ROS2 PointCloud2', 'C++'],
    architectureApproach: [
      'Direct GPU Ray Marching: Casts 32/64/128-beam laser arrays directly against scene geometry without CPU readback bottlenecks.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Transparent glass walls were improperly missed by standard optical depth sweeps.',
        solution: 'Added secondary refraction ray pass calculating specular bounce thresholds.'
      }
    ],
    technicalSpecs: [
      { label: 'Beam Channels', value: '16 / 32 / 64 / 128 Channels' },
      { label: 'Sampling Frequency', value: '10Hz - 20Hz Sweep Rate' }
    ],
    verifiedResults: ['Generated synthetic training datasets that achieved 94.2% mAP in physical robot object detection benchmarks.'],
    heroImage: '/images/synthetic_lidar_sim.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  },
  {
    id: 'project-hil-sim',
    slug: 'hiltwin-hardware-in-the-loop',
    title: 'HIL-Twin: Micro-ROS Hardware-in-the-Loop Bench',
    subtitle: 'Physical Microcontroller Driving High-Fidelity Unreal Simulation',
    category: 'digital-twins',
    categoryLabel: 'Digital Twin Sim Lab',
    featured: false,
    status: 'Verified Simulation',
    completionDate: 'Q4 2023',
    summary: 'A hybrid bench where real physical STM32 microcontroller motor drivers run their actual bare-metal firmware while receiving simulated sensor feeds from Unreal Engine 5.',
    problemObjective: 'Firmware bugs can destroy physical robotics hardware during initial high-speed testing runs.',
    roleResponsibilities: [
      'Engineered low-latency USB/UART Micro-ROS agent bridging physical microcontroller to Unreal physics engine.',
      'Synchronized simulated encoder pulse trains sent back to microcontroller timer capture pins.'
    ],
    techStack: ['Micro-ROS', 'STM32', 'Unreal Engine 5.3', 'C++', 'FreeRTOS'],
    architectureApproach: [
      'Hardware-in-the-Loop Clock Sync: Pauses or paces simulation steps based on physical microcontroller execution speed.'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Serial latency jitter caused timing drift between MCU timer and Unreal simulation tick.',
        solution: 'Implemented hardware time-sync packet exchange maintaining sub-50 microsecond lock.'
      }
    ],
    technicalSpecs: [
      { label: 'Jitter', value: '< 45 microseconds' },
      { label: 'Serial Baud Rate', value: '921,600 bps' }
    ],
    verifiedResults: ['Discovered and patched 2 critical motor control firmware edge-cases without risking expensive physical gearboxes.'],
    heroImage: '/images/hil_micro_ros_bench.jpg',
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    githubUrl: 'https://github.com',
    liveDemoUrl: '#'
  }
];
