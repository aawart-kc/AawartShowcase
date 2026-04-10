window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

function countUp(el, target, dur = 1400) {
  let s = null;
  const ease = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
  const step = ts => {
    if (!s) s = ts;
    const p = Math.min((ts - s) / dur, 1);
    el.textContent = Math.round(ease(p) * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const sObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(el => countUp(el, +el.dataset.count));
      sObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-wrap').forEach(el => sObs.observe(el));


