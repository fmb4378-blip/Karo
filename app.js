const cursor = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
  revealObserver.observe(el);
});

const visual = document.querySelector(".visual-stage");
let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

window.addEventListener("pointermove", e => {
  if (window.innerWidth < 800) return;
  targetX = (e.clientX / window.innerWidth - .5) * 10;
  targetY = (e.clientY / window.innerHeight - .5) * 8;
});

function animateVisual(){
  currentX += (targetX - currentX) * .045;
  currentY += (targetY - currentY) * .045;
  visual.style.transform = `translate3d(${currentX}px,${currentY}px,0)`;
  requestAnimationFrame(animateVisual);
}
animateVisual();

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && window.innerWidth > 800) {
    heroVisual.style.transform = `translateY(${Math.min(y * .07, 45)}px)`;
  }
});

document.querySelectorAll(".mode-card").forEach(card => {
  card.addEventListener("pointermove", e => {
    if (window.innerWidth < 800) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(700px) rotateX(${y*-3}deg) rotateY(${x*4}deg) translateY(-5px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});
