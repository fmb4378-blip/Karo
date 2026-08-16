const glow=document.querySelector(".cursor-glow");document.addEventListener("mousemove",e=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}});

const toast=document.getElementById("toast");function notify(t){toast.textContent=t;toast.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove("show"),2200)}

document.getElementById("heroDemo")?.addEventListener("click",()=>{document.getElementById("heroConsole")?.scrollIntoView({behavior:"smooth",block:"center"});notify("Karo workspace activated · try the Live Lab below.")});

const modes=document.querySelectorAll(".mode");modes.forEach(m=>m.addEventListener("click",()=>{modes.forEach(x=>x.classList.remove("active"));m.classList.add("active");notify("Mode switched to "+m.textContent.trim())}));

const form=document.getElementById("chatForm"),input=document.getElementById("chatInput"),messages=document.getElementById("messages");
function quickAsk(t){input.value=t;form.requestSubmit()}
form?.addEventListener("submit",e=>{e.preventDefault();const t=input.value.trim();if(!t)return;
 const u=document.createElement("div");u.className="msg user";u.innerHTML=`<div><small>YOU · NOW</small><p>${safe(t)}</p></div>`;messages.appendChild(u);input.value="";messages.scrollTop=messages.scrollHeight;
 setTimeout(()=>{const a=document.createElement("div");a.className="msg ai";a.innerHTML=`<span class="msg-avatar">K</span><div><small>KARO · NOW</small><p>${reply(t)}</p><div class="answer-tags"><span>EXPLAIN</span><span>NEXT STEP</span><span>PRACTICE</span></div></div>`;messages.appendChild(a);messages.scrollTop=messages.scrollHeight},550)
});
function safe(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function reply(t){const x=t.toLowerCase();if(x.includes("python"))return "Let's make it practical. Start with variables, functions and loops, then build a tiny project. I can teach one concept at a time and quiz you after each step.";if(x.includes("security")||x.includes("cyber"))return "We can learn cybersecurity safely: networking fundamentals → authentication → common vulnerabilities → defensive controls → hands-on labs in an isolated environment. I’ll focus on understanding and defense.";if(x.includes("code")||x.includes("review")||x.includes("javascript"))return "Paste the code or error and I’ll walk through the cause, explain the underlying concept, suggest a clean fix and give you a small practice task.";return "Good question. I’d first clarify the goal, break it into smaller pieces, explain the reasoning, then give you a practical next step. Tell me what you’re working on."; }
