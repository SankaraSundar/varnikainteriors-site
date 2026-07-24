/* ==========================================================================
   VARNIKA INTERIOR DESIGN - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Screen
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 1200);
  }

  // 2. Sticky Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.float-back-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
      backToTopBtn?.classList.add('show');
    } else {
      navbar?.classList.remove('scrolled');
      backToTopBtn?.classList.remove('show');
    }
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileClose = document.getElementById('mobile-drawer-close');

  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 4. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.portfolio-tab-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. Lightbox Modal Popup
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxClose = document.getElementById('lightbox-close');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img')?.src;
      const title = item.getAttribute('data-title') || 'Luxury Interior Design';
      const tag = item.getAttribute('data-category')?.toUpperCase() || 'PROJECT';

      if (lightboxImg && imgSrc) {
        lightboxImg.src = imgSrc;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxTag) lightboxTag.textContent = tag;
        lightboxModal?.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightboxModal?.classList.remove('open');
    document.body.style.overflow = '';
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // 6. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 7. Animated Counter Statistics
  const counters = document.querySelectorAll('.counter-number');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current);
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector('#stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          runCounters();
          animated = true;
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // 8. Contact Form Mailto Handler & Confirmation Modal
  const contactForm = document.getElementById('contact-form');
  const formSuccessModal = document.getElementById('form-success-modal');
  const modalCloseBtn = document.getElementById('modal-success-close');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value || '';
    const phone = document.getElementById('contact-phone')?.value || '';
    const email = document.getElementById('contact-email')?.value || '';
    const service = document.getElementById('contact-service')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';

    const subject = `Interior Design Consultation Request - ${name}`;
    const body = `Hi Varnika Interior Design Team,

I would like to request an interior design consultation. Here are my project details:

Name: ${name}
Phone: ${phone}
Email: ${email}
Service Required: ${service}

Requirements / Message:
${message}

Best regards,
${name}`;

    const mailtoUrl = `mailto:varnikainteriors26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Launching Mail...';
    }

    // Trigger Mail client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      }
      formSuccessModal?.classList.add('open');
    }, 1200);
  });

  modalCloseBtn?.addEventListener('click', () => {
    formSuccessModal?.classList.remove('open');
  });
});
