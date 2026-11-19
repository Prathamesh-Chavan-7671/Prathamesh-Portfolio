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
