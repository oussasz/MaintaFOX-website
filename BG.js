const particlesContainer = document.getElementById("particles-container");
const particleCount = 80;
const particles = [];

function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = 3;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.position = "absolute";
  particle.style.borderRadius = "50%";
  particle.style.backgroundColor = "white";

  particlesContainer.appendChild(particle);

  const p = {
    element: particle,
    x: Math.random() * 100,
    y: Math.random() * 100,
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    opacity: Math.random() * 0.5 + 0.2,
  };

  particle.style.left = `${p.x}%`;
  particle.style.top = `${p.y}%`;
  particle.style.opacity = "0";

  particles.push(p);
}

for (let i = 0; i < particleCount; i++) {
  createParticle();
}

// Animation loop
function animateParticles() {
  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    // bounce if out of bounds
    if (p.x < 0 || p.x > 100) p.dx *= -1;
    if (p.y < 0 || p.y > 100) p.dy *= -1;

    p.element.style.left = `${p.x}%`;
    p.element.style.top = `${p.y}%`;

    // Animate opacity
    const newOpacity = 0.2 + Math.sin(Date.now() * 0.001 + p.x) * 0.3;
    p.element.style.opacity = Math.max(0, newOpacity);
  });

  drawLines();
  requestAnimationFrame(animateParticles);
}

// Canvas for lines
const canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = 4;
canvas.style.pointerEvents = "none";
particlesContainer.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = particlesContainer.offsetWidth;
  canvas.height = particlesContainer.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Draw dynamic lines
function drawLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];

      const dx = ((p1.x - p2.x) * canvas.width) / 100;
      const dy = ((p1.y - p2.y) * canvas.height) / 100;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo((p1.x / 100) * canvas.width, (p1.y / 100) * canvas.height);
        ctx.lineTo((p2.x / 100) * canvas.width, (p2.y / 100) * canvas.height);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

animateParticles();

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const spheres = document.querySelectorAll(".gradient-sphere");
  const glow = document.querySelector(".glow");

  spheres.forEach((sphere, index) => {
    const speed = 0.1 + index * 0.05;
    sphere.style.transform = `translateY(${scrollY * speed}px)`;
  });

  if (glow) {
    glow.style.transform = `translate(-50%, -50%) translateY(${
      scrollY * 0.2
    }px)`;
  }
});
