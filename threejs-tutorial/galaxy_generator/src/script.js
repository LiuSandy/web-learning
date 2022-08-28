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

const parameter = {};
parameter.count = 10000;
parameter.size = 0.02;
parameter.radius = 3;
parameter.branchs = 3;
parameter.spin = 1;
parameter.randomness = 0.2;
parameter.randomnessPower = 3;
parameter.insideColor = "#ff6030";
parameter.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

/**
 * Galaxy Generator
 */
const galaxy_generator = () => {
  if (points) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameter.count * 3);
  const colors = new Float32Array(parameter.count * 3);

  const insideColor = new THREE.Color(parameter.insideColor);
  const outsideColor = new THREE.Color(parameter.outsideColor);

  for (let i = 0; i < parameter.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * parameter.radius;
    const spinAngle = radius * parameter.spin;
    const branchAngle =
      ((i % parameter.branchs) / parameter.branchs) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameter.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameter.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameter.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = 0 + randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameter.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: parameter.size,
    sizeAttenuation: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameter, "count")
  .min(100)
  .max(100000)
  .step(100)
  .onFinishChange(galaxy_generator);
gui
  .add(parameter, "size")
  .min(0.01)
  .max(1)
  .step(0.01)
  .onFinishChange(galaxy_generator);

gui
  .add(parameter, "radius")
  .min(0.01)
  .max(10)
  .step(0.01)
  .onFinishChange(galaxy_generator);

gui
  .add(parameter, "branchs")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(galaxy_generator);

gui
  .add(parameter, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(galaxy_generator);

gui
  .add(parameter, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(galaxy_generator);

gui
  .add(parameter, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(galaxy_generator);

gui.addColor(parameter, "insideColor").onFinishChange(galaxy_generator);
gui.addColor(parameter, "outsideColor").onFinishChange(galaxy_generator);

galaxy_generator();
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
camera.position.x = 3;
camera.position.y = 3;
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

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
