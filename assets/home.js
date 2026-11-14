(function(){
/* ====== EDIT THESE ====== */
const PHOTO_URL="";                          // paste your photo link here, e.g. "https://example.com/me.jpg"
const CONTACT_EMAIL="YOUR-EMAIL@example.com"; // your real email address
/* ======================== */
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mail=$('#mail');mail.textContent=CONTACT_EMAIL;$('#mailto').setAttribute('href','mailto:'+CONTACT_EMAIL);
/* everything below is enhancement: the page is fully readable if GSAP fails to load */
if(!window.gsap||!window.ScrollTrigger||!window.Draggable)return;
gsap.registerPlugin(ScrollTrigger,Draggable);

/* navigation: sliding indicator, scroll-spy, hide on scroll down, mobile menu, progress */
const nvin=$('#nvin'),ind=$('#ind'),links=$$('#links a');let act=null,cur=null,over=false,menuOpen=false,navHidden=false;
const place=a=>{if(!a){gsap.to(ind,{opacity:0,duration:calm?0:.25,overwrite:true});return;}
 if(+gsap.getProperty(ind,'opacity')<.05)gsap.set(ind,{x:a.offsetLeft,width:a.offsetWidth});
 gsap.to(ind,{x:a.offsetLeft,width:a.offsetWidth,opacity:1,duration:calm?0:.45,ease:'power3.out',overwrite:true});};
const mark=a=>{links.forEach(l=>l.classList.toggle('on',l===a));place(a);cur=a;};
$('#links').addEventListener('pointerenter',()=>over=true);
$('#links').addEventListener('pointerleave',()=>{over=false;mark(act);});
links.forEach(l=>{l.addEventListener('pointerenter',()=>mark(l));l.addEventListener('focus',()=>mark(l));l.addEventListener('blur',()=>{if(!over)mark(act)});});
const map=[['#work','#work'],['#next','#work'],['#all','#work'],['#about','#about'],['#stack','#stack'],['#lab','#lab'],['#writing','writing/']],live={};
map.forEach(([sel,href])=>ScrollTrigger.create({trigger:sel,start:'top 50%',end:'bottom 50%',onToggle:self=>{live[sel]=self.isActive;
 act=links.find(l=>map.some(([s2,h2])=>live[s2]&&h2===l.getAttribute('href')))||null;if(!over)mark(act);}}));
document.fonts.ready.then(()=>place(cur));addEventListener('resize',()=>place(cur));
if(!calm){gsap.from(nvin,{y:-90,opacity:0,duration:.9,ease:'power3.out',delay:.2});
 ScrollTrigger.create({start:0,end:'max',onUpdate:self=>{const hide=self.direction===1&&self.scroll()>240&&!menuOpen;
  if(hide!==navHidden){navHidden=hide;gsap.to(nvin,{yPercent:hide?-170:0,duration:.45,ease:'power3.out'});}}});
 nvin.addEventListener('focusin',()=>{if(navHidden){navHidden=false;gsap.to(nvin,{yPercent:0,duration:.3});}});
 gsap.to('#pg',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}});}else $('#pg').remove();
const burger=$('#burger'),menu=$('#menu');
function setMenu(o){menuOpen=o;burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');menu.setAttribute('aria-hidden',!o);
 document.documentElement.style.overflow=o?'hidden':'';
 if(o){menu.classList.add('open');if(!calm){gsap.fromTo(menu,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.6,ease:'power4.inOut'});
  gsap.from('#menu a',{y:50,opacity:0,stagger:.07,duration:.6,delay:.25,ease:'power3.out'});}}
 else if(calm)menu.classList.remove('open');
 else gsap.to(menu,{clipPath:'inset(0 0 100% 0)',duration:.45,ease:'power4.inOut',onComplete:()=>menu.classList.remove('open')});}
burger.onclick=()=>setMenu(!menuOpen);
$$('#menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){setMenu(false);burger.focus();}});
matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches&&menuOpen)setMenu(false);});

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

/* stacked cards */
if(!calm)$$('.fc').forEach((c,i,a)=>{if(i<a.length-1)gsap.to(c,{scale:.93,opacity:.55,scrollTrigger:{trigger:a[i+1],start:'top 85%',end:'top 15%',scrub:true}});
 gsap.to(c.querySelectorAll('.art i'),{y:i=>(i%2?14:-14),rotate:i=>i*20,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:.3});});

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

/* all work rows with cursor preview (rows are in the HTML; this adds the hover preview) */
const COL=["#790B13","#2B0D10","#D9A441","#B5565C"];
const rows=$('#rows'),pv=$('#pv');
$$('.row').forEach((r,i)=>{
 r.addEventListener('pointerenter',e=>{pv.style.background=COL[i%COL.length];pv.textContent='0'+(i+1);gsap.set(pv,{x:e.clientX+20,y:e.clientY-55});gsap.to(pv,{opacity:1,scale:1,duration:.3});});
 r.addEventListener('pointerleave',()=>gsap.to(pv,{opacity:0,scale:.6,duration:.25}));});
if(!calm){const qx=gsap.quickTo(pv,'x',{duration:.4}),qy=gsap.quickTo(pv,'y',{duration:.4});rows.addEventListener('pointermove',e=>{qx(e.clientX+20);qy(e.clientY-55);});gsap.set(pv,{scale:.6});
 addEventListener('scroll',()=>gsap.to(pv,{opacity:0,scale:.6,duration:.2,overwrite:'auto'}),{passive:true});}

/* skills (categories and chips are in the HTML; this adds tilt, scan line and search) */
if(!calm){$$('.cat').forEach(c=>{c.addEventListener('pointermove',e=>{const k=c.getBoundingClientRect();gsap.to(c,{rotateY:((e.clientX-k.left)/k.width-.5)*7,rotateX:-((e.clientY-k.top)/k.height-.5)*7,transformPerspective:900,duration:.4});});
 c.addEventListener('pointerleave',()=>gsap.to(c,{rotateX:0,rotateY:0,duration:.7,ease:'elastic.out(1,.5)'}));});
 gsap.fromTo('.scan',{top:'0%'},{top:'100%',duration:2.6,repeat:-1,yoyo:true,ease:'sine.inOut'});
 gsap.from('.cat',{scrollTrigger:{trigger:'#bento',start:'top 82%',once:true},y:60,opacity:0,stagger:.09,duration:.8,ease:'power3.out'});
 gsap.from('.chip',{scrollTrigger:{trigger:'#bento',start:'top 75%',once:true},scale:.6,opacity:0,stagger:{each:.012,from:'random'},duration:.4,delay:.3,ease:'back.out(2)'});}
$('#find').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();let m=0;
 $$('.chip').forEach(c=>{const h=q&&c.textContent.toLowerCase().includes(q);m+=h?1:0;gsap.to(c,{opacity:!q||h?1:.2,scale:h?1.08:1,backgroundColor:h?'#790B13':'',color:h?'#FFF8EE':'',duration:.25});});
 $('#count').textContent=q?(m?m+' match'+(m>1?'es':''):'Not yet, but maybe soon'):'';if(q&&m)say('Found '+m+'. Nice.');});

/* security lab */
const inp=$('#inp'),q=$('#q'),v=$('#v');let safe=false;
function lab(){const val=inp.value,atk=/'\s*or\s/i.test(val);$('#m1').setAttribute('aria-pressed',!safe);$('#m2').setAttribute('aria-pressed',safe);
 if(!safe){q.textContent="query = \"SELECT * FROM users WHERE name = '\" + input + \"'\"\n\nSELECT * FROM users WHERE name = '"+val+"'";v.className='verdict'+(atk?' bad':'');v.textContent=atk?"Vulnerable: the input changed the query's logic, so it would return every user.":"Works for normal input, but nothing stops a crafted one.";}
 else{q.textContent="db.query(\"SELECT * FROM users WHERE name = $1\", [input])\n\nSELECT * FROM users WHERE name = $1\n$1 = "+JSON.stringify(val);v.className='verdict';v.textContent=atk?"Safe: the input is treated as plain data, so it matches no user.":"Safe: the input can only ever be a value, never part of the query.";}
 if(!calm)gsap.fromTo(v,{x:atk&&!safe?-10:0,opacity:.4},{x:0,opacity:1,duration:.6,ease:'elastic.out(1,.35)'});}
inp.oninput=lab;$('#ok').onclick=()=>{inp.value='admin';lab()};$('#bad').onclick=()=>{inp.value="' OR '1'='1";lab()};$('#m1').onclick=()=>{safe=false;lab()};$('#m2').onclick=()=>{safe=true;lab()};lab();

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
 mail.addEventListener('pointerleave',()=>gsap.to(mail,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}));}
})();
