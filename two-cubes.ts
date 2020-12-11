import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'

const leftScene: THREE.Scene = new THREE.Scene()
const rightScene: THREE.Scene = new THREE.Scene()
rightScene.background = new THREE.Color(0x003224)
leftScene.background = new THREE.Color(0x553224)
const leftCamera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.8, 10)
const rightCamera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.8, 10)

// const canvas = <HTMLCanvasElement>document.getElementById("canvas")
const leftRenderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
const rightRenderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
leftRenderer.setSize(window.innerWidth/2, window.innerHeight/2)
rightRenderer.setSize(window.innerWidth/2, window.innerHeight/2)
const leftCanvas = document.body.appendChild(leftRenderer.domElement)
const rightCanvas = document.body.appendChild(rightRenderer.domElement)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const leftControls = new OrbitControls(leftCamera, leftRenderer.domElement)
const rightControls = new OrbitControls(rightCamera, rightRenderer.domElement)
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const leftCube: THREE.Mesh = new THREE.Mesh(geometry, material)
const rightCube: THREE.Mesh = new THREE.Mesh(geometry, material)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize(): void {
    rightCamera.aspect = window.innerWidth / window.innerHeight
    rightCamera.updateProjectionMatrix()
    rightRenderer.setSize(window.innerWidth, window.innerHeight)
    animate()
}

leftScene.add(leftCube)
rightScene.add(rightCube)

leftCamera.position.z = 2
rightCamera.position.y = 2
rightCamera.lookAt(new THREE.Vector3(0,0,0))
leftCanvas.height = window.innerHeight/2
rightCanvas.height = window.innerHeight/2
rightCanvas.width = window.innerWidth/2
leftCanvas.width = window.innerWidth/2

var animate = function () {
    requestAnimationFrame(animate)

    leftCube.rotation.x += 0.01
    leftCube.rotation.y += 0.01
    rightCube.rotation.x -= 0.01
    rightCube.rotation.y -= 0.01
    rightCube.rotation.z = -200

    rightControls.update()
    leftControls.update()

    leftRenderer.render(leftScene, leftCamera)
    rightRenderer.render(rightScene, rightCamera)
};

animate();

