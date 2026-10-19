# DEVVERSE — Interactive 3D Low-Poly Game Portfolio

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-000000?logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)

An interactive, high-performance **3D Game-Type Web Portfolio** built with **React Three Fiber**, **Three.js**, and **TypeScript**. Designed specifically for cross-platform hardware, supporting desktop computers, Android phones, tablets, and touchscreen Windows laptops with zero required external heavy animation downloads.

---

## 🌟 Key Architecture & Highlights

### 1. Scenic Greenery Park Hub
- **Balanced, Natural Lighting**: Soft warm sunlight, ambient ground bounce, and mist atmosphere without harsh glare.
- **Lush Low-Poly Park Environment**: Hand-crafted low-poly pine trees, deciduous shade trees, flowering pink cherry trees, wooden park benches, lanterns, flower beds, and a central reflection pond with floating water lilies.
- **3 Thematic Gateway Doors**:
  - 🎮 **As a Game Developer**: Arched portal with floating power crystals and glowing combat runes leading into the Unreal Engine Game Dev Realm.
  - 🤖 **As a Roboticist**: Industrial steel portal with caution hazard stripes leading into the Autonomous Robotics Test Facility.
  - 🌐 **As a Twin Developer**: Cyber-physical holographic portal leading into the Digital Twin Simulation Lab.

### 2. The 3 Specialized Level Realms & 12 LED TVs
Each realm features **4 Interactive LED TV Monitors** displaying real-time project media, architecture telemetry, and video showcases:
- **Game Development Realm**:
  1. *Aetheria*: Physics-Driven Combat & Traversal (UE 5.4 / C++ / GAS / Motion Warping)
  2. *Chronos*: Authoritative GAS Multiplayer Framework (Iris Replication / Rollback)
  3. *Apex Traversal*: Ledge Vaulting & Dynamic IK Climbing (Control Rig / Pose Warping)
  4. *Vanguard*: Tactical AI Squad Behavior Trees (State Trees / EQS Flanking)
- **Robotics Test Facility**:
  1. *Aegis-1*: Autonomous 16x16 Micromouse Maze-Solver (STM32 / Bare-Metal C / Dual PID)
  2. *Apex-6*: 6-DOF Kinematic Robotic Manipulator (ROS2 Humble / MoveIt2 / CAN-FD)
  3. *AeroPilot*: Custom STM32 Quadcopter Flight Controller (FreeRTOS / IMU EKF)
  4. *RoverX*: Dual Closed-Loop Velocity Rover (Encoder Odometry / Motor Control)
- **Digital Twin Sim Lab (Robotics + Game Dev Hybrid)**:
  1. *CyberTwin*: UE5 × ROS2 Cyber-Physical Digital Twin (Fast-DDS / Synthetic LiDAR)
  2. *FleetSync*: Autonomous Warehouse Multi-AMR Fleet Simulation (UE5 Chaos / Nav2)
  3. *LiDAR-X*: Real-Time Synthetic 3D LiDAR Point Cloud Simulator (GPU Compute Shaders)
  4. *HIL-Twin*: Hardware-in-the-Loop Micro-ROS Simulation Bench (STM32 / WebRTC)

---

## 🕹️ Dual Avatar System

Switch anytime between two avatars using the **HUD Toggle** or pressing keyboard **[V]**:

1. **🤖 Cartoonist Robot Character**:
   - Cute Astro/Wall-E inspired porcelain chassis.
   - Large glowing cartoon eyes that blink periodically.
   - Bouncy coiled spring antenna with glowing blue orb.
   - Glowing heart core on the chest.
   - Procedural walking waddle, knee flexion, and arm gestures toward project monitors.
2. **🏎️ Microcontroller Robot Rover**:
   - Authentic DIY maker robotics chassis.
   - Dual-tier green PCB chassis board with silkscreen trace patterns.
   - Blue microcontroller board with microchip, crystal oscillator, and blinking status LEDs.
   - Front-mounted HC-SR04 ultrasonic sensor "eyes".
   - 4 classic yellow/black robotics hobby wheels that spin and steer with physics.

---

## 📱 Cross-Device Controls

- **Desktop (Keyboard & Mouse)**:
  - `W, A, S, D` or `Arrow Keys`: Move / Drive
  - `Mouse Drag`: 360° Camera Orbit
  - `Scroll Wheel`: Smooth Camera Zoom
  - `V`: Switch Avatar (Cartoon Robot 🤖 / Microcontroller Rover 🏎️)
  - `E` or `Enter`: Enter Doors & Watch Project TV
  - `Escape`: Close Modals / Exit Fullscreen
- **Android Phones, Tablets & Touchscreen Laptops**:
  - **Virtual Joystick (Lower Left)**: 360° touch-isolated analog thumbstick.
  - **Right Screen Drag**: Smooth independent camera rotation.
  - **Action Pill Button (Lower Right)**: Contextual button for entering doors and launching project TV showcases.
  - **Fullscreen Video Button**: Immediate full-screen video with dedicated Exit button.
- **Archive (2D) Mode**: Direct non-3D access to all 12 projects and architect dossier.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite 8
- **3D Engine**: Three.js, @react-three/fiber, @react-three/drei
- **Icons**: Lucide React
- **Styling**: Vanilla CSS tokens with Glassmorphism and responsive safe areas

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Creativekhan123/My-3D-portfolio.git
cd My-3D-portfolio
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🎬 Customizing Your Projects & Videos

All project data, video links, thumbnails, and technical dossiers are centralized in:
`src/data/projects.ts`

Simply replace:
- `demoVideoUrl`: with your own MP4 video link or video stream.
- `heroImage`: with your project screenshot in `/public/images/`.
- `title`, `summary`, `techStack`, `githubUrl`, and `liveDemoUrl`.

---

## 📄 License
MIT License. Created by Creativekhan123.
