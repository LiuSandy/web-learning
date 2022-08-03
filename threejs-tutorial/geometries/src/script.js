import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
/**
 * Option 1: Use BufferGeometry
 */
// const geometry = new THREE.BufferGeometry();
// const count = 5000;
// const positionArray = new Float32Array(count * 3 * 3);
// for (let i = 0; i < count * 3 *3; i++) {
//     positionArray[i] = Math.random() - 0.5;
// }
// const positionAttributes = new THREE.BufferAttribute(positionArray, 3);

// geometry.setAttribute('position', positionAttributes)

/**
 * Option 2: THREE.Geometry
 * the three.js version must less than 0.125
 */
const geometry = new THREE.Geometry();

// const point1 = new THREE.Vector3(0,0,0);
// geometry.vertices.push(point1);
// const point2 = new THREE.Vector3(0,1,0)
// geometry.vertices.push(point2);
// const point3 = new THREE.Vector3(1,0,0)
// geometry.vertices.push(point3);

// const faces = new THREE.Face3(0,1,2)
// geometry.faces.push(faces)
for (let i = 0; i < 5000; i++) {
    for (let j = 0; j < 3; j++) {
        geometry.vertices.push(new THREE.Vector3(
            Math.random(),
            Math.random(),
            Math.random(),
        ))
    }
    const verticesIndex = i * 3
    const faces = new THREE.Face3(
        verticesIndex,
        verticesIndex + 1,
        verticesIndex + 2
    )
    geometry.faces.push(faces)
}


const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
material.wireframe = true;
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()