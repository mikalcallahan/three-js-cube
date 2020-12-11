import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'

const scene: THREE.Scene = new THREE.Scene()
scene.background = new THREE.Color(0x553224)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const canvas: HTMLCanvasElement = document.body.appendChild(renderer.domElement)
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render) 
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xF5C26C, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)
camera.position.z = 2

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
 camera.aspect = window.innerWidth / window.innerHeight
 camera.updateProjectionMatrix()
 renderer.setSize(window.innerWidth, window.innerHeight)
}

const stats = Stats()
document.body.appendChild(stats.dom)

var animate = function (): void {
 requestAnimationFrame(animate)
/*
 cube.rotation.x += 0.01;
 cube.rotation.y += 0.01;
*/
 renderer.render(scene, camera)
 stats.update()
};

function render(): void {
  stats.begin()
  renderer.render(scene, camera)
  stats.end()
}

render()

// animate();


