import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

/**
 * Particles
 */
// const particleGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
const particleGeometry = new THREE.BufferGeometry();
const count = 2000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random()
}

particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);
particleGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(colors, 3)
)

const particleMaterial = new THREE.PointsMaterial();
particleMaterial.size = 0.2;
particleMaterial.sizeAttenuation = true;

// particleMaterial.color = new THREE.Color("#ff88cc");
particleMaterial.transparent = true;
particleMaterial.alphaMap = particleTexture;
// particleMaterial.alphaTest = 0.0001;
// particleMaterial.depthTest = false
particleMaterial.depthWrite = false;
particleMaterial.blending = THREE.AdditiveBlending;
particleMaterial.vertexColors = true

// particleMaterial.color = new

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// base cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial()
);
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
console.log(particles.geometry)
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

//   particles.rotation.y = elapsedTime * 0.2


  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const x = particles.geometry.attributes.position.array[i3 + 0]
    particles.geometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    
  }
  particles.geometry.attributes.position.needsUpdate = true

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
