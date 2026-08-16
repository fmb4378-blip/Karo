const canvas=document.getElementById("bg"),ctx=canvas.getContext("2d");
let W,H,particles=[],mouse={x:innerWidth/2,y:innerHeight/2};
function resize(){W=innerWidth;H=innerHeight;canvas.width=W*devicePixelRatio;canvas.height=H*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);particles=Array.from({length:Math.min(110,Math.floor(W/10))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:.4+Math.random()*1.4,a:.12+Math.random()*.5,p:Math.random()*6.28}))}
addEventListener("resize",resize);addEventListener("pointermove",e=>{mouse.x=e.clientX;mouse.y=e.clientY});resize();
function bg(t=0){ctx.clearRect(0,0,W,H);let g=ctx.createRadialGradient(W*.5,H*.13,0,W*.5,H*.13,Math.max(W,H)*.7);g.addColorStop(0,"rgba(105,35,205,.22)");g.addColorStop(.5,"rgba(45,15,90,.07)");g.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.p+=.012;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;let d=Math.hypot(p.x-mouse.x,p.y-mouse.y);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fillStyle=`rgba(160,82,255,${p.a*(.75+.25*Math.sin(p.p))})`;ctx.fill();if(d<150){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle=`rgba(70,220,255,${.09*(1-d/150)})`;ctx.stroke()}});requestAnimationFrame(bg)}requestAnimationFrame(bg);

const data={
overview:{name:"OVERVIEW",title:"A visual command center.",text:"Ask a question, upload a file, or start a task. Karo turns the context into a visible workflow.",prompt:"What should I work on next?",m1:"24",m2:"78%",graph:"overview"},
cyber:{name:"CYBER LAB",title:"Defend. Analyze. Learn.",text:"Explore safe security scenarios with a visual signal map that keeps the learning process structured.",prompt:"Analyze this defensive scenario",m1:"18",m2:"91%",graph:"cyber"},
study:{name:"STUDY",title:"Turn confusion into clarity.",text:"Concepts become connected notes, progress signals and practice checkpoints — so you can see what you understand.",prompt:"Explain this concept step by step",m1:"42",m2:"84%",graph:"study"},
code:{name:"DEVELOPER",title:"See the build, not just the answer.",text:"Karo keeps code context visible while you debug, refactor, test and plan the next change.",prompt:"Find the root cause of this error",m1:"31",m2:"88%",graph:"code"},
career:{name:"CAREER",title:"From CV to real opportunities.",text:"Your CV becomes a skills profile, then a visual match map for relevant roles and target countries.",prompt:"Match my CV to suitable roles",m1:"17",m2:"92%",graph:"career"}
};
const tabs=[...document.querySelectorAll(".tab")], cards=[...document.querySelectorAll(".mode-card")];
function setMode(key){let d=data[key];tabs.forEach(x=>x.classList.toggle("active",x.dataset.mode===key));document.getElementById("modeName").textContent=d.name;document.getElementById("liveTitle").textContent=d.title;document.getElementById("liveText").textContent=d.text;document.getElementById("promptText").textContent=d.prompt;document.getElementById("m1").textContent=d.m1;document.getElementById("m2").textContent=d.m2;document.getElementById("graphArea").className="graph-area "+d.graph+"-mode";document.getElementById("graphArea").animate([{opacity:.35,transform:"scale(.97)"},{opacity:1,transform:"scale(1)"}],{duration:350,easing:"ease-out"});}
tabs.forEach(t=>t.addEventListener("click",()=>setMode(t.dataset.mode)));
cards.forEach(c=>c.addEventListener("click",e=>{if(e.target.tagName==="BUTTON"){}setMode(c.dataset.mode);document.getElementById("workspace").scrollIntoView({behavior:"smooth",block:"center"})}));

// Karo AI prompt composer — front-end demo layer.
// Connect this send action to your real AI/API later.
const promptBox=document.getElementById("aiPrompt");
const sendPrompt=document.getElementById("sendPrompt");
const fileInput=document.getElementById("fileInput");
const fileName=document.getElementById("fileName");
const responseBox=document.getElementById("promptResponse");
const composeModes=[...document.querySelectorAll(".mode-chip")];

let selectedComposeMode="overview";

composeModes.forEach(btn=>{
  btn.addEventListener("click",()=>{
    selectedComposeMode=btn.dataset.composeMode;
    composeModes.forEach(x=>x.classList.toggle("active",x===btn));
    if(typeof setMode==="function") setMode(selectedComposeMode);
  });
});

fileInput?.addEventListener("change",()=>{
  const f=fileInput.files?.[0];
  if(!f){fileName.classList.remove("show");return}
  fileName.textContent="Attached: "+f.name;
  fileName.classList.add("show");
});

sendPrompt?.addEventListener("click",()=>{
  const text=promptBox.value.trim();
  if(!text){
    promptBox.focus();
    promptBox.placeholder="Type your task first — Karo is ready.";
    return;
  }
  const mode=data[selectedComposeMode] || data.overview;
  responseBox.innerHTML="<b>AI CORE RECEIVED</b> · "+mode.name+" mode is active.<br>Task mapped to the visual workspace. Connect your AI/API here to generate the real response.";
  responseBox.classList.add("show");
  document.getElementById("modeName").textContent=mode.name;
  document.getElementById("liveTitle").textContent="Working on your task…";
  document.getElementById("liveText").textContent=text;
  document.getElementById("promptText")?.replaceChildren(document.createTextNode(text));
  const graph=document.getElementById("graphArea");
  graph.animate([{filter:"brightness(1)"},{filter:"brightness(1.9)"},{filter:"brightness(1)"}],{duration:650});
});

promptBox?.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==="Enter") sendPrompt.click();
});
