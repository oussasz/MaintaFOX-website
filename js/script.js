document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu.querySelectorAll(
    ".mobile-nav-link, .mobile-cta"
  ); // Include CTA

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("is-open");

      if (isOpen) {
        // Close menu
        mobileMenu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        // Optional: Re-enable body scroll if it was disabled
        // document.body.style.overflow = '';
      } else {
        // Open menu
        mobileMenu.classList.add("is-open");
        menuButton.setAttribute("aria-expanded", "true");
        // Optional: Disable body scroll when menu is open
        // document.body.style.overflow = 'hidden';
      }
    });

    // Add event listener to each link inside the mobile menu
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open"); // Hide menu when a link is clicked
        menuButton.setAttribute("aria-expanded", "false"); // Reset ARIA attribute
        // Optional: Re-enable body scroll
        // document.body.style.overflow = '';
      });
    });
  } else {
    console.warn("Mobile menu button or menu element not found.");
  }

  // --- Sticky Header Background ---
  const header = document.getElementById("main-header");

  if (header) {
    const stickyScrollPoint = 10; // Pixels scrolled before header becomes sticky

    window.addEventListener("scroll", () => {
      if (window.scrollY > stickyScrollPoint) {
        header.classList.add("sticky-nav-scrolled");
      } else {
        header.classList.remove("sticky-nav-scrolled");
      }
    });
  } else {
    console.warn("Main header element not found.");
  }

  // --- Scroll Animations using Intersection Observer ---
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

  if (elementsToAnimate.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // observer.unobserve(entry.target); // Uncomment to animate only once
        } else {
          // entry.target.classList.remove('is-visible'); // Uncomment to reset animation
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    elementsToAnimate.forEach((el) => {
      observer.observe(el);
    });
  }
}); // End DOMContentLoaded
