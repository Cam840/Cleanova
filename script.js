/* ============================================
   CLEANOVA — Shared JavaScript v2
   ============================================ */

// Nav scroll state
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Quote form: commercial / residential toggle
const toggleBtns = document.querySelectorAll('.toggle-btn');
const formSections = document.querySelectorAll('.form-section');
if (toggleBtns.length) {
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      formSections.forEach(s => {
        s.classList.toggle('active', s.dataset.section === target);
      });
    });
  });
}

// File upload feedback
const fileInput = document.querySelector('.file-upload input[type="file"]');
const fileText = document.querySelector('.file-upload .text');
if (fileInput && fileText) {
  const originalHTML = fileText.innerHTML;
  fileInput.addEventListener('change', e => {
    const n = e.target.files.length;
    fileText.innerHTML = n
      ? `<strong>${n} file${n > 1 ? 's' : ''} selected</strong><br><span style="font-size:0.82rem;color:var(--silver-500)">Click to change</span>`
      : originalHTML;
  });
}

// Intersection reveal
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => obs.observe(el));
}
