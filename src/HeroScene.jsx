import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const cream = new THREE.Color('#F3EBD0');
const gold = new THREE.Color('#C6923F');
const mint = new THREE.Color('#83C5A2');

function Orb() {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.34, 4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -state.pointer.x * 0.26, 4, delta);
  });
  return <group ref={group}>
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh><torusKnotGeometry args={[1, 0.27, 180, 28]} /><MeshTransmissionMaterial color={cream} transmission={0.88} thickness={0.65} roughness={0.16} chromaticAberration={0.12} /></mesh>
      <mesh scale={1.6}><icosahedronGeometry args={[1, 2]} /><meshBasicMaterial color={gold} wireframe transparent opacity={0.2} /></mesh>
    </Float>
  </group>;
}

export default function HeroScene() {
  return <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.4} />
    <pointLight position={[3, 3, 4]} intensity={20} color={cream} />
    <pointLight position={[-4, -2, 3]} intensity={12} color={mint} />
    <Orb />
    <Environment preset="sunset" />
  </Canvas>;
}
