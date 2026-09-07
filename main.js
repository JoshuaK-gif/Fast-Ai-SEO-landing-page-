/* ============================================================
   FastSEOHub — Landing Page Interactions
   Hamburger menu · FAQ accordion · scroll reveal · progress bars
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    if (hamburger) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    }
  }

  function toggleMenu() {
    if (!navLinks || !hamburger) return;
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", toggleMenu);

    // Close the menu after tapping a link
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Close when tapping outside the header
    document.addEventListener("click", function (e) {
      if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Reset state when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  /* ---------- FAQ accordion: keep one item open at a time ---------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      document.querySelectorAll(".faq-item[open]").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Animate progress bars ---------- */
  function animateBars(container) {
    container.querySelectorAll(".progress-bar, .metric-fill").forEach(function (bar, index) {
      const target = bar.style.getPropertyValue("--w");
      if (!target) return;
      // Slight stagger for a polished effect
      bar.style.transitionDelay = index * 90 + "ms";
      bar.style.width = target;
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    ".hero-copy, .dashboard-mockup, .grid, .steps, .showcase-grid, .ba-grid, " +
    ".pricing-card, .disclosure, .faq-list, .split-visual, .split-copy, " +
    ".proof-chips, .terms, .final-cta .hero-ctas"
  );

  function revealObserver() {
    if (!("IntersectionObserver" in window)) {
      // Fallback: show everything immediately
      revealTargets.forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("reveal");
          el.classList.add("visible");

          // Animate progress bars once this section is on screen
          if (el.classList.contains("dashboard-mockup") || el.classList.contains("showcase-grid")) {
            animateBars(el);
          }

          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  revealObserver();
})();