import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function RoomPlay() {
  const canvasRef = useRef(null);
  const actionRef = useRef('idle');
  const [status, setStatus] = useState('The pets are exploring the studio.');

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
    let puppy; let cat; let ball; let frame; let start = performance.now(); let drag = false; let lastX = 0; let orbit = -.4;
    new GLTFLoader().load('assets/cyberpunk-room.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const size = box.getSize(new THREE.Vector3()).length();
      model.scale.setScalar(11 / size);
      group.add(model);
      puppy = model.getObjectByName('Puppy body');
      cat = model.getObjectByName('Cat body');
      ball = model.getObjectByName('Interactive neon ball');
    });
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
      if (actionRef.current === 'ball' && ball) { ball.position.y = Math.abs(Math.sin(t * 5)) * .55; ball.position.x = Math.sin(t * 2.2) * .35; if (puppy) puppy.rotation.z = Math.sin(t * 5) * .16; }
      if (actionRef.current === 'tunnel' && cat) { cat.position.x = Math.sin(t * 2.5) * .5; cat.rotation.z = Math.sin(t * 5) * .12; }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const down = (event) => { drag = true; lastX = event.clientX; canvas.setPointerCapture(event.pointerId); };
    const move = (event) => { if (!drag) return; orbit += (event.clientX - lastX) * .008; lastX = event.clientX; };
    const up = () => { drag = false; };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    resize(); frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); renderer.dispose(); };
  }, []);

  const play = (type) => {
    actionRef.current = type;
    setStatus(type === 'ball' ? 'Puppy is chasing the glowing ball.' : 'Cat is sprinting through the tunnel.');
    window.setTimeout(() => { actionRef.current = 'idle'; setStatus('The pets are exploring the studio.'); }, 3800);
  };

  return <section className="room-play" aria-label="Interactive portfolio room">
    <div className="room-copy"><p>Studio mode / interactive</p><h2>Step inside the workspace.</h2><span>Drag through the room, then start a tiny bit of chaos.</span><div className="pet-controls"><button type="button" onClick={() => play('ball')}>Toss the ball</button><button type="button" onClick={() => play('tunnel')}>Open the tunnel</button></div><small aria-live="polite">{status}</small></div>
    <div className="room-canvas"><canvas ref={canvasRef} aria-label="Interactive 3D cyberpunk workspace with developer and pets" /><i>Drag to explore</i></div>
  </section>;
}
