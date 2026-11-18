(function(){
/* ====== EDIT THESE ====== */
const PHOTO_URL="https://ik.imagekit.io/c9crfmeez/prathu.png"; // paste your photo link here, e.g. "https://example.com/me.jpg"
const CONTACT_EMAIL="prathameshchavan8652@gmail.com"; // your real email address
/* ======================== */
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mail=$('#mail');mail.textContent=CONTACT_EMAIL;$('#mailto').setAttribute('href','mailto:'+CONTACT_EMAIL);
/* everything below is enhancement: the page is fully readable if GSAP fails to load */
if(!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);

/* sidebar menu toggle: opens the same full-page menu overlay the other pages use */
const burger=$('#burger'),menu=$('#menu');let menuOpen=false;
function setMenu(o){menuOpen=o;burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');menu.setAttribute('aria-hidden',!o);
 document.documentElement.style.overflow=o?'hidden':'';
 if(o){menu.classList.add('open');if(!calm){gsap.fromTo(menu,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.6,ease:'power4.inOut'});
  gsap.from('#menu li',{y:50,opacity:0,stagger:.07,duration:.6,delay:.25,ease:'power3.out'});}}
 else if(calm)menu.classList.remove('open');
 else gsap.to(menu,{clipPath:'inset(0 0 100% 0)',duration:.45,ease:'power4.inOut',onComplete:()=>menu.classList.remove('open')});}
burger.onclick=()=>setMenu(!menuOpen);
$$('#menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){setMenu(false);burger.focus();}});

/* photo: loaded from PHOTO_URL (set at the top of this file) */
const h2bg=$('#h2bg'),pimg=$('#pimg');
if(PHOTO_URL){pimg.onload=()=>h2bg.classList.add('has');pimg.onerror=()=>h2bg.classList.remove('has');pimg.src=PHOTO_URL;}

/* hero headline words */
const h1=$('#h1');h1.setAttribute('aria-label',h1.textContent);
h1.innerHTML=h1.textContent.split(' ').map(w=>`<span class="w" aria-hidden="true"><i>${w}</i></span>`).join(' ');
if(!calm){gsap.from('#h1 i',{yPercent:110,rotate:6,stagger:.09,duration:.8,ease:'power4.out',delay:.1});
 gsap.from('#top .pill-row',{y:16,opacity:0,stagger:.08,duration:.6,delay:.15});
 gsap.from('.eyebrow,.sub,.h2cta',{y:20,opacity:0,stagger:.1,duration:.7,delay:.35});
 gsap.from('#h2bg img',{scale:1.1,duration:1.3,ease:'power2.out'});}

/* live clocks: Mumbai time. Sidebar shows a compact HH:MM, the hero card shows the full date */
const clockEl=$('#clocktext'),sclock=$('#sclock');
function tickClock(){
 clockEl.textContent=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',weekday:'long',day:'numeric',month:'long',hour:'numeric',minute:'2-digit',hour12:true});
 sclock.textContent=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false});
}
tickClock();setInterval(tickClock,30000);

/* decorative orb: slow continuous drift */
if(!calm)gsap.to('.orb',{backgroundPosition:'20px 10px',duration:6,repeat:-1,yoyo:true,ease:'sine.inOut'});

/* section marquees: duplicate each strip's text so the CSS loop is seamless */
$$('.smarq span').forEach(s=>s.insertAdjacentHTML('afterend',s.outerHTML));

/* project cards: pointer-based 3D tilt and a slow drifting accent shape */
if(!calm)$$('.projcard').forEach(c=>{
 gsap.to(c.querySelectorAll('.art i'),{y:i=>(i%2?10:-10),rotate:i=>i*20,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:.3});
 c.addEventListener('pointermove',e=>{const k=c.getBoundingClientRect();gsap.to(c,{rotateX:-((e.clientY-k.top)/k.height-.5)*6,rotateY:((e.clientX-k.left)/k.width-.5)*6,transformPerspective:1000,duration:.5,ease:'power2.out'});});
 c.addEventListener('pointerleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.7,ease:'elastic.out(1,.5)'}));});

/* every card below the hero: slide up once as it enters view (motion only, never opacity:0,
   so content stays readable even if a trigger never fires) */
if(!calm)$$('#main section:not(#top) .acard').forEach(el=>
 gsap.from(el,{scrollTrigger:{trigger:el,scroller:'#main',start:'top 92%',once:true},y:28,duration:.6,ease:'power3.out'}));

/* scratch card */
const cv=$('#cv'),sc=$('#sc'),ctx=cv.getContext('2d');let done=false,down=false,n=0;
function paint(){if(done)return;const k=sc.getBoundingClientRect();cv.width=k.width;cv.height=k.height;ctx.globalCompositeOperation='source-over';
 const g=ctx.createLinearGradient(0,0,k.width,k.height);g.addColorStop(0,'#790B13');g.addColorStop(1,'#B5565C');ctx.fillStyle=g;ctx.fillRect(0,0,k.width,k.height);
 ctx.fillStyle='#FFF8EE';ctx.font='900 '+Math.min(56,k.width/9)+'px Hanken Grotesk,sans-serif';ctx.textAlign='center';ctx.fillText('Scratch me',k.width/2,k.height/2);}
document.fonts.ready.then(paint);addEventListener('resize',paint);
function scratch(e){if(!down||done)return;const k=cv.getBoundingClientRect();ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(e.clientX-k.left,e.clientY-k.top,28,0,7);ctx.fill();
 if(++n%10)return;const d=ctx.getImageData(0,0,cv.width,cv.height).data;let c=0,t=0;for(let i=3;i<d.length;i+=64){t++;if(!d[i])c++;}
 if(c/t>.5){done=true;gsap.to(cv,{opacity:0,duration:.6,onComplete:()=>cv.remove()});}}
cv.addEventListener('pointerdown',e=>{down=true;cv.setPointerCapture(e.pointerId);scratch(e)});cv.addEventListener('pointermove',scratch);cv.addEventListener('pointerup',()=>down=false);cv.addEventListener('pointercancel',()=>down=false);

/* headings (split per word so a word never breaks across lines) and counters */
$$('h2').forEach(h=>{const t=h.textContent;h.setAttribute('aria-label',t);
 h.innerHTML=t.split(' ').map(w=>'<span class="wd" aria-hidden="true">'+[...w].map(c=>'<span>'+c+'</span>').join('')+'</span>').join(' ');
 if(!calm)gsap.from(h.querySelectorAll('.wd span'),{scrollTrigger:{trigger:h,scroller:'#main',start:'top 90%',once:true},yPercent:110,rotate:5,stagger:.025,duration:.7,ease:'power3.out'});});
$$('[data-n]').forEach(el=>{const t=+el.dataset.n,s=el.dataset.s||'',o={v:0},set=()=>el.textContent=Math.round(o.v)+s;
 if(calm){o.v=t;set();return;}set();gsap.to(o,{v:t,duration:1.6,ease:'power2.out',onUpdate:set,scrollTrigger:{trigger:el,scroller:'#main',start:'top 90%',once:true}});});

/* click to copy */
mail.onclick=async()=>{let ok=false;try{await navigator.clipboard.writeText(CONTACT_EMAIL);ok=true}catch(e){}
 $('#cp').textContent=ok?'Copied! Talk soon.':'Copy it from the button above.';
 if(!calm)gsap.fromTo(mail,{scale:.92},{scale:1,duration:.7,ease:'elastic.out(1,.4)'});};
if(!calm){mail.addEventListener('pointermove',e=>{const k=mail.getBoundingClientRect();gsap.to(mail,{x:(e.clientX-k.left-k.width/2)*.2,y:(e.clientY-k.top-k.height/2)*.35,duration:.3});});
 mail.addEventListener('pointerleave',()=>gsap.to(mail,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));

 /* magnetic hover: pill buttons and work card links */
 $$('.go2,.projcard .textlink2').forEach(el=>{
  el.addEventListener('pointermove',e=>{const k=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-k.left-k.width/2)*.25,y:(e.clientY-k.top-k.height/2)*.4,duration:.3});});
  el.addEventListener('pointerleave',()=>gsap.to(el,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));
 });
}
})();
