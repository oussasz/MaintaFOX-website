// script.js - Revised for Inline Graph Layout - Larger Visual Elements

document.addEventListener("DOMContentLoaded", () => {
  const graphElement = document.getElementById("graph");
  const nodeLabelElement = document.getElementById("node-label");

  // --- Error Handling: Check if essential elements exist ---
  if (!graphElement) {
    console.error("Error: Element with id 'graph' not found.");
    return;
  }
  if (window.getComputedStyle(graphElement).display === "none") {
    console.warn("Warning: #graph element is hidden via CSS.");
  }
  if (graphElement.clientHeight <= 0) {
    console.warn(
      `Warning: #graph element has zero or negative height (${graphElement.clientHeight}px). Check CSS height property.`
    );
    graphElement.style.minHeight = "300px";
    if (graphElement.clientHeight <= 0) {
      console.error(
        "Error: Failed to give #graph a usable height. Cannot initialize graph."
      );
      return;
    }
  }
  if (!nodeLabelElement) {
    console.error("Error: Element with id 'node-label' not found.");
    return;
  }
  // --- End Error Handling ---

  // --- Graph Data Generation ---
  const N = 200;
  const prCount = 6;
  const dotCount = N - prCount;
  const nodes = [];

  // Create PR nodes
  for (let i = 1; i <= prCount; i++) {
    nodes.push({
      id: `PR${i}`,
      name: `PR${i}`,
      type: "PR",
      // *** INCREASED base value for PR node visual size ***
      val: 15, // Was 10, adjust as needed (e.g., 12, 15, 20)
    });
  }

  // Create dot nodes
  for (let i = 1; i <= dotCount; i++) {
    nodes.push({
      id: `dot${i}`,
      name: `Dot ${i}`,
      type: "dot",
      // *** INCREASED base value for dot node visual size ***
      val: 4, // Was 2, adjust as needed (e.g., 3, 4, 5)
    });
  }

  // Generate random links
  const links = [];
  const linkProbability = 0.05;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() < linkProbability) {
        links.push({ source: nodes[i].id, target: nodes[j].id });
      }
    }
  }
  // --- End Graph Data Generation ---

  // --- Initialize 3D Force Graph ---
  let Graph;
  try {
    Graph = ForceGraph3D({
      controlType: "orbit",
      extraRenderers: [],
    })(graphElement)
      .width(graphElement.clientWidth)
      .height(graphElement.clientHeight)
      .graphData({ nodes, links })
      .backgroundColor("#00000000")

      // --- Node Appearance ---
      // Uses the NEW, larger 'val' values set above
      .nodeVal("val")
      .nodeColor((node) =>
        node.type === "dot" ? "rgba(255, 255, 255, 0.8)" : "rgba(0,0,0,0)"
      )
      .nodeThreeObject((node) => {
        if (node.type === "PR") {
          try {
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(
              `assets/${node.id}.png`,
              undefined,
              undefined,
              (error) => {
                console.error(`Error loading texture for ${node.id}:`, error);
              }
            );
            const material = new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
              alphaTest: 0.1,
              depthWrite: false,
            });
            const sprite = new THREE.Sprite(material);
            // Uses the NEW, larger 'val' for scaling
            sprite.scale.set(node.val, node.val, 1);
            return sprite;
          } catch (e) {
            console.error("Error creating sprite for PR node:", node.id, e);
            return null;
          }
        }
        return null;
      })
      .nodeLabel(null)

      // --- Link Appearance ---
      // *** INCREASED link visual size/presence ***
      .linkWidth(1.2) // Was maybe implicitly thinner or set lower previously. Adjust (e.g., 1, 1.2, 1.5)
      .linkColor(() => "rgba(255, 255, 255, 0.15)") // Slightly more opaque links
      .linkDirectionalParticles(2) // Keep particle count the same or increase slightly if desired
      .linkDirectionalParticleSpeed(0.006)
      // *** INCREASED particle visual size ***
      .linkDirectionalParticleWidth(1.0) // Was 0.6, back to original or adjust (e.g., 0.8, 1, 1.2)
      .linkDirectionalParticleColor(() => "rgba(255, 255, 255, 0.5)"); // Slightly more opaque particles
  } catch (error) {
    console.error("Failed to initialize ForceGraph3D:", error);
    graphElement.innerHTML =
      '<p style="color: red; text-align: center; padding: 20px;">Error initializing 3D Graph.</p>';
    return;
  }

  // --- Adjust Force Simulation (KEEP AS IS for consistent layout) ---
  Graph.d3Force("charge").strength(-40);
  Graph.d3Force("link").distance(40).strength(0.05);
  Graph.d3Force("center", d3.forceCenter(0, 0, 0));

  // --- Camera and Controls Setup (KEEP AS IS for consistent zoom/view) ---
  const initialCameraDistance = 180; // Keep the adjusted distance
  Graph.cameraPosition({ z: initialCameraDistance });

  const controls = Graph.controls();
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.3;
  controls.enableZoom = true;
  controls.enablePan = true;

  // --- Hover Effects & Custom Label (KEEP AS IS) ---
  let hoveredNode = null;
  Graph.onNodeHover((node, prevNode) => {
    if (prevNode && prevNode.type === "PR" && prevNode.__threeObj) {
      if (prevNode.__threeObj.scale) {
        // Uses the NEW, larger 'val' for reset scale
        prevNode.__threeObj.scale.set(prevNode.val, prevNode.val, 1);
      }
    }
    if (node && node.type === "PR" && node.__threeObj) {
      if (node.__threeObj.scale) {
        // Uses the NEW, larger 'val' for hover scale
        node.__threeObj.scale.set(node.val * 1.2, node.val * 1.2, 1);
      }
      hoveredNode = node;
      nodeLabelElement.textContent = node.name || node.id;
      nodeLabelElement.style.display = "block";
      updateLabelPosition();
    } else {
      hoveredNode = null;
      nodeLabelElement.style.display = "none";
    }
    graphElement.style.cursor =
      node && node.type === "PR"
        ? "pointer"
        : controls.domElement === document
        ? "grab"
        : "";
  });

  function updateLabelPosition() {
    if (!hoveredNode || typeof hoveredNode.x === "undefined") {
      nodeLabelElement.style.display = "none";
      return;
    }
    try {
      const coords = Graph.graph2ScreenCoords(
        hoveredNode.x,
        hoveredNode.y,
        hoveredNode.z
      );
      const labelX = coords.x;
      const labelY = coords.y + 25; // Offset below the node
      nodeLabelElement.style.left = `${labelX}px`;
      nodeLabelElement.style.top = `${labelY}px`;
      nodeLabelElement.style.display = "block";
    } catch (error) {
      console.warn("Could not update label position:", error);
      nodeLabelElement.style.display = "none";
    }
  }
  // --- End Hover Effects ---

  // --- Animation Loop (KEEP AS IS) ---
  function animate() {
    if (!Graph) return;
    if (hoveredNode) {
      updateLabelPosition();
    }
    controls.update();
    Graph.tickFrame();
    requestAnimationFrame(animate);
  }
  animate();
  // --- End Animation Loop ---
}); // End DOMContentLoaded
