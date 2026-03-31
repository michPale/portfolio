// ===== Config =====
// Add your project screenshot filenames here (in desired order).
// Just drop images into assets/projects/ and list them below.
// Supported formats: .jpg, .jpeg, .png, .webp
const PROJECT_IMAGES = [
  // 'screenshot-01.jpg',
  // 'screenshot-02.png',
  // 'my-dashboard.webp',
];

// Add your client logo filenames here.
// Drop logos into assets/clients/ and list them below.
// For best results, use SVG or transparent PNG.
const CLIENT_LOGOS = [
  'logo_telekom_a614fce8ba.svg',
  'Logo_GL_Hitachi_Black_01_203ba9dbec.svg',
  'logo_vse_855e4207f1.svg',
  'tuke.svg',
  'kosice-airport.svg',
];

// ===== Render Projects =====
function renderProjects() {
  const container = document.getElementById('projectsList');
  if (!container) return;

  if (PROJECT_IMAGES.length === 0) {
    // Show placeholders when no real images yet
    const placeholderCount = 16;
    const colors = [
      '#f0eeeb', '#e8eae6', '#eae8e4', '#e6e8ea',
      '#ebe9e5', '#e5e7e3', '#ece9e4', '#e4e6e8',
      '#e9e7e3', '#e7e9e5', '#eae6e3', '#e3e5e7',
      '#ebe8e4', '#e6e4e8', '#e8e6e2', '#e2e6e4',
    ];
    for (let i = 0; i < placeholderCount; i++) {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-reveal', '');
      card.innerHTML = `
        <div class="project-image" style="background-color: ${colors[i % colors.length]};">
          <div class="placeholder-label">${String(i + 1).padStart(2, '0')}</div>
        </div>
      `;
      container.appendChild(card);
    }
  } else {
    PROJECT_IMAGES.forEach((filename) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-reveal', '');
      card.innerHTML = `
        <div class="project-image">
          <img src="assets/projects/${filename}" alt="" loading="lazy">
        </div>
      `;
      container.appendChild(card);
    });
  }
}

// ===== Render Client Logos =====
function renderClients() {
  ['clientLogos', 'clientLogosMobile'].forEach((id) => {
    renderClientLogos(document.getElementById(id));
  });
}

function renderClientLogos(container) {
  if (!container) return;

  const track = document.createElement('div');
  track.className = 'clients-track';

  if (CLIENT_LOGOS.length === 0) {
    for (let i = 1; i <= 6; i++) {
      const div = document.createElement('div');
      div.className = 'client-logo';
      div.innerHTML = `<span>Klient ${String(i).padStart(2, '0')}</span>`;
      track.appendChild(div);
    }
  } else {
    // Render logos twice for seamless infinite loop
    const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
    logos.forEach((filename) => {
      const div = document.createElement('div');
      div.className = 'client-logo';
      const name = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      div.innerHTML = `<img src="assets/clients/${filename}" alt="${name}" loading="lazy">`;
      track.appendChild(div);
    });
  }

  container.appendChild(track);
}

// ===== Scroll Reveal =====
function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderClients();
  initReveal();
  initMobileMenu();
});
