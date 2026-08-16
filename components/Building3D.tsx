"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Building() {
  const buildingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!buildingRef.current) return;

    buildingRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.35) * 0.12;

    buildingRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={buildingRef}>
      {/* Main building */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 4.5, 2]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Building top */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[3.5, 0.25, 2.3]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Windows */}
      {[-1, 0, 1].map((x) =>
        [1.4, 0.4, -0.6, -1.6].map((y) => (
          <mesh
            key={`${x}-${y}`}
            position={[x, y, 1.02]}
          >
            <boxGeometry args={[0.55, 0.5, 0.08]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0ea5e9"
              emissiveIntensity={1.5}
            />
          </mesh>
        ))
      )}

      {/* Entrance */}
      <mesh position={[0, -1.7, 1.04]}>
        <boxGeometry args={[0.9, 1.4, 0.1]} />
        <meshStandardMaterial
          color="#020617"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Entrance light */}
      <pointLight
        position={[0, -1.2, 1.8]}
        intensity={3}
        distance={4}
      />
    </group>
  );
}

export default function Building3D() {
  return (
    <div className="h-[500px] w-full">
      <Canvas
        camera={{
          position: [6, 4, 7],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={2}
        />

        <pointLight
          position={[-4, 2, 4]}
          intensity={3}
        />

        <Building />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}