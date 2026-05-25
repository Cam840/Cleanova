/* ============================================
   CLEANOVA — Shared JavaScript
   ============================================ */

// Nav scroll state
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile hamburger menu
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
    if (n) {
      fileText.innerHTML = `<strong>${n} file${n > 1 ? 's' : ''} selected</strong><br><span style="font-size:0.82rem;color:var(--silver-500)">Click to change</span>`;
    } else {
      fileText.innerHTML = originalHTML;
    }
  });
}

// Form submission (demo — prevents actual submit)
const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending request...</span>';
    submitBtn.disabled = true;
    setTimeout(() => {
      quoteForm.innerHTML = `
        <div style="text-align:center; padding:60px 20px;">
          <div style="width:80px;height:80px;margin:0 auto 30px;border-radius:50%;background:var(--grad-purple);display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(123,92,255,0.4);">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style="margin-bottom:16px;">Request received.</h2>
          <p style="max-width:480px;margin:0 auto;font-size:1.05rem;">Thank you for choosing Cleanova. A member of our team will reach out within the same business day with your tailored quote.</p>
        </div>
      `;
      quoteForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1400);
  });
}

// Contact form (lighter demo handler)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    setTimeout(() => {
      contactForm.innerHTML = `
        <div style="text-align:center; padding:60px 20px;">
          <div style="width:72px;height:72px;margin:0 auto 28px;border-radius:50%;background:var(--grad-purple);display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(123,92,255,0.4);">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style="margin-bottom:14px;">Message received.</h2>
          <p style="max-width:460px;margin:0 auto;font-size:1rem;">Thanks for reaching out. We'll be in touch within the same business day.</p>
        </div>
      `;
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1100);
  });
}

// Intersection-based reveal animations
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => obs.observe(el));
}
