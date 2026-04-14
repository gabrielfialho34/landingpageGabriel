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
}
