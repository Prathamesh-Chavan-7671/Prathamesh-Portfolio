import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PortraitAura() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const canvas = canvasRef.current, host = canvas.parentElement;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100), group = new THREE.Group(); camera.position.z = 6; scene.add(group);
    const positions = new Float32Array(210 * 3);
    for (let i = 0; i < 210; i += 1) { const r = 1.72 + Math.random() * .62, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1); positions[i * 3] = r * Math.sin(p) * Math.cos(t); positions[i * 3 + 1] = r * Math.cos(p); positions[i * 3 + 2] = r * Math.sin(p) * Math.sin(t); }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); group.add(new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xf3ebd0, size: .026, transparent: true, opacity: .72, depthWrite: false })));
    [1.78, 2.22].forEach((r, index) => { const pts = Array.from({ length: 90 }, (_, i) => { const a = (i / 90) * Math.PI * 2; return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * .65, 0); }); const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: index ? 0x83c5a2 : 0xc6923f, transparent: true, opacity: .42 })); ring.rotation.set(index ? 1.1 : .55, index ? -.3 : .4, 0); group.add(ring); });
    let x = 0, y = 0, frame; const resize = () => { const { width, height } = canvas.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); }; const move = e => { const r = host.getBoundingClientRect(); x = (e.clientX - r.left) / r.width - .5; y = (e.clientY - r.top) / r.height - .5; }; const render = () => { group.rotation.y += .0024; group.rotation.x += (y * .34 - group.rotation.x) * .025; group.rotation.z += (-x * .22 - group.rotation.z) * .025; renderer.render(scene, camera); frame = requestAnimationFrame(render); };
    resize(); render(); window.addEventListener('resize', resize); host.addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); host.removeEventListener('pointermove', move); geometry.dispose(); renderer.dispose(); };
  }, []);
  return <canvas ref={canvasRef} className="portrait-aura" aria-hidden="true" />;
}
