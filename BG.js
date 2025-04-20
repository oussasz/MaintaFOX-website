// Generate graph data
const N = 200;
const prCount = 6;
const dotCount = 194;
const nodes = [];
for (let i = 1; i <= prCount; i++) {
  nodes.push({
    id: `PR${i}`,
    name: `PR${i}`,
    type: "PR",
    val: 10, // Larger sizes for PR nodes
  });
}
for (let i = 1; i <= dotCount; i++) {
  nodes.push({
    id: `dot${i}`,
    type: "dot",
    val: 2, // Smaller fixed size for dots
  });
}

// Generate random links
const links = [];
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (Math.random() < 0.05) {
      links.push({ source: nodes[i].id, target: nodes[j].id });
    }
  }
}

// Initialize the 3D Force Graph
const Graph = ForceGraph3D()(document.getElementById("graph"))
  .graphData({ nodes, links })
  .nodeThreeObject((node) => {
    if (node.type === "PR") {
      const texture = new THREE.TextureLoader().load(`assets/${node.id}.png`);
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: texture })
      );
      sprite.scale.set(node.val, node.val, 1);
      return sprite;
    }
    return null; // Default sphere for dots
  })
  .linkDirectionalParticles(3)
  .linkDirectionalParticleSpeed(0.01)
  .linkDirectionalParticleWidth(1)
  .linkColor("rgba(255,255,255,0.2)")
  .nodeColor((node) => (node.type === "dot" ? "white" : null))
  .backgroundColor("#e0a45600")
  .backgroundColor("#e0a45600")
  .enableNavigationControls(false);

// ---> ADD THIS: Set Initial Camera Position <---
const distance = 300; // <-- Adjust this value! Try values between 150 and 500
Graph.cameraPosition({
  x: 0, // Center horizontally
  y: 0, // Center vertically
  z: distance, // Distance from the center (adjust for zoom)
});
// ---> END OF ADDITION <---
// Add OrbitControls for rotation
const controls = new THREE.OrbitControls(
  Graph.camera(),
  Graph.renderer().domElement
);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.1;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;

// ---> ADD THIS: Ensure OrbitControls target is the center <---
controls.target.set(0, 0, 0); // Make sure controls orbit around the scene origin
// ---> END OF ADDITION <---

// Update controls in animation loop
const animate = () => {
  requestAnimationFrame(animate);
  controls.update(); // Important for damping and auto-rotate
  Graph.tickFrame(); // Necessary for the graph simulation and rendering
};
animate();

// Hover effects
let hoveredNode = null;
Graph.onNodeHover((node, prevNode) => {
  if (prevNode && prevNode.type === "PR") {
    prevNode.__threeObj.scale.set(prevNode.val, prevNode.val, 1);
  }
  if (node && node.type === "PR") {
    node.__threeObj.scale.set(node.val * 1.2, node.val * 1.2, 1);
    hoveredNode = node;
    const label = document.getElementById("node-label");
    label.textContent = node.name;
    label.style.display = "block";
    updateLabelPosition();
  } else {
    hoveredNode = null;
    document.getElementById("node-label").style.display = "none";
  }
});

function updateLabelPosition() {
  if (hoveredNode) {
    const { x, y } = Graph.graph2ScreenCoords(
      hoveredNode.x,
      hoveredNode.y,
      hoveredNode.z
    );
    const label = document.getElementById("node-label");
    label.style.left = `${x}px`;
    label.style.top = `${y + 20}px`;
    requestAnimationFrame(updateLabelPosition);
  }
}
