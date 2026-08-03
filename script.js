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
const navContainer = document.querySelector('.nav');

function setMobileMenu(open) {
  if (!navToggle || !navLinks) return;

  navLinks.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-menu-open', open);
}

if (navToggle && navLinks && navContainer) {
  // Open and close with hamburger button
  navToggle.addEventListener('click', event => {
    event.stopPropagation();

    const isOpen = navLinks.classList.contains('open');
    setMobileMenu(!isOpen);
  });

  // Close after selecting any navigation link
  navLinks.addEventListener('click', event => {
    const clickedLink = event.target.closest('a');

    if (clickedLink && window.innerWidth <= 900) {
      setMobileMenu(false);
    }
  });

  // Close when tapping outside the navigation
  document.addEventListener('click', event => {
    if (
      window.innerWidth <= 900 &&
      !navContainer.contains(event.target)
    ) {
      setMobileMenu(false);
    }
  });

  // Close with Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMobileMenu(false);
    }
  });

  // Remove the mobile-open state when returning to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      setMobileMenu(false);
    }
  });

  // Start closed whenever the page loads
  setMobileMenu(false);
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

// ===== INDEX SERVICE DETAILS POPUP =====
const serviceDetails = {
  power: {
    title: 'Power Washing',
    text: 'Power washing helps improve curb appeal by cleaning exterior surfaces around your property.',
    points: [
      'Sidewalks and walkways',
      'Entryways and exterior surfaces',
      'Driveways and parking areas',
      'Dirt and buildup removal',
      'Great for commercial and residential properties'
    ]
  },
  window: {
    title: 'Window Cleaning',
    text: 'Window cleaning gives your property a sharper, brighter appearance from both the inside and outside.',
    points: [
      'Interior and exterior window cleaning',
      'Glass surface cleaning',
      'Entryway glass',
      'Storefront windows',
      'Professional streak-reduction process'
    ]
  },
  carpet: {
    title: 'Carpet Cleaning',
    text: 'Professional carpet cleaning removes dirt, stains, odor, and buildup from high-traffic spaces while improving the overall appearance of the property.',
    points: [
      'Hot water extraction cleaning',
      'High-traffic area treatment',
      'Spot and stain attention',
      'Odor improvement',
      'Ideal for offices, homes, and common areas'
    ]
  },
  wax: {
    title: 'Floor Strip & Wax',
    text: 'Professional strip and wax service restores dull floors with a cleaner, glossier, more polished finish.',
    points: [
      'Old wax removal',
      'Deep floor preparation',
      'Fresh wax application',
      'Improved shine and protection',
      'Great for commercial buildings and retail spaces'
    ]
  },
  highdusting: {
    title: 'High Dusting',
    text: 'High dusting tackles the hard-to-reach areas that routine cleaning often misses — ceilings, beams, vents, light fixtures, and more.',
    points: [
      'Ceiling and beam dusting',
      'Vent and air duct exterior cleaning',
      'Light fixture and fan cleaning',
      'Overhead surfaces and ledges',
      'Ideal for warehouses, offices, and large spaces'
    ]
  },
 sanitization: {
    title: 'Disinfection & Sanitization',
    text: 'A detailed sanitization service for homes and spaces that need extra care, especially for families with pets, newborns, illness recovery, or high-touch areas.',
    points: [
      'High-touch surface disinfection',
      'Door handles, switches, counters, and fixtures',
      'Kitchen and bathroom sanitization',
      'Pet-friendly home refresh options',
      'Great before welcoming a newborn or after sickness'
    ]
  }
};

const serviceCards = document.querySelectorAll('.service-card[data-service]');
const serviceModal = document.getElementById('service-modal');
const serviceModalImage = document.getElementById('service-modal-image');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalText = document.getElementById('service-modal-text');
const serviceModalList = document.getElementById('service-modal-list');
const serviceModalClose = document.querySelector('.service-modal-close');
const serviceModalBackdrop = document.querySelector('.service-modal-backdrop');

function openServiceModal(card) {
  const serviceKey = card.dataset.service;
  const detail = serviceDetails[serviceKey];

  if (!detail || !serviceModal || !serviceModalTitle || !serviceModalText || !serviceModalList) return;

  const imageElement = card.querySelector('.panel-image');
  const imageBackground = imageElement ? imageElement.style.backgroundImage : '';

  serviceModalTitle.textContent = detail.title;
  serviceModalText.textContent = detail.text;
  serviceModalList.innerHTML = detail.points.map(point => `<li>${point}</li>`).join('');

  if (serviceModalImage) {
    serviceModalImage.style.backgroundImage = imageBackground;
  }

  serviceModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeServiceModal() {
  if (!serviceModal) return;

  serviceModal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    openServiceModal(card);
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openServiceModal(card);
    }
  });
});

if (serviceModalClose) {
  serviceModalClose.addEventListener('click', closeServiceModal);
}

if (serviceModalBackdrop) {
  serviceModalBackdrop.addEventListener('click', closeServiceModal);
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeServiceModal();
  }
});
