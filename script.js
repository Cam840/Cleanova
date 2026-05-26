// ===== NAV SCROLL =====
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 600) navLinks.classList.remove('open');
    });
  });
}

// ===== QUOTE FORM TOGGLE =====
const toggleBtns = document.querySelectorAll('.toggle-btn');
const commercialFields = document.getElementById('commercial-fields');
const residentialFields = document.getElementById('residential-fields');

if (toggleBtns.length) {
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.type;
      const hiddenInput = document.getElementById('service-type');
      if (hiddenInput) hiddenInput.value = type;
      if (commercialFields && residentialFields) {
        if (type === 'commercial') {
          commercialFields.style.display = 'block';
          residentialFields.style.display = 'none';
        } else {
          commercialFields.style.display = 'none';
          residentialFields.style.display = 'block';
        }
      }
    });
  });
}

// ===== FILE INPUT FEEDBACK =====
const fileInput = document.querySelector('.file-input-wrap input[type="file"]');
const fileLabel = document.querySelector('.file-input-wrap span');
if (fileInput && fileLabel) {
  const originalText = fileLabel.textContent;
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      const names = Array.from(fileInput.files).map(f => f.name).join(', ');
      fileLabel.textContent = names.length > 50 ? `${fileInput.files.length} files selected` : names;
    } else {
      fileLabel.textContent = originalText;
    }
  });
}

// ===== SET ACTIVE NAV LINK =====
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
  if (link.dataset.page === currentPath) link.classList.add('active');
});

// ===== SCROLL REVEAL ANIMATION =====
const revealItems = document.querySelectorAll(
  '.section, .split-section, .industries, .about-band, .stats-row, .testimonial-section, .areas-section, .cta-strip, .quote-wrap, .panel-card, .why-card, .contact-card, .area-item, .happens-step, .industry-item, .split-card, .tier-card'
);

revealItems.forEach((item, index) => {
  item.classList.add('reveal');

  // Add small stagger delay for cards/items
  if (
    item.classList.contains('panel-card') ||
    item.classList.contains('why-card') ||
    item.classList.contains('contact-card') ||
    item.classList.contains('area-item') ||
    item.classList.contains('happens-step') ||
    item.classList.contains('industry-item')
  ) {
    item.classList.add(`reveal-delay-${(index % 4) + 1}`);
  }
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
  }
);

revealItems.forEach(item => {
  revealObserver.observe(item);
});
