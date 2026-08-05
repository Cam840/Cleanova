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
  title: 'Carpet Extraction',
  text: 'Professional carpet extraction removes embedded soil, spots, odors, and buildup from carpeted spaces.',
  points: [
    'Hot-water extraction cleaning',
    'Commercial and residential carpets',
    'High-traffic area treatment',
    'Spot and stain attention',
    'Odor and buildup removal'
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
    title: 'Disinfection',
    text: 'A detailed sanitization service for homes and spaces that need extra care, especially for families with pets, newborns, illness recovery, or high-touch areas.',
    points: [
      'High-touch surface disinfection',
      'Door handles, switches, counters, and fixtures',
      'Kitchen and bathroom sanitization',
      'Pet-friendly home refresh options',
      'Great before welcoming a newborn or after sickness'
    ]
  },
  litter: {
  title: 'Litter Pickup & Lot Maintenance',
  text: 'Routine exterior maintenance keeps parking lots, sidewalks, entrances, and surrounding areas clean and presentable.',
  points: [
    'Parking-lot litter pickup',
    'Sidewalk and entryway cleanup',
    'Trash and loose-debris removal',
    'Routine property inspections',
    'Recurring lot-maintenance schedules'
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

// ===== COMMERCIAL INDUSTRY DETAILS =====
const commercialIndustryDetails = {
  retail: {
    title: 'Retail Stores',
    text: 'Professional cleaning designed around customer-facing retail environments.',
    points: [
      'Sales floors and fitting rooms',
      'Entrances and display areas',
      'Restrooms and high-touch surfaces',
      'Flexible before- or after-hours service'
    ]
  },

  office: {
    title: 'Office Buildings',
    text: 'Reliable cleaning that supports a clean, productive, and professional workplace.',
    points: [
      'Workstations and common areas',
      'Conference rooms and kitchens',
      'Restrooms and high-touch surfaces',
      'Daily or recurring service plans'
    ]
  },

  malls: {
    title: 'Shopping Malls',
    text: 'High-capacity cleaning for busy shopping and public areas.',
    points: [
      'Common areas and corridors',
      'Food-court cleaning',
      'Restrooms and entrances',
      'Day porter and recurring service'
    ]
  },

  healthcare: {
    title: 'Healthcare Facilities',
    text: 'Detail-focused cleaning for professional healthcare environments.',
    points: [
      'Waiting and reception areas',
      'Exam and administrative spaces',
      'High-touch surface cleaning',
      'Customized facility procedures'
    ]
  },

  gyms: {
    title: 'Gyms & Fitness Centers',
    text: 'Cleaning plans built for high-traffic fitness and wellness environments.',
    points: [
      'Workout and equipment areas',
      'Locker rooms and restrooms',
      'Mirrors, floors, and entry areas',
      'High-touch surface attention'
    ]
  },

  restaurants: {
    title: 'Restaurants',
    text: 'Professional cleaning support for customer areas and facility presentation.',
    points: [
      'Dining and entrance areas',
      'Floors and high-traffic surfaces',
      'Restrooms and common spaces',
      'Flexible off-hours scheduling'
    ]
  },

  apartments: {
    title: 'Apartment & Commercial Buildings',
    text: 'Recurring and turnover cleaning for managed properties and shared spaces.',
    points: [
      'Lobbies and common areas',
      'Hallways and elevators',
      'Move-in and move-out cleaning',
      'Property-specific service plans'
    ]
  },

  government: {
    title: 'Government Facilities',
    text: 'Dependable cleaning for public-facing and administrative facilities.',
    points: [
      'Offices and meeting areas',
      'Public entrances and lobbies',
      'Restrooms and shared spaces',
      'Customized scheduling and scope'
    ]
  },

  private: {
    title: 'Private Facilities',
    text: 'Discreet, customized cleaning for private and controlled-access properties.',
    points: [
      'Customized cleaning procedures',
      'Professional supervised teams',
      'Flexible service scheduling',
      'Detail-focused facility care'
    ]
  },

  warehouses: {
    title: 'Warehouses',
    text: 'Commercial cleaning for large industrial and storage environments.',
    points: [
      'Warehouse floors and aisles',
      'Breakrooms and offices',
      'High dusting and debris removal',
      'Recurring maintenance plans'
    ]
  },

  postconstruction: {
    title: 'Post-Construction Cleaning',
    text: 'Final cleaning that prepares newly built or renovated spaces for turnover.',
    points: [
      'Dust and construction residue removal',
      'Floors, windows, and fixtures',
      'Detailed final-clean preparation',
      'Inspection and occupancy readiness'
    ]
  },

  realestate: {
    title: 'Commercial Real Estate',
    text: 'Cleaning support for listings, tenant transitions, and managed properties.',
    points: [
      'Tenant turnover cleaning',
      'Listing and showing preparation',
      'Common-area maintenance',
      'Move-ready presentation'
    ]
  },

  'car-dealerships': {
    title: 'Car Dealerships',
    text: 'Professional facility cleaning that supports a polished showroom experience.',
    points: [
      'Showrooms and customer lounges',
      'Glass, floors, and entrances',
      'Service waiting areas',
      'Restrooms and employee spaces'
    ]
  }
};

const commercialIndustryCards = document.querySelectorAll(
  '#commercial-industries .panel-card'
);

function openCommercialIndustryModal(card) {
  const detail = commercialIndustryDetails[card.id];

  if (
    !detail ||
    !serviceModal ||
    !serviceModalTitle ||
    !serviceModalText ||
    !serviceModalList
  ) {
    return;
  }

  const imageElement = card.querySelector('.panel-image');
  const imageBackground = imageElement
    ? imageElement.style.backgroundImage
    : '';

  serviceModalTitle.textContent = detail.title;
  serviceModalText.textContent = detail.text;

  serviceModalList.innerHTML = detail.points
    .map(point => `<li>${point}</li>`)
    .join('');

  if (serviceModalImage) {
    serviceModalImage.style.backgroundImage = imageBackground;
  }

  serviceModal.classList.add('open');
  serviceModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

commercialIndustryCards.forEach(card => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');

  card.addEventListener('click', event => {
    // Allow the existing Schedule link to continue working
    if (event.target.closest('a')) return;

    openCommercialIndustryModal(card);
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCommercialIndustryModal(card);
    }
  });
});
