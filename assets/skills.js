(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
var find=$('#find'),count=$('#count');
find.addEventListener('input',function(e){
 var q=e.target.value.trim().toLowerCase(),m=0;
 $$('.chip').forEach(function(c){
  var h=q&&c.textContent.toLowerCase().indexOf(q)>-1;
  if(h)m++;
  c.style.opacity=!q||h?1:.3;
  c.style.background=h?'#1E4FD6':'';
  c.style.color=h?'#F3F7FC':'';
 });
 count.textContent=q?(m?m+' match'+(m>1?'es':''):'No matches yet'):'';
});
})();

const cloud = document.querySelector('.skill-cloud');
const cloudMotion = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
const cloudItems = [...cloud.children];
const goldenAngle = Math.PI * (3 - Math.sqrt(5));
const cloudPoints = cloudItems.map((item, index) => {
  const y = 1 - (2 * (index + 0.5)) / cloudItems.length;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * goldenAngle;
  return { item, x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
});

let cloudSize = 0;
let yaw = 0.65;
let pitch = -0.12;
let cloudFrame = 0;

function drawCloud() {
  cloudFrame = 0;
  if (!cloudMotion.matches) return;

  const radius = cloudSize * 0.42;
  const sinYaw = Math.sin(yaw);
  const cosYaw = Math.cos(yaw);
  const sinPitch = Math.sin(pitch);
  const cosPitch = Math.cos(pitch);

  for (const { item, x, y, z } of cloudPoints) {
    const xRotated = x * cosYaw + z * sinYaw;
    const zRotated = z * cosYaw - x * sinYaw;
    const yRotated = y * cosPitch - zRotated * sinPitch;
    const depth = (y * sinPitch + zRotated * cosPitch + 1) / 2;
    const scale = 0.57 + depth * 0.5;
    item.style.setProperty('--logo-x', `${xRotated * radius * scale}px`);
    item.style.setProperty('--logo-y', `${yRotated * radius * scale}px`);
    item.style.setProperty('--logo-scale', scale);
    item.style.setProperty('--logo-opacity', 0.38 + depth * 0.62);
    item.style.setProperty('--logo-depth', Math.round(depth * 100));
  }
}

function scheduleCloud() {
  if (!cloudFrame) cloudFrame = requestAnimationFrame(drawCloud);
}

function updateCloudMode() {
  cloud.classList.toggle('is-sphere', cloudMotion.matches);
  cloudSize = cloud.clientWidth;
  scheduleCloud();
}

cloud.addEventListener('pointermove', event => {
  if (!cloudMotion.matches || event.pointerType !== 'mouse') return;
  const bounds = cloud.getBoundingClientRect();
  yaw = 0.65 + ((event.clientX - bounds.left) / bounds.width - 0.5) * Math.PI;
  pitch = -0.12 + ((event.clientY - bounds.top) / bounds.height - 0.5) * 1.35;
  scheduleCloud();
}, { passive: true });

new ResizeObserver(([entry]) => {
  cloudSize = entry.contentRect.width;
  scheduleCloud();
}).observe(cloud);
cloudMotion.addEventListener('change', updateCloudMode);
updateCloudMode();
