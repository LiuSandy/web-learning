// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube)

// Default Size
const size ={
  width: 600,
  height: 400
};

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 10;
scene.add(camera);

const canvas = document.querySelector(".webgl");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);