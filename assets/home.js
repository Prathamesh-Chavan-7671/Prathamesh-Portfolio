(function(){
/* ====== EDIT THESE ====== */
const PHOTO_URL="https://ik.imagekit.io/c9crfmeez/prathu.png"; // paste your photo link here, e.g. "https://example.com/me.jpg"
const CONTACT_EMAIL="prathameshchavan8652@gmail.com"; // your real email address
/* ======================== */
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mail=$('#mail');mail.textContent=CONTACT_EMAIL;$('#mailto').setAttribute('href','mailto:'+CONTACT_EMAIL);
/* everything below is enhancement: the page is fully readable if GSAP fails to load */
if(!window.gsap||!window.ScrollTrigger||!window.Draggable)return;
gsap.registerPlugin(ScrollTrigger,Draggable);

/* navigation: always visible, mobile menu, progress */
const nvin=$('#nvin');let menuOpen=false;
if(!calm){gsap.from(nvin,{y:-90,opacity:0,duration:.9,ease:'power3.out',delay:.2});
 gsap.to('#pg',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}});}else $('#pg').remove();
const burger=$('#burger'),menu=$('#menu');
function setMenu(o){menuOpen=o;burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');menu.setAttribute('aria-hidden',!o);
 document.documentElement.style.overflow=o?'hidden':'';
 if(o){menu.classList.add('open');if(!calm){gsap.fromTo(menu,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.6,ease:'power4.inOut'});
  gsap.from('#menu li',{y:50,opacity:0,stagger:.07,duration:.6,delay:.25,ease:'power3.out'});}}
 else if(calm)menu.classList.remove('open');
 else gsap.to(menu,{clipPath:'inset(0 0 100% 0)',duration:.45,ease:'power4.inOut',onComplete:()=>menu.classList.remove('open')});}
burger.onclick=()=>setMenu(!menuOpen);
$$('#menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){setMenu(false);burger.focus();}});

/* guide: speech per section, eyes follow, draggable */
const bub=$('#bub');let sayNow='';
function say(t){if(t===sayNow)return;sayNow=t;if(calm){bub.textContent=t;return;}gsap.timeline().to(bub,{opacity:0,y:6,duration:.15,onComplete:()=>bub.textContent=t}).to(bub,{opacity:1,y:0,duration:.3,ease:'back.out(2)'});}
$$('[data-say]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 55%',end:'bottom 55%',onToggle:self=>self.isActive&&say(s.dataset.say)}));
bub.textContent=$('#top').dataset.say;sayNow=bub.textContent;
if(!calm){
 const pup=$$('.ey i').map(p=>({x:gsap.quickTo(p,'x',{duration:.25}),y:gsap.quickTo(p,'y',{duration:.25})}));
 addEventListener('pointermove',e=>{const g=$('.bd').getBoundingClientRect(),dx=e.clientX-(g.left+g.width/2),dy=e.clientY-(g.top+g.height/2),a=Math.atan2(dy,dx),m=Math.min(4,Math.hypot(dx,dy)/60);pup.forEach(p=>{p.x(Math.cos(a)*m);p.y(Math.sin(a)*m);});});
 gsap.to('.bd',{y:-6,duration:1.3,repeat:-1,yoyo:true,ease:'sine.inOut'});
 Draggable.create('#guide',{type:'x,y',onPress(){say('Whee!')},onRelease(){gsap.to(this.target,{x:0,y:0,duration:.9,ease:'elastic.out(1,.45)'});say('Hold me to pick me up.')}});
 Draggable.create('#pcard',{type:'x,y',onRelease(){gsap.to(this.target,{x:0,y:0,rotate:4,duration:1,ease:'elastic.out(1,.4)'})},onDrag(){gsap.to(this.target,{rotate:4+this.deltaX*.6,duration:.2,overwrite:'auto'})}});
}

/* photo: loaded from PHOTO_URL (set at the top of this file) */
const pc=$('#pcard'),pimg=$('#pimg');
if(PHOTO_URL){pimg.onload=()=>pc.classList.add('has');pimg.onerror=()=>pc.classList.remove('has');pimg.src=PHOTO_URL;}

/* hero headline words */
const h1=$('#h1');h1.setAttribute('aria-label',h1.textContent);
h1.innerHTML=h1.textContent.split(' ').map(w=>`<span class="w" aria-hidden="true"><i>${w}</i></span>`).join(' ');
if(!calm){gsap.from('#h1 i',{yPercent:110,rotate:6,stagger:.09,duration:1,ease:'power4.out',delay:.15});
 gsap.from('.who,.sub',{y:24,opacity:0,stagger:.2,duration:.8,delay:.5});gsap.from('#pcard',{y:120,rotate:-10,opacity:0,duration:1.2,ease:'back.out(1.4)',delay:.4});
 gsap.to('#h1',{yPercent:-12,scrollTrigger:{trigger:'#top',start:'top top',end:'bottom top',scrub:true}});}

/* decorative blobs: slow continuous drift */
if(!calm)$$('.blob').forEach((b,i)=>gsap.to(b,{x:i%2?40:-40,y:i%2?-30:30,duration:9+i*2,repeat:-1,yoyo:true,ease:'sine.inOut'}));

/* stacked cards, with a pointer-based 3D tilt */
if(!calm)$$('.fc').forEach((c,i,a)=>{if(i<a.length-1)gsap.to(c,{scale:.93,opacity:.55,scrollTrigger:{trigger:a[i+1],start:'top 85%',end:'top 15%',scrub:true}});
 gsap.to(c.querySelectorAll('.art i'),{y:i=>(i%2?14:-14),rotate:i=>i*20,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:.3});
 c.addEventListener('pointermove',e=>{const k=c.getBoundingClientRect();gsap.to(c,{rotateX:-((e.clientY-k.top)/k.height-.5)*6,rotateY:((e.clientX-k.left)/k.width-.5)*6,transformPerspective:1000,duration:.5,ease:'power2.out'});});
 c.addEventListener('pointerleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.7,ease:'elastic.out(1,.5)'}));});

/* section teasers: slide up once as they enter view (never opacity:0, so content stays readable even if this never fires) */
if(!calm)$$('#about .sub,#about .textlink,#stack .chips,#stack .textlink,#lab .sub,#lab .textlink,#writing .postcard,#writing .textlink,.contact .mail,.contact p').forEach(el=>
 gsap.from(el,{scrollTrigger:{trigger:el,start:'top 92%',once:true},y:28,duration:.7,ease:'power3.out'}));

/* scratch card */
const cv=$('#cv'),sc=$('#sc'),ctx=cv.getContext('2d');let done=false,down=false,n=0;
function paint(){if(done)return;const k=sc.getBoundingClientRect();cv.width=k.width;cv.height=k.height;ctx.globalCompositeOperation='source-over';
 const g=ctx.createLinearGradient(0,0,k.width,k.height);g.addColorStop(0,'#790B13');g.addColorStop(1,'#B5565C');ctx.fillStyle=g;ctx.fillRect(0,0,k.width,k.height);
 ctx.fillStyle='#FFF8EE';ctx.font='900 '+Math.min(56,k.width/9)+'px Hanken Grotesk,sans-serif';ctx.textAlign='center';ctx.fillText('Scratch me',k.width/2,k.height/2);}
document.fonts.ready.then(paint);addEventListener('resize',paint);
function scratch(e){if(!down||done)return;const k=cv.getBoundingClientRect();ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(e.clientX-k.left,e.clientY-k.top,28,0,7);ctx.fill();
 if(++n%10)return;const d=ctx.getImageData(0,0,cv.width,cv.height).data;let c=0,t=0;for(let i=3;i<d.length;i+=64){t++;if(!d[i])c++;}
 if(c/t>.5){done=true;say('Yes, application security. I mean it.');gsap.to(cv,{opacity:0,duration:.6,onComplete:()=>cv.remove()});}else say(c/t>.2?'Ooh, keep going!':'Keep scratching…');}
cv.addEventListener('pointerdown',e=>{down=true;cv.setPointerCapture(e.pointerId);scratch(e)});cv.addEventListener('pointermove',scratch);cv.addEventListener('pointerup',()=>down=false);cv.addEventListener('pointercancel',()=>down=false);

/* headings (split per word so a word never breaks across lines) and counters */
$$('h2').forEach(h=>{const t=h.textContent;h.setAttribute('aria-label',t);
 h.innerHTML=t.split(' ').map(w=>'<span class="wd" aria-hidden="true">'+[...w].map(c=>'<span>'+c+'</span>').join('')+'</span>').join(' ');
 if(!calm)gsap.from(h.querySelectorAll('.wd span'),{scrollTrigger:{trigger:h,start:'top 90%',once:true},yPercent:110,rotate:5,stagger:.025,duration:.7,ease:'power3.out'});});
$$('[data-n]').forEach(el=>{const t=+el.dataset.n,s=el.dataset.s||'',o={v:0},set=()=>el.textContent=Math.round(o.v)+s;
 if(calm){o.v=t;set();return;}set();gsap.to(o,{v:t,duration:1.6,ease:'power2.out',onUpdate:set,scrollTrigger:{trigger:el,start:'top 90%',once:true}});});

/* click to copy */
mail.onclick=async()=>{let ok=false;try{await navigator.clipboard.writeText(CONTACT_EMAIL);ok=true}catch(e){}
 $('#cp').textContent=ok?'Copied! Talk soon.':'Copy it from the button above.';say(ok?'Copied! Talk soon.':'Select the address to copy it.');
 if(!calm)gsap.fromTo(mail,{scale:.92},{scale:1,duration:.7,ease:'elastic.out(1,.4)'});};
if(!calm){mail.addEventListener('pointermove',e=>{const k=mail.getBoundingClientRect();gsap.to(mail,{x:(e.clientX-k.left-k.width/2)*.2,y:(e.clientY-k.top-k.height/2)*.35,duration:.3});});
 mail.addEventListener('pointerleave',()=>gsap.to(mail,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));

 /* magnetic hover: nav CTA and work card links */
 $$('.go,.fc .textlink').forEach(el=>{
  el.addEventListener('pointermove',e=>{const k=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-k.left-k.width/2)*.25,y:(e.clientY-k.top-k.height/2)*.4,duration:.3});});
  el.addEventListener('pointerleave',()=>gsap.to(el,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));
 });
}
})();
