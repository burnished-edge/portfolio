/**
 * Daniel Nguyen — Licensed Architect (doniolnguyen.com)
 * Parallax, Scroll-Reveal Transitions & Process Gallery Modal
 */

const PROJECTS = {
  'laurel-canyon': {
    index: '01',
    title: 'Laurel Canyon Timber House',
    typology: 'Single-Family Residence',
    status: 'Unbuilt Work',
    location: 'Los Angeles, CA',
    area: '3,400 sq ft',
    materials: 'White Plaster, Western Red Cedar, Blackened Steel, Concrete Pavers',
    summary:
      'Set on a sloped canyon lot, the house uses a deep cedar rafter roof to shade the patio through the afternoon while sliding steel doors open the living room directly onto the courtyard.',
    slides: [
      { src: 'images/project-laurel-canyon.jpg', label: '01 · Exterior View', isDrawing: false },
      { src: 'images/project-laurel-canyon-bedroom.jpg', label: '02 · Primary Bedroom', isDrawing: false },
    ],
  },
  'silver-lake': {
    index: '02',
    title: 'Silver Lake Hillside Pavilion',
    typology: 'Single-Family Residence',
    status: 'Unbuilt Work',
    location: 'Silver Lake, CA',
    area: '2,850 sq ft',
    materials: 'Board-Formed Concrete, Douglas Fir, Structural Glass',
    summary:
      'A board-formed concrete base anchors the residence into the slope while a low timber roof floats underneath existing oaks, framing views toward the reservoir and downtown.',
    slides: [
      { src: 'images/project-silver-lake.jpg', label: '01 · Exterior View', isDrawing: false },
      { src: 'images/project-silver-lake-bath.jpg', label: '02 · Primary Bath', isDrawing: false },
    ],
  },
  'abbot-kinney': {
    index: '03',
    title: 'Abbot Kinney Fluted Storefront',
    typology: 'Retail Display Installation',
    status: 'Unbuilt Work',
    location: 'Venice, CA',
    area: '1,100 sq ft',
    materials: 'Fluted Plaster, Cast Concrete Ribs, Honed Travertine, Black Steel',
    summary:
      'A street-facing retail installation where curved plaster and cast-concrete ribs shift sightlines around travertine plinths as pedestrians move past the storefront.',
    slides: [
      { src: 'images/project-abbot-kinney.jpg', label: '01 · Storefront View', isDrawing: false },
      { src: 'images/project-abbot-kinney-lounge.jpg', label: '02 · Rear Fitting Alcove', isDrawing: false },
    ],
  },
  'mar-vista': {
    index: '04',
    title: 'Mar Vista Courtyard House',
    typology: 'Single-Family Residence',
    status: 'Unbuilt Work',
    location: 'Mar Vista, CA',
    area: '3,100 sq ft',
    materials: 'White Oak, Honed Travertine, Limewash Plaster, Steel',
    summary:
      'A split-level residence organized around a cantilevered oak stair and pocket doors opening onto an olive-tree courtyard, pulling natural light deep into the plan.',
    slides: [
      { src: 'images/project-mar-vista.jpg', label: '01 · Living & Courtyard', isDrawing: false },
      { src: 'images/project-mar-vista-kitchen.jpg', label: '02 · Kitchen', isDrawing: false },
    ],
  },
  'arts-district': {
    index: '05',
    title: 'Arts District CNC Rib Wall',
    typology: 'Retail Display Installation',
    status: 'Unbuilt Work',
    location: 'Los Angeles, CA',
    area: '850 sq ft',
    materials: '5-Axis CNC Birch Plywood, Brushed Aluminum, Linear LED',
    summary:
      'A dry-assembled retail display system for a raw concrete loft. Serial CNC-milled birch plywood fins carry slotted aluminum shelves and concealed linear lighting.',
    slides: [
      { src: 'images/project-arts-district.jpg', label: '01 · Installed View', isDrawing: false },
      { src: 'images/project-arts-district-detail.jpg', label: '02 · Rib & Shelf Detail', isDrawing: false },
      { src: 'images/process-arts-model.jpg', label: '03 · 1:10 Scale Prototype', isDrawing: false },
    ],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Dynamic footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Navbar scroll transition & mobile auto-collapse
  const mainNav = document.getElementById('mainNav');
  const navCollapse = document.getElementById('navbarContent');

  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link, .btn').forEach((link) => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }

  // 3. GPU-Accelerated Subtle Parallax
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const parallaxImgs = document.querySelectorAll('[data-parallax-img]');
  let ticking = false;

  const updateScrollEffects = () => {
    const scrollY = window.scrollY;

    if (mainNav) {
      mainNav.classList.toggle('scrolled', scrollY > 40);
    }

    if (!prefersReducedMotion) {
      const vh = window.innerHeight;

      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom >= -100 && rect.top <= vh + 100) {
          const offset = (rect.top / vh) * 100 * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        }
      });

      parallaxImgs.forEach((img) => {
        const container = img.closest('.arch-card-media');
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= vh) {
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          const shift = Math.max(-16, Math.min(16, progress * -28));
          const scale = container.matches(':hover') ? 1.03 : 1;
          img.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${scale})`;
        }
      });
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateScrollEffects();

  document.querySelectorAll('.arch-card-media').forEach((media) => {
    media.addEventListener('mouseenter', onScroll);
    media.addEventListener('mouseleave', onScroll);
  });

  // 4. Portfolio Typology Filtering
  const filterButtons = document.querySelectorAll('.btn-arch-filter');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      portfolioItems.forEach((item) => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('d-none', !matches);
        if (matches) {
          item.classList.add('is-visible');
        }
      });

      onScroll();
    });
  });

  // 5. Case Study + Process Gallery Modal
  const projectModal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalThumbs = document.getElementById('modalThumbs');
  const modalThumbsBar = document.getElementById('modalThumbsBar');
  const modalSlideCaption = document.getElementById('modalSlideCaption');
  const modalSlideCounter = document.getElementById('modalSlideCounter');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  let activeProject = null;
  let activeSlideIdx = 0;

  const renderSlide = (idx) => {
    if (!activeProject) return;
    const slides = activeProject.slides;
    activeSlideIdx = (idx + slides.length) % slides.length;
    const slide = slides[activeSlideIdx];

    modalImage.src = slide.src;
    modalImage.alt = `${activeProject.title} — ${slide.label}`;
    modalImage.classList.toggle('is-drawing', Boolean(slide.isDrawing));
    modalSlideCaption.textContent = slide.label;
    modalSlideCounter.textContent = `${activeSlideIdx + 1} / ${slides.length}`;

    modalThumbs.querySelectorAll('.modal-thumb-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === activeSlideIdx);
    });
  };

  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', (event) => {
      const card = event.relatedTarget;
      if (!card) return;

      const project = PROJECTS[card.dataset.projectId];
      if (!project) return;
      activeProject = project;

      document.getElementById('projectModalLabel').textContent = project.title;
      document.getElementById('modalTypology').textContent =
        `${project.index} / ${project.typology.toUpperCase()}`;
      document.getElementById('modalStatus').textContent = project.status.toUpperCase();
      document.getElementById('modalLocation').textContent = project.location;
      document.getElementById('modalArea').textContent = project.area;
      document.getElementById('modalMaterials').textContent = project.materials;
      document.getElementById('modalSummary').textContent = project.summary;

      const hasMultiple = project.slides.length > 1;
      galleryPrev?.classList.toggle('d-none', !hasMultiple);
      galleryNext?.classList.toggle('d-none', !hasMultiple);
      modalThumbsBar?.classList.toggle('d-none', !hasMultiple);

      modalThumbs.innerHTML = '';
      project.slides.forEach((slide, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'modal-thumb-btn';
        btn.innerHTML = `<img src="${slide.src}" alt="" /><span>${slide.label}</span>`;
        btn.addEventListener('click', () => renderSlide(i));
        modalThumbs.appendChild(btn);
      });

      renderSlide(0);
    });

    galleryPrev?.addEventListener('click', () => renderSlide(activeSlideIdx - 1));
    galleryNext?.addEventListener('click', () => renderSlide(activeSlideIdx + 1));

    projectModal.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') renderSlide(activeSlideIdx - 1);
      if (e.key === 'ArrowRight') renderSlide(activeSlideIdx + 1);
    });

    document.querySelectorAll('.arch-card').forEach((card) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // 6. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      contactForm.classList.remove('was-validated');
      contactForm.reset();
      if (formSuccess) {
        formSuccess.classList.remove('d-none');
      }
    });
  }

  // 7. Crisp Scroll-Reveal Observer
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});
