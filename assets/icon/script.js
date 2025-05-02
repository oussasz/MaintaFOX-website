document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const cardItems = document.querySelectorAll(".card-item");
  const numCards = cardItems.length;

  if (numCards === 0) return; // Exit if no cards found

  const theta = 360 / numCards; // Angle between cards
  const radius =
    Math.round(cardItems[0].offsetWidth / 2 / Math.tan(Math.PI / numCards)) +
    50; // Calculate radius + some padding
  let currentAngle = 0;
  let autoRotateInterval;
  const rotationTime = 4000; // Time in ms between rotations

  function setupCarousel() {
    cardItems.forEach((item, index) => {
      const angle = theta * index;
      item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

      // Assign random values for particle animation
      const particles = item.querySelectorAll(".card-particles span");
      particles.forEach((p) => {
        p.style.setProperty("--i", Math.random() * 6);
        p.style.setProperty("--j", Math.random() * 6);
      });
    });
    updateActiveCard(); // Set initial active card
  }

  function rotateCarousel() {
    currentAngle -= theta;
    carousel.style.transform = `translateZ(-${radius}px) rotateY(${currentAngle}deg)`;
    updateActiveCard();
  }

  function updateActiveCard() {
    // Calculate which card index should be active based on currentAngle
    // The card facing forward (0 degrees relative to the scene) is active
    const activeIndex = Math.round(-currentAngle / theta + numCards) % numCards;

    cardItems.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add("active");
        item.style.pointerEvents = "auto"; // Allow interaction on active card
      } else {
        item.classList.remove("active");
        item.style.pointerEvents = "none"; // Prevent interaction on inactive cards
        // Reset particle animation if needed (optional)
        // const particles = item.querySelectorAll('.card-particles span');
        // particles.forEach(p => p.style.animation = 'none');
      }
    });
  }

  function startAutoRotate() {
    stopAutoRotate(); // Clear existing interval first
    autoRotateInterval = setInterval(rotateCarousel, rotationTime);
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  // --- Initialize ---
  setupCarousel();
  // Apply initial transform to center the carousel
  carousel.style.transform = `translateZ(-${radius}px) rotateY(${currentAngle}deg)`;
  startAutoRotate();

  // --- Optional: Pause on Hover ---
  const scene = document.querySelector(".scene");
  scene.addEventListener("mouseenter", stopAutoRotate);
  scene.addEventListener("mouseleave", startAutoRotate);

  // --- Optional: Rotate on Click/Tap (can be adapted) ---
  cardItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // If clicked card is not active, rotate to it
      if (!item.classList.contains("active")) {
        const targetAngle = -index * theta;
        // Find the shortest rotation path
        let diff = targetAngle - currentAngle;
        // Normalize the difference to be between -180 and 180
        while (diff <= -180) diff += 360;
        while (diff > 180) diff -= 360;

        currentAngle += diff; // Set the final angle
        carousel.style.transform = `translateZ(-${radius}px) rotateY(${currentAngle}deg)`;
        updateActiveCard();
      }
    });
  });
});
