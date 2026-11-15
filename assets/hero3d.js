import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(function(){
var canvas=document.getElementById('hero3d');
if(!canvas||!window.WebGLRenderingContext)return;
var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(calm)return;

var scene=new THREE.Scene();
var camera=new THREE.PerspectiveCamera(45,1,0.1,100);
camera.position.z=6.5;

var renderer;
try{renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});}
catch(e){return;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));

var geo=new THREE.IcosahedronGeometry(2.3,1);
var mat=new THREE.MeshBasicMaterial({color:0xD9A441,wireframe:true,transparent:true,opacity:.55});
var mesh=new THREE.Mesh(geo,mat);
scene.add(mesh);

var pos=geo.attributes.position;
var pts=[];
for(var i=0;i<pos.count;i++){pts.push(new THREE.Vector3(pos.getX(i),pos.getY(i),pos.getZ(i)));}
var dotGeo=new THREE.BufferGeometry().setFromPoints(pts);
var dotMat=new THREE.PointsMaterial({color:0xFFF0DC,size:.07,transparent:true,opacity:.85,sizeAttenuation:true});
var dots=new THREE.Points(dotGeo,dotMat);
scene.add(dots);

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

function animate(){
 requestAnimationFrame(animate);
 mesh.rotation.y+=.0022;
 mesh.rotation.x+=.0009;
 dots.rotation.copy(mesh.rotation);
 camera.position.x+=(targetX*1.6-camera.position.x)*.03;
 camera.position.y+=(-targetY*1.6-camera.position.y)*.03;
 camera.lookAt(scene.position);
 renderer.render(scene,camera);
}
animate();
})();
