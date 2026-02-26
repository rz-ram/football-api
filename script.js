// Animate stat counters on scroll
const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const section = document.querySelector('.stats-bar');
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    statsAnimated = true;
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 1500;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
}

window.addEventListener('scroll', animateStats);
animateStats();

// Code tabs
document.querySelectorAll('.code-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const lang = tab.dataset.lang;
    const parent = tab.closest('.code-window');
    parent.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
    parent.querySelectorAll('.code-block').forEach(b => b.classList.remove('active'));
    tab.classList.add('active');
    parent.querySelector(`.code-block[data-lang="${lang}"]`).classList.add('active');
  });
});

// Mobile nav toggle
const toggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '100%';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(10, 15, 28, 0.95)';
  navLinks.style.padding = '16px 24px';
  navLinks.style.gap = '16px';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.style.display === 'flex') navLinks.style.display = 'none';
    }
  });
});
