const currentYear = document.querySelector("#current-year");
const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"], .brand[href^="#"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 24);
  header.classList.toggle(
    "is-cta-emphasis",
    !prefersReducedMotion.matches &&
      window.innerWidth <= 640 &&
      window.scrollY > Math.max(window.innerHeight * 0.35, 180)
  );
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (!prefersReducedMotion.matches) {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // --- Modern UI Reveal Animations ---
  const revealElements = document.querySelectorAll(
    '.section-intro, .skill-card, .metric-card, .timeline-item, .education-card, .certifications-card, .panel-card, .hero-copy, .authority-items span, .impact-item'
  );
  
  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    if (el.classList.contains('skill-card')) {
       el.style.transitionDelay = `${(index % 5) * 100}ms`;
    } else if (el.classList.contains('metric-card') || el.classList.contains('impact-item')) {
       el.style.transitionDelay = `${(index % 4) * 120}ms`;
    } else if (el.classList.contains('timeline-item')) {
       el.style.transitionDelay = `${(index % 3) * 150}ms`;
    } else if (el.tagName.toLowerCase() === 'span' && !el.classList.contains('impact-number') && !el.classList.contains('impact-suffix')) {
       el.style.transitionDelay = `${(index % 7) * 80}ms`;
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        const numElement = entry.target.querySelector('.impact-number');
        if (numElement && !numElement.dataset.animated) {
          numElement.dataset.animated = "true";
          const target = parseInt(numElement.getAttribute('data-target'), 10);
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const stepValue = target / steps;
          let current = 0;
          
          const counterInterval = setInterval(() => {
            current += stepValue;
            if (current >= target) {
              numElement.textContent = target;
              clearInterval(counterInterval);
            } else {
              numElement.textContent = Math.floor(current);
            }
          }, stepTime);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));
}
