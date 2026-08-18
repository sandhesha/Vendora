"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.15;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.35;

    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.4}
      floatIntensity={0.8}
    >
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 3]} />

        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.8}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          roughness={0.08}
          transmission={1}
          ior={1.45}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={3}
      />

      <pointLight
        position={[-4, -2, 3]}
        intensity={5}
      />

      <pointLight
        position={[4, 1, -3]}
        intensity={4}
      />

      <FloatingObject />

      <Sparkles
        count={100}
        scale={8}
        size={2}
        speed={0.4}
      />

      <Environment preset="city" />

     
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="h-[520px] w-full">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}