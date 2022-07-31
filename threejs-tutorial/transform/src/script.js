import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// // Position
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;
// mesh.position.set(0.7, -0.6, 1);

// // Scale
// // mesh.scale.x = 2;
// // mesh.scale.y = 0.5;
// // mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// // Rotation
// // mesh.rotation.reorder("YXZ");
// // mesh.rotation.y = Math.PI * 0.25
// // mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)

/**
 * Group
 */
const group = new THREE.Group();
scene.add(group);

group.position.y = 1;
group.scale.y = 2;

group.rotation.y = Math.PI * .25;

/**
 * Red Cube
 */
const redCub = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(redCub)

const greenCub = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
greenCub.position.x = -2
group.add(greenCub)

const blueCub = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
blueCub.position.x = 2
group.add(blueCub)

// AxesHelper
const helper = new THREE.AxesHelper(3);
scene.add(helper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1
// camera.lookAt(0,0,0)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)