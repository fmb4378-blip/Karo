const progress=document.querySelector('#progress');
window.addEventListener('scroll',()=>{const h=document.documentElement; progress.style.width=(window.scrollY/(h.scrollHeight-innerHeight)*100)+'%';});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const steps=[...document.querySelectorAll('.step')];
const stepObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){steps.forEach(s=>s.classList.remove('active'));e.target.classList.add('active')}}),{threshold:.65});
steps.forEach(s=>stepObserver.observe(s));

document.querySelectorAll('.tilt').forEach(card=>{
 card.addEventListener('pointermove',e=>{
  const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-6px)`;
 });
 card.addEventListener('pointerleave',()=>card.style.transform='');
});

const modes={
 study:{title:'Study Mentor',text:'Explain a difficult topic step-by-step, then give me a short quiz.'},
 code:{title:'Developer Copilot',text:'Paste code or an error. Karo will explain the issue and propose a clean fix.'},
 cyber:{title:'Cyber Learning Lab',text:'Run a safe defensive scenario and learn how to recognize the signals.'},
 career:{title:'Career Navigator',text:'Upload your CV, choose a country, then build a ranked job-search plan.'}
};
const demoTitle=document.querySelector('#demoTitle'), demoResponse=document.querySelector('#demoResponse'), typed=document.querySelector('#typed');
document.querySelectorAll('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const m=modes[btn.dataset.mode];demoTitle.textContent=m.title;demoResponse.textContent=m.text;
}));
document.querySelectorAll('.suggestions button').forEach(btn=>btn.addEventListener('click',()=>{typed.textContent=btn.dataset.prompt;demoResponse.textContent='Karo is preparing a focused response for: '+btn.dataset.prompt;}));
document.querySelector('#sendDemo').addEventListener('click',()=>{demoResponse.textContent='Demo response ready — this preview is interactive. Connect your AI API here to make it live.';});

document.addEventListener('pointermove',e=>{
 document.querySelectorAll('.float-card').forEach((el,i)=>{const strength=(i+1)*2;el.style.translate=`${(e.clientX-innerWidth/2)/innerWidth*strength}px ${(e.clientY-innerHeight/2)/innerHeight*strength}px`;});
});
