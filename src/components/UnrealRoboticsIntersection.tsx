import React, { useState } from 'react';
import { Activity, Radio, ShieldCheck, ArrowRight } from 'lucide-react';

interface UnrealRoboticsIntersectionProps {
  onOpenCaseStudy: (projectSlug: string) => void;
}

export const UnrealRoboticsIntersection: React.FC<UnrealRoboticsIntersectionProps> = ({ onOpenCaseStudy }) => {
  const [activeTab, setActiveTab] = useState<'hil' | 'sensors' | 'kinematics'>('hil');
  const [isSimulating, setIsSimulating] = useState(true);

  return (
    <section id="convergence" style={{ padding: '5.5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pretitle">
            <span className="badge-dot" />
            <span>CYBER-PHYSICAL INTERSECTION // THE CONVERGENCE</span>
          </div>
          <h2 className="section-title">Unreal Engine 5 × Physical Robotics</h2>
          <p className="section-description">
            Modern robotics engineering cannot rely solely on dry numerical charts or fragile hardware prototypes. By coupling Unreal Engine 5's deterministic Chaos physics with bare-metal microcontrollers and ROS2, we unlock true Hardware-In-The-Loop digital twin simulation.
          </p>
        </div>

        {/* Feature Comparison Studio Panel */}
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-medium)',
            background: 'var(--bg-panel)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0'
          }}
          className="convergence-panel-grid"
        >
          {/* Top Interactive Mode Selector */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'rgba(12, 16, 23, 0.9)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('hil')}
                style={{
                  padding: '0.45rem 0.875rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  border: `1px solid ${activeTab === 'hil' ? 'var(--accent-amber)' : 'var(--border-subtle)'}`,
                  background: activeTab === 'hil' ? 'var(--accent-amber-subtle)' : 'transparent',
                  color: activeTab === 'hil' ? 'var(--accent-amber)' : 'var(--tech-slate-400)'
                }}
              >
                01 // HARDWARE-IN-THE-LOOP (HIL)
              </button>

              <button
                onClick={() => setActiveTab('sensors')}
                style={{
                  padding: '0.45rem 0.875rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  border: `1px solid ${activeTab === 'sensors' ? 'var(--tech-cyan)' : 'var(--border-subtle)'}`,
                  background: activeTab === 'sensors' ? 'var(--tech-cyan-subtle)' : 'transparent',
                  color: activeTab === 'sensors' ? 'var(--tech-cyan)' : 'var(--tech-slate-400)'
                }}
              >
                02 // SYNTHETIC LIDAR RAYCASTING
              </button>

              <button
                onClick={() => setActiveTab('kinematics')}
                style={{
                  padding: '0.45rem 0.875rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  border: `1px solid ${activeTab === 'kinematics' ? '#10B981' : 'var(--border-subtle)'}`,
                  background: activeTab === 'kinematics' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  color: activeTab === 'kinematics' ? '#10B981' : 'var(--tech-slate-400)'
                }}
              >
                03 // D-H KINEMATICS SYNCHRONIZATION
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="badge badge-amber"
                style={{ cursor: 'pointer', padding: '0.35rem 0.65rem' }}
              >
                <span className="badge-dot" />
                <span>{isSimulating ? 'BRIDGE ACTIVE // 60 HZ' : 'BRIDGE PAUSED'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Content Stage */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem',
              padding: '2rem 1.75rem'
            }}
            className="convergence-content-split"
          >
            {/* Left: Telemetry & Architectural Insights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {activeTab === 'hil' && (
                <>
                  <div>
                    <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
                      ARCHITECTURE FOCUS: BIDIRECTIONAL DDS BRIDGE
                    </span>
                    <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: '#FFFFFF' }}>
                      Physical Robot &harr; Unreal Chaos Physics Loop
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--tech-slate-300)' }}>
                      The physical robot streams raw encoder telemetry and IMU rates over FastDDS into Unreal Engine. Unreal computes multibody contact forces and streams back predictive obstacle warnings and optimal acceleration bounds to the physical firmware.
                    </p>
                  </div>

                  {/* Architecture Diagram Steps */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div
                      style={{
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(18, 22, 31, 0.7)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Radio size={16} color="var(--accent-amber)" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)' }}>
                          Physical STM32 / CAN-FD Bus &rarr; ROS2 Node
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10B981' }}>
                        &lt; 2.4 ms
                      </span>
                    </div>

                    <div
                      style={{
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(18, 22, 31, 0.7)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Activity size={16} color="var(--tech-cyan)" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)' }}>
                          Zero-Copy Shared Memory &rarr; UE5 C++ Subsystem
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10B981' }}>
                        &lt; 0.8 ms
                      </span>
                    </div>

                    <div
                      style={{
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(18, 22, 31, 0.7)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <ShieldCheck size={16} color="#10B981" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)' }}>
                          Chaos Physics Tick &rarr; Predictive Raycast Trace
                        </span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#10B981' }}>
                        60 Hz Synced
                      </span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'sensors' && (
                <>
                  <div>
                    <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
                      COMPUTE SHADER SYNTHETIC SENSING
                    </span>
                    <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: '#FFFFFF' }}>
                      GPU-Accelerated LiDAR Point Clouds
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--tech-slate-300)' }}>
                      Instead of simplified 2D ray casts, Unreal Engine Niagara compute shaders fire 128,000 asynchronous optical raycasts per second across complex geometry, reproducing exact sensor noise, reflectivity drops, and occlusions.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-xs)',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--tech-slate-400)' }}>
                        SYNTHETIC LIDAR SAMPLES
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--tech-cyan)', fontWeight: 600 }}>
                        128,000 pts / sec
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--tech-slate-400)' }}>
                        ROS2 TOPIC OUTPUT
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--tech-slate-200)' }}>
                        sensor_msgs/PointCloud2
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--tech-slate-400)' }}>
                        SIMULATION DRIFT CONCORDANCE
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#10B981', fontWeight: 600 }}>
                        99.2% verified
                      </span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'kinematics' && (
                <>
                  <div>
                    <span className="badge" style={{ marginBottom: '0.75rem', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10B981' }}>
                      SPATIAL MATRIX D-H PARAMETERS
                    </span>
                    <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: '#FFFFFF' }}>
                      Analytical Kinematic Decoupling
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--tech-slate-300)' }}>
                      Formulating Denavit-Hartenberg transformation matrices allows decoupling Cartesian position from wrist orientation. Real-time joint trajectory calculations achieve sub-millisecond convergence without numerical gimbal locking.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-xs)',
                      background: 'rgba(12, 16, 23, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--tech-slate-300)',
                      lineHeight: 1.7
                    }}
                  >
                    <div>// Forward Kinematics Transformation Matrix:</div>
                    <div style={{ color: 'var(--accent-amber)' }}>
                      T_0_6 = A1(&theta;1) * A2(&theta;2) * A3(&theta;3) * A4(&theta;4) * A5(&theta;5) * A6(&theta;6)
                    </div>
                    <div style={{ marginTop: '0.35rem', color: 'var(--tech-cyan)' }}>
                      IK Solve Latency: 0.14 ms | Singularity Damping: DLS Active
                    </div>
                  </div>
                </>
              )}

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onOpenCaseStudy('unreal-ros2-cyber-physical-twin')}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.35rem', fontSize: '0.875rem' }}
                >
                  <span>Examine CyberTwin Case Study</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right: Visual Synchronizer Display */}
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-medium)',
                background: '#090B0F',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Display Image */}
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
                <img
                  src="/images/digital_twin_unreal_ros.jpg"
                  alt="Physical vs Virtual Twin Comparison"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(8, 10, 14, 0.85)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--tech-slate-300)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  LIVE TELEMETRY VIEW // SYNCED
                </div>
              </div>

              {/* Telemetry Stream Readout Footer */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(12, 16, 23, 0.95)',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem'
                }}
              >
                <div>
                  <div style={{ color: 'var(--tech-slate-500)' }}>PHYSICAL VELOCITY</div>
                  <div style={{ color: 'var(--tech-slate-100)', fontWeight: 600, fontSize: '0.8125rem' }}>
                    {isSimulating ? '1.24 m/s' : '0.00 m/s'}
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--tech-slate-500)' }}>SIM DRIFT DELTA</div>
                  <div style={{ color: '#10B981', fontWeight: 600, fontSize: '0.8125rem' }}>
                    {isSimulating ? '± 0.04 mm' : '0.00 mm'}
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--tech-slate-500)' }}>ROUND-TRIP PING</div>
                  <div style={{ color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.8125rem' }}>
                    {isSimulating ? '12.8 ms' : '--'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .convergence-content-split {
            grid-template-columns: 1.25fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
