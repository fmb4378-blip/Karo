const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

const modeData={
 assistant:["Karo AI","Ready to help"],
 study:["Study Mentor","Learn step by step"],
 developer:["Developer Copilot","Build and debug"],
 cyber:["Cyber Learning Lab","Practice safely"],
 career:["Career Navigator","Skills → opportunities"]
};

$$(".side-item").forEach(btn=>{
  btn.addEventListener("click",()=>{
    $$(".side-item").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const [title,sub]=modeData[btn.dataset.mode];
    $("#modeTitle").textContent=title; $("#modeSub").textContent=sub;
  });
});

$$(".suggestions button").forEach(btn=>{
  btn.addEventListener("click",()=>{ $("#chatInput").value=btn.textContent; $("#chatForm").requestSubmit(); });
});

$("#chatForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const input=$("#chatInput"), text=input.value.trim(); if(!text)return;
  addMessage("user",text); input.value="";
  const typing=addMessage("ai","Thinking…",true);
  try{
    const r=await fetch("/api/chat",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({message:text})});
    const data=await r.json();
    typing.remove(); addMessage("ai",data.reply||"I’m ready. Connect your AI provider in worker.js to enable live answers.");
  }catch(err){
    typing.remove(); addMessage("ai","Demo mode is active. Add your AI provider key/Workers AI binding in worker.js to turn this into a live assistant.");
  }
});

function addMessage(type,text,typing=false){
  const el=document.createElement("div"); el.className=`message ${type}`;
  el.innerHTML=`<span class="avatar">${type==="ai"?"✦":"Y"}</span><div>${escapeHtml(text)}</div>`;
  $("#chatBody").appendChild(el); $("#chatBody").scrollTop=$("#chatBody").scrollHeight; return el;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

const fileInput=$("#cvFile"), uploadBtn=$("#uploadBtn"), drop=$("#dropzone");
uploadBtn.addEventListener("click",()=>fileInput.click());
fileInput.addEventListener("change",()=>handleFile(fileInput.files[0]));
["dragenter","dragover"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add("drag")}));
["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove("drag")}));
drop.addEventListener("drop",e=>handleFile(e.dataTransfer.files[0]));

let cvText="";
async function handleFile(file){
  if(!file)return;
  $("#fileName").textContent="✓ "+file.name;
  if(file.type==="text/plain"){cvText=await file.text();return;}
  if(file.name.toLowerCase().endsWith(".docx")){cvText="DOCX uploaded: "+file.name;return;}
  if(file.type==="application/pdf"){
    try{
      const pdfjs=await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs");
      const buf=await file.arrayBuffer(); const pdf=await pdfjs.getDocument({data:buf}).promise;
      let out=""; for(let i=1;i<=Math.min(pdf.numPages,8);i++){const p=await pdf.getPage(i);const c=await p.getTextContent();out+=c.items.map(x=>x.str).join(" ")+"\\n";}
      cvText=out;
    }catch(e){cvText="PDF uploaded: "+file.name;}
  }
}

$("#matchBtn").addEventListener("click",async()=>{
  const country=$("#country").value;
  if(!country){alert("Please choose a target country first.");return;}
  const btn=$("#matchBtn"); btn.disabled=true; btn.textContent="Analyzing CV…";
  let jobs=[
    ["Software Developer","Remote / Hybrid","94%"],
    ["Junior Cybersecurity Analyst","Entry level","89%"],
    ["Frontend Developer","Full-time","86%"],
    ["IT Support Engineer","Full-time","82%"]
  ];
  const text=(cvText||"").toLowerCase();
  if(text.includes("python")) jobs.unshift(["Python Developer","Matched to CV","97%"]);
  if(text.includes("security")||text.includes("cyber")) jobs.unshift(["Security Analyst","Matched to CV","96%"]);
  $("#results").innerHTML=`<div class="result-head"><span>Matches for ${escapeHtml(country)}</span><small>${jobs.length} signals</small></div>`+
    jobs.slice(0,4).map(j=>`<div class="job"><div class="job-logo">◎</div><div><b>${j[0]}</b><small>${j[1]}</small></div><strong>${j[2]}</strong></div>`).join("");
  btn.disabled=false; btn.innerHTML='Find matching roles <span>→</span>';
});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
$$(".cap-card,.step,.profile-card,.workspace-shell").forEach(x=>observer.observe(x));