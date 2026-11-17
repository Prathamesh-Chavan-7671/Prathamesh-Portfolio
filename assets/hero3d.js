import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(function(){
var canvas=document.getElementById('hero3d');
if(!canvas||!window.WebGLRenderingContext)return;
var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(calm)return;

var scene=new THREE.Scene();
var camera=new THREE.PerspectiveCamera(45,1,0.1,100);
camera.position.z=7.5;

var renderer;
try{renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});}
catch(e){return;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));

/* lighting, so the faceted surface actually reads as 3D, not a flat wireframe */
scene.add(new THREE.AmbientLight(0xffffff,.55));
var key=new THREE.DirectionalLight(0xffffff,1.1);key.position.set(4,5,6);scene.add(key);
var rim=new THREE.DirectionalLight(0xD9A441,1.2);rim.position.set(-5,-3,-4);scene.add(rim);

var group=new THREE.Group();scene.add(group);
group.position.x=1.6;

/* solid faceted gem, lit, plus a brighter wireframe edge over it for definition */
var geo=new THREE.IcosahedronGeometry(2.1,1);
var mat=new THREE.MeshStandardMaterial({color:0x9B1420,metalness:.35,roughness:.3,flatShading:true,emissive:0x2B0D10,emissiveIntensity:.4});
var mesh=new THREE.Mesh(geo,mat);
group.add(mesh);

var wireMat=new THREE.MeshBasicMaterial({color:0xF0C77A,wireframe:true,transparent:true,opacity:.5});
var wireMesh=new THREE.Mesh(geo,wireMat);
wireMesh.scale.setScalar(1.004);
group.add(wireMesh);

var pos=geo.attributes.position;
var pts=[];
for(var i=0;i<pos.count;i++){pts.push(new THREE.Vector3(pos.getX(i),pos.getY(i),pos.getZ(i)));}
var dotGeo=new THREE.BufferGeometry().setFromPoints(pts);
var dotMat=new THREE.PointsMaterial({color:0xFFF8EE,size:.09,transparent:true,opacity:.9,sizeAttenuation:true});
var dots=new THREE.Points(dotGeo,dotMat);
group.add(dots);

/* small orbiting accent cube for extra depth */
var cubeGeo=new THREE.BoxGeometry(.5,.5,.5);
var cubeMat=new THREE.MeshStandardMaterial({color:0xD9A441,flatShading:true,roughness:.4});
var cube=new THREE.Mesh(cubeGeo,cubeMat);
cube.position.set(2.4,-1.6,1);
group.add(cube);

var targetX=0,targetY=0;
addEventListener('pointermove',function(e){
 targetX=(e.clientX/innerWidth-.5);
 targetY=(e.clientY/innerHeight-.5);
});

function size(){
 var r=canvas.getBoundingClientRect();
 if(r.width===0||r.height===0)return;
 renderer.setSize(r.width,r.height,false);
 camera.aspect=r.width/r.height;
 camera.updateProjectionMatrix();
}
size();
addEventListener('resize',size);

/* entrance: scale and fade up from nothing */
group.scale.setScalar(.001);
canvas.style.opacity='0';
canvas.style.transition='opacity 1.1s ease';
setTimeout(function(){canvas.style.opacity='';},80);
var entrance=0;
function easeOutBack(t){var c=1.70158;return 1+c*Math.pow(t-1,3)+(c-1)*Math.pow(t-1,2);}

function animate(t){
 requestAnimationFrame(animate);
 if(entrance<1){entrance=Math.min(1,entrance+.016);group.scale.setScalar(Math.max(.001,easeOutBack(entrance)));}
 mesh.rotation.y+=.0026;mesh.rotation.x+=.0011;
 wireMesh.rotation.copy(mesh.rotation);
 dots.rotation.copy(mesh.rotation);
 cube.rotation.x+=.01;cube.rotation.y+=.015;
 cube.position.x=2.4+Math.sin((t||0)/900)*.4;
 cube.position.y=-1.6+Math.cos((t||0)/1100)*.4;
 camera.position.x+=(targetX*2-camera.position.x)*.035;
 camera.position.y+=(-targetY*2-camera.position.y)*.035;
 camera.lookAt(scene.position);
 renderer.render(scene,camera);
}
animate();
})();
