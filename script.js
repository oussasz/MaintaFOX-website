fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// script.js - Maintafox Landing Page

document.addEventListener("DOMContentLoaded", () => {
  console.log("Maintafox Landing Page Script Initialized");

  // --- Loader ---
  const loader = document.querySelector(".loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500); // Match CSS transition duration
    });
  } else {
    console.warn("Loader element not found.");
  }

  // --- Scroll Progress ---
  const scrollProgress = document.querySelector(".scroll-progress");
  if (scrollProgress) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0; // Avoid division by zero
      scrollProgress.style.width = `${scrollPercent}%`;
    });
  } else {
    console.warn("Scroll progress bar element not found.");
  }

  // --- Theme Toggle Logic Removed ---

  // --- Mobile Menu ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isActive);
      // Change icon based on state
      menuToggle.innerHTML = isActive
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
    // Close menu when a link is clicked (optional)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  } else {
    console.warn("Menu toggle or nav links element not found.");
  }

  // --- Scroll Effects (Intersection Observer) ---
  const scrollElements = document.querySelectorAll(
    "[data-scroll-section], [data-scroll-item]"
  );
  if ("IntersectionObserver" in window && scrollElements.length > 0) {
    const observerOptions = {
      threshold: 0.2, // Trigger earlier
      rootMargin: "0px 0px -50px 0px", // Trigger slightly before element fully enters viewport
    };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      // Pass observer
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, observerOptions);

    scrollElements.forEach((el) => {
      scrollObserver.observe(el);
    });
  } else {
    // Fallback for older browsers or if no elements found
    scrollElements.forEach((el) => el.classList.add("visible")); // Make them visible immediately
    console.warn(
      "IntersectionObserver not supported or no scroll elements found."
    );
  }

  // --- Header Scroll Effect ---
  const nav = document.querySelector(".futuristic-nav");
  if (nav) {
    let lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        // Add 'scrolled' class when scrolling down past header height
        nav.classList.toggle("scrolled", scrollTop > nav.offsetHeight);

        // Optional: Hide header on scroll down, show on scroll up
        // if (scrollTop > lastScrollTop && scrollTop > nav.offsetHeight){
        //     nav.style.transform = `translateY(-${nav.offsetHeight}px)`;
        // } else {
        //     nav.style.transform = 'translateY(0)';
        // }
        // lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Optional: Parallax for particle background (if element exists)
        const particleBg = document.querySelector(".particle-bg");
        if (particleBg) {
          particleBg.style.transform = `translateY(${scrollTop * 0.3}px)`; // Slower parallax
        }
      },
      { passive: true }
    ); // Improve scroll performance
  }

  // --- Custom Magnetic Cursor (Simplified Hover) ---
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX - 15}px, ${
          e.clientY - 15
        }px)`;
      });
    });

    // Add/remove hover class - simplified, no transform on elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-tilt]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  } else {
    console.warn("Custom cursor element not found.");
  }

  // --- Typing Animation ---
  const typingLines = document.querySelectorAll(".typing-line");
  if (typingLines.length > 0) {
    typingLines.forEach((line, index) => {
      // Ensure width calculation happens after font is likely loaded
      const textLength = line.textContent.length;
      line.style.width = `${textLength}ch`;
      line.style.animation = `typing ${
        textLength * 0.08
      }s steps(${textLength}) forwards ${
        index * 1.5
      }s, blink-caret 0.75s step-end infinite ${index * 1.5}s`; // Adjust timing based on length
      // Trigger visibility slightly delayed
      setTimeout(() => {
        line.style.opacity = 1;
      }, index * 1500); // Stagger start time
    });

    // Animate subtitle after last line finishes typing
    const lastLine = typingLines[typingLines.length - 1];
    const subtitle = document.querySelector(".hero-subtitle");
    if (lastLine && subtitle) {
      const lastLineDuration = lastLine.textContent.length * 0.08 * 1000; // Duration in ms
      const lastLineDelay = (typingLines.length - 1) * 1500;
      setTimeout(() => {
        subtitle.classList.add("visible");
      }, lastLineDelay + lastLineDuration + 300); // Show subtitle shortly after last line types
    }
  } else {
    // If no typing lines, show subtitle immediately
    const subtitle = document.querySelector(".hero-subtitle");
    if (subtitle) subtitle.classList.add("visible");
  }

  // --- Form Handling with Simple JS Validation ---
  function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    if (!form) {
      // console.warn(`Form with ID "${formId}" not found.`);
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    const spinner = submitButton
      ? submitButton.querySelector(".spinner")
      : null;
    const successMessageContainer = form.querySelector(".form-success-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearFormErrors(form); // Clear previous errors

      if (!validateForm(form)) {
        console.log(`Form ${formId} validation failed.`);
        return; // Stop if validation fails
      }

      console.log(`Form ${formId} submitted (simulated).`);

      // --- Simulation ---
      if (submitButton) submitButton.disabled = true;
      if (spinner) spinner.style.display = "inline-block";
      if (successMessageContainer) successMessageContainer.textContent = ""; // Clear previous success msg

      setTimeout(() => {
        if (spinner) spinner.style.display = "none";
        if (submitButton) submitButton.disabled = false;

        if (successMessageContainer) {
          successMessageContainer.textContent = `${
            formId === "demo-form" ? "Demo request" : "Message"
          } sent successfully! We'll be in touch.`;
          successMessageContainer.classList.add("visible"); // Use class for potential styling/transition
        } else {
          alert("Message sent successfully!"); // Fallback alert
        }

        form.reset(); // Reset form fields
        // Optionally clear floating labels manually if needed
        form
          .querySelectorAll("label")
          .forEach((label) => (label.style.top = "")); // Reset label position hack

        // Hide success message after a few seconds
        setTimeout(() => {
          if (successMessageContainer) {
            successMessageContainer.classList.remove("visible");
            successMessageContainer.textContent = "";
          }
        }, 5000);
      }, 1500); // Simulate network delay
      // --- End Simulation ---

      /* // --- Real Form Submission (Example using Fetch) ---
      if(submitButton) submitButton.disabled = true;
      if(spinner) spinner.style.display = 'inline-block';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      fetch('YOUR_SERVER_ENDPOINT', { // Replace with your actual endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
          return response.json();
      })
      .then(result => {
          console.log('Success:', result);
           if (successMessageContainer) { // Display success message }
          form.reset();
      })
      .catch(error => {
          console.error('Error:', error);
           showFormError(form, `Submission failed: ${error.message}`); // Show error near form
      })
      .finally(() => {
          if(spinner) spinner.style.display = 'none';
          if(submitButton) submitButton.disabled = false;
      });
      */
    });
  }

  // --- Simple Form Validation Logic ---
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll(
      "input[required], textarea[required], select[required]"
    );

    inputs.forEach((input) => {
      const field = input.closest(".form-field");
      const errorContainer = field
        ? field.querySelector(".error-message")
        : null;
      let errorMessage = "";

      if (input.type === "email") {
        // Basic email pattern check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value.trim())) {
          errorMessage = "Please enter a valid email address.";
        }
      }

      // Check required fields (add after specific checks)
      if (!input.value.trim() && !errorMessage) {
        errorMessage = "This field is required.";
      }

      if (errorMessage && errorContainer) {
        errorContainer.textContent = errorMessage;
        errorContainer.style.display = "block";
        isValid = false;
      }
    });
    return isValid;
  }

  function clearFormErrors(form) {
    form.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
  }

  function showFormError(form, message) {
    // Example: Display a general error message at the bottom of the form
    let generalErrorEl = form.querySelector(".form-general-error");
    if (!generalErrorEl) {
      generalErrorEl = document.createElement("p");
      generalErrorEl.className = "error-message form-general-error"; // Reuse error style
      generalErrorEl.style.textAlign = "center";
      generalErrorEl.style.marginTop = "1rem";
      form.appendChild(generalErrorEl);
    }
    generalErrorEl.textContent = message;
    generalErrorEl.style.display = "block";
  }

  // Initialize forms
  handleFormSubmit("demo-form");
  handleFormSubmit("contact-form");

  // --- Vanilla Tilt Initialization ---
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10, // Reduced tilt effect
      speed: 300,
      glare: true,
      "max-glare": 0.3, // Reduced glare
    });
  } else {
    console.warn("VanillaTilt library not found or loaded.");
  }

  // --- Update Footer Year ---
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}); // End DOMContentLoaded
