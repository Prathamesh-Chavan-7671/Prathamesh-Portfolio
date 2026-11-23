import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function RoomPlay() {
  const canvasRef = useRef(null);
  const actionRef = useRef('idle');
  const [status, setStatus] = useState('Drag to explore the developer workspace.');

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
    camera.position.set(10, -11, 7.5);
    const ambient = new THREE.HemisphereLight(0xc4f6c8, 0x102316, 2.4);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xff7d36, 3.1);
    key.position.set(4, -4, 8);
    scene.add(key);
    const group = new THREE.Group();
    scene.add(group);
    let frame; let start = performance.now(); let drag = false; let lastX = 0; let orbit = -.4; let previewPan = 0;
    new GLTFLoader().load('assets/true-3d-developer-room.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const size = box.getSize(new THREE.Vector3()).length();
      model.scale.setScalar(11 / size);
      group.add(model);
    }, undefined, () => setStatus('Room preview is ready while the interactive model reconnects.'));
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const render = (now) => {
      const t = (now - start) / 1000;
      group.rotation.y += ((orbit + Math.sin(t * .15) * .07) - group.rotation.y) * .06;
      if (actionRef.current === 'focus') { camera.position.lerp(new THREE.Vector3(7, -8, 5.2), .03); }
      if (actionRef.current === 'wide') { camera.position.lerp(new THREE.Vector3(10, -11, 7.5), .03); }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const down = (event) => { drag = true; lastX = event.clientX; canvas.setPointerCapture(event.pointerId); setStatus('Exploring the workspace…'); };
    const move = (event) => {
      if (!drag) return;
      const delta = event.clientX - lastX;
      orbit += delta * .008;
      previewPan = THREE.MathUtils.clamp(previewPan + delta * .32, -72, 72);
      canvas.parentElement.style.setProperty('--room-pan', `${previewPan}px`);
      lastX = event.clientX;
    };
    const up = () => { drag = false; };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    resize(); frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); renderer.dispose(); };
  }, []);

  const play = (type) => {
    actionRef.current = type;
    setStatus(type === 'focus' ? 'Focusing on the desk setup.' : 'Returning to the wide room view.');
    window.setTimeout(() => { actionRef.current = 'idle'; setStatus('Drag to explore the developer workspace.'); }, 2400);
  };

  return <section className="room-play" aria-label="Interactive portfolio room">
    <div className="room-copy"><p>Studio mode / interactive</p><h2>Step inside the workspace.</h2><span>Drag through the room or switch between a focused desk view and the full studio.</span><div className="pet-controls"><button type="button" onClick={() => play('focus')}>Focus desk</button><button type="button" onClick={() => play('wide')}>Wide room</button></div><small aria-live="polite">{status}</small></div>
    <div className="room-canvas"><canvas ref={canvasRef} aria-label="Interactive 3D developer workspace" /><i>Drag to explore</i></div>
  </section>;
}
