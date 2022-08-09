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

/**
 * Base Use
 */
// const colorLoader = new THREE.TextureLoader()
// const colorTexture = colorLoader.load('/textures/door/color.jpg')
// console.log(colorLoader)
/**
 * Use Loading Management
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log("loadingManager: Loading Started")
}

loadingManager.onLoad = () => {
    console.log("loadingManager: Loading Finished")
}

loadingManager.onProgress = () => {
    console.log("loadingManager: Loading Progress")
}

loadingManager.onError = () => {
    console.log("loadingManager: Loading Error")
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(
    '/textures/minecraft.png',
    () => {
        console.log("Texture Loader: loading finished");
    },
    () => {
        console.log("Texture Loader: loading progress");
    },
    () => {
        console.log("Texture Loader: loading error");
    }
)
// 重复次数 需要指定重复类型 如下
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// 水平包裹
/**
 * - wrapS 水平包裹
 * - wrapT 垂直包裹
 *  - THREE.MirroredRepeatWrapping 每次重复时进行镜像
 *  - THREE.RepeatWrapping 纹理重复
 *  - THREE.ClampToEdgeWrapping 每条边上最后一个像素无限重复
 */
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping

/**
 * THREE.NearestFilter：最近滤镜。在纹理基层上执行最邻近过滤。
 * THREE.NearestMipMapNearestFilter：选择最临近的mip层，并执行最临近的过滤。
 * THREE.NearestMipMapLinearFilter：在mip层之间执行线性插补，并执行最临近的过滤。
 * THREE.LinearFilter：在纹理基层上执行线性过滤。
 * THREE.LinearMipMapNearestFilter：选择最临近的mip层，并执行线性过滤。
 * THREE.LinearMipMapLinearFilter：在mip层之间执行线性插补，并执行线性过滤。
 */
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: roughnessTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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