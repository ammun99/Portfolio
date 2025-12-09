// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav__links--open");
  });

  // Close menu when clicking a link (on mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("nav__links--open");
    }
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const header = document.querySelector(".site-header");
const backToTopBtn = document.getElementById("backToTop");

// Header shadow + back-to-top visibility on scroll
window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY > 10) {
      header.classList.add("site-header--scrolled");
    } else {
      header.classList.remove("site-header--scrolled");
    }
  }

  if (backToTopBtn) {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("back-to-top--visible");
    } else {
      backToTopBtn.classList.remove("back-to-top--visible");
    }
  }
});

// Back-to-top click behavior
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scroll reveal for elements with .reveal
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target); // reveal once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show everything if IntersectionObserver not supported
  revealElements.forEach((el) => el.classList.add("reveal--visible"));
}

// Typing animation in hero tagline
const typingEl = document.getElementById("heroTyping");

if (typingEl) {
  const phrases = [
    "Software Engineer · Full Stack · AI/ML",
    "Building scalable backend & cloud systems",
    "Turning ideas into production-ready code"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 70;
  const deleteSpeed = 40;
  const delayBetween = 1400;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, delayBetween);
        return;
      }
    } else {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? deleteSpeed : typeSpeed);
  }

  type();
}
