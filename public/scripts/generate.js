var i=-1;
var list = 
function generate(){
document.getElementById('display').style.opacity=1;
document.getElementById('nxt').style.opacity=0.5
setTimeout(function(){
document.getElementById('nxt').disabled=false;
document.getElementById('nxt').style.opacity=1;
document.getElementById('display').style.opacity=0;
}, 3000);


i++;
id = list[i].numbercall;
document.getElementById(id).style.backgroundColor="red";
var j;
for(j= i-1; j>=0;j--)
{
document.getElementById(list[j]).style.backgroundColor="#5959ff";
}
var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleString();
document.getElementById('display').innerHTML= list[i].numbercall;
document.getElementById('current').innerHTML=  list[i].numbercall; 
document.getElementById('previous').innerHTML= list[i-1].numbercall; 
document.getElementById('previous1').innerHTML= list[i-2].numbercall; 
document.getElementById('previous2').innerHTML= list[i-3].numbercall; 
document.getElementById('previous3').innerHTML= list[i-4].numbercall; 
document.getElementById('total').innerHTML= i+1;    
}
