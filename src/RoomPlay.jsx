import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const roomPages = [
  ['Work', 'work/'], ['Experience', 'experience/'], ['Security', 'security/'],
  ['Skills', 'skills/'], ['Writing', 'writing/'], ['Contact', '#contact'],
];

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
    let frame; let start = performance.now(); let drag = false; let lastX = 0; let startX = 0; let orbit = -.4; let previewPan = 0;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024; codeCanvas.height = 640;
    const codeContext = codeCanvas.getContext('2d');
    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    const drawCode = (time) => {
      const active = Math.floor(time / 680) % 8;
      codeContext.fillStyle = '#08140d'; codeContext.fillRect(0, 0, 1024, 640);
      codeContext.font = 'bold 34px monospace'; codeContext.fillStyle = '#78d39d'; codeContext.fillText('portfolio.dev  •  live build', 58, 76);
      const lines = ['const room = loadStudio();', 'await room.connect();', 'ship({ secure: true });', 'deploy.status = "online";', 'console.log("building");', '✓ tests passing', '✓ page routes ready', '▍'];
      lines.forEach((line, index) => { codeContext.fillStyle = index === active ? '#f3ebd0' : '#5eb584'; codeContext.fillText(`${String(index + 1).padStart(2, '0')}  ${line}`, 62, 145 + index * 58); });
      codeTexture.needsUpdate = true;
    };
    new GLTFLoader().load('assets/true-3d-developer-room.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const size = box.getSize(new THREE.Vector3()).length();
      model.scale.setScalar(11 / size);
      let bookIndex = 0;
      model.traverse((object) => {
        if (!object.isMesh) return;
        if (/^book/i.test(object.name)) {
          object.userData.roomPage = roomPages[bookIndex % roomPages.length][1];
          object.userData.roomLabel = roomPages[bookIndex % roomPages.length][0];
          bookIndex += 1;
        }
        if (/monitor|screen|display/i.test(object.name)) object.material = new THREE.MeshBasicMaterial({ map: codeTexture });
      });
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
      drawCode(now);
      group.rotation.y += ((orbit + Math.sin(t * .15) * .07) - group.rotation.y) * .06;
      if (actionRef.current === 'focus') { camera.position.lerp(new THREE.Vector3(7, -8, 5.2), .03); }
      if (actionRef.current === 'wide') { camera.position.lerp(new THREE.Vector3(10, -11, 7.5), .03); }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const down = (event) => { drag = true; lastX = event.clientX; startX = event.clientX; canvas.setPointerCapture(event.pointerId); setStatus('Exploring the workspace…'); };
    const move = (event) => {
      if (!drag) return;
      const delta = event.clientX - lastX;
      orbit += delta * .008;
      previewPan = THREE.MathUtils.clamp(previewPan + delta * .32, -72, 72);
      canvas.parentElement.style.setProperty('--room-pan', `${previewPan}px`);
      lastX = event.clientX;
    };
    const up = (event) => {
      drag = false;
      if (Math.abs(event.clientX - startX) > 8) return;
      const rect = canvas.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(group.children, true).find(({ object }) => object.userData.roomPage);
      if (!hit) return;
      setStatus(`Opening ${hit.object.userData.roomLabel}…`);
      window.location.assign(hit.object.userData.roomPage);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    resize(); frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); codeTexture.dispose(); renderer.dispose(); };
  }, []);

  const play = (type) => {
    actionRef.current = type;
    setStatus(type === 'focus' ? 'Focusing on the desk setup.' : 'Returning to the wide room view.');
    window.setTimeout(() => { actionRef.current = 'idle'; setStatus('Drag to explore the developer workspace.'); }, 2400);
  };

  return <section className="room-play" aria-label="Interactive portfolio room">
    <div className="room-copy"><p>Studio mode / interactive</p><h2>Step inside the workspace.</h2><span>Drag through the room or switch between a focused desk view and the full studio.</span><div className="pet-controls"><button type="button" onClick={() => play('focus')}>Focus desk</button><button type="button" onClick={() => play('wide')}>Wide room</button></div><small aria-live="polite">{status}</small></div>
    <div className="room-canvas"><canvas ref={canvasRef} aria-label="Interactive 3D developer workspace" /><div className="book-links" aria-label="Portfolio pages">{roomPages.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div><div className="screen-code" aria-hidden="true"><span>LIVE / terminal</span><code>const room = loadStudio();<br />await room.connect();<br /><b>✓ build online</b><br /><i>▍</i></code></div><i>Drag to explore · click a book</i></div>
  </section>;
}
