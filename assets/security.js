(function(){
var $=function(s){return document.querySelector(s)};
var inp=$('#inp'),q=$('#q'),v=$('#v'),m1=$('#m1'),m2=$('#m2'),safe=false;
function lab(){
 var val=inp.value,atk=/'\s*or\s/i.test(val);
 m1.setAttribute('aria-pressed',!safe);m2.setAttribute('aria-pressed',safe);
 if(!safe){
  q.textContent="query = \"SELECT * FROM users WHERE name = '\" + input + \"'\"\n\nSELECT * FROM users WHERE name = '"+val+"'";
  v.className='verdict'+(atk?' bad':'');
  v.textContent=atk?"Vulnerable: the input changed the query's logic, so it would return every user.":"Works for normal input, but nothing stops a crafted one.";
 }else{
  q.textContent="db.query(\"SELECT * FROM users WHERE name = $1\", [input])\n\nSELECT * FROM users WHERE name = $1\n$1 = "+JSON.stringify(val);
  v.className='verdict';
  v.textContent=atk?"Safe: the input is treated as plain data, so it matches no user.":"Safe: the input can only ever be a value, never part of the query.";
 }
}
inp.oninput=lab;
$('#ok').onclick=function(){inp.value='admin';lab()};
$('#bad').onclick=function(){inp.value="' OR '1'='1";lab()};
m1.onclick=function(){safe=false;lab()};
m2.onclick=function(){safe=true;lab()};
lab();
})();
