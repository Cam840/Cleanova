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
