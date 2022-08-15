import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
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
const matcapTexture = textureLoader.load("textures/matcaps/5.png");
const fontLoader = new FontLoader();

fontLoader.load("/font/helvetiker_regular.typeface.json", (font) => {
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });

  //   textGeometry.computeBoundingBox()
  //   textGeometry.translate(
  //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
  //   )
  textGeometry.center();
  console.log(textGeometry.boundingBox);

  const text = new THREE.Mesh(textGeometry, material);

  scene.add(text);
  const dountGeometry = new THREE.TorusGeometry(0.2, 0.1, 32, 32);
  for (let index = 0; index < 300; index++) {
    const dount = new THREE.Mesh(dountGeometry, material);
    dount.position.x = (Math.random() - 0.5) * 10;
    dount.position.y = (Math.random() - 0.5) * 10;
    dount.position.z = (Math.random() - 0.5) * 10;

    dount.rotation.x = Math.random() * Math.PI
    dount.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    dount.scale.set(scale,scale,scale)

    scene.add(dount);
  }
});

/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);

// scene.add(cube);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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
