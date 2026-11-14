(function(){
var burger=document.getElementById('burger'),menu=document.getElementById('menu'),pg=document.getElementById('pg');
function setMenu(o){burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');menu.setAttribute('aria-hidden',!o);menu.classList.toggle('open',o);document.documentElement.style.overflow=o?'hidden':'';}
burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true');});
menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
addEventListener('keydown',function(e){if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){setMenu(false);burger.focus();}});
matchMedia('(min-width:761px)').addEventListener('change',function(e){if(e.matches)setMenu(false);});
function prog(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;pg.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')';}
addEventListener('scroll',prog,{passive:true});prog();
})();
